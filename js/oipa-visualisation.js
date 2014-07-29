
function OipaVis(){
	this.type = null;
	this.data = null;
	this.selection = null;
	this.name = null;
	this.indicator = null;
	this.y_name = null;
	this.y_format = null;
	this.x_name = null;
	this.x_format = null;
	this.limit = 5;

	this.init = function(in_favorites){
		// create html
		var html = '<li><section class="container-box" data-indicator="'+this.indicator+'"><header class="heading-holder"><h3>'+this.name+'</h3></header>';
		html += '<div class="box-content"><a href="#" class="btn-vis-zoom" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a><a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a><div class="widget"><svg id="line-chart" style="height:350px; width: 350px;"></svg></div><a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';
		if (this.limit){
			html += '<div class="vis-box-note">Showing top '+this.limit+', use filters to show a different selection, <a class="vis-box-show-all" href="#">click here to show all</a></div>';
		}
		html += '</div></section></li>';
		$("#visualisation-block-wrapper").append(html);
		this.load_listeners();

		this.refresh();
		this.check_if_in_favorites();
	};

	this.check_if_in_favorites = function(){

		var jsonString = this.get_save_string();

		var data = {
			'action': 'in_favorites',
			'visdata': jsonString
		};

		var curchart = this;
		
		$.post(ajaxurl, data, function(response) {
			if(response.status == "in_favorites"){
				$("section[data-indicator='"+curchart.indicator+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
			}
		});
	};

	this.get_save_string = function(){
		// create the string this vis will be saved as.
		var vis_parameters = new Object();
		vis_parameters.type = this.type;
		vis_parameters.selection = this.selection;
		vis_parameters.name = this.name;
		vis_parameters.indicator = this.indicator;
		vis_parameters.y_name = this.y_name;
		vis_parameters.y_format = this.y_format;
		vis_parameters.x_name = this.x_name;
		vis_parameters.x_format = this.x_format;
		vis_parameters.limit = this.limit;

		return (JSON.stringify(vis_parameters));
	};

	this.load_from_string = function(jsonString){
		// create the string this vis will be saved as.
		var vis_parameters = $.parseJSON( jsonString );

		this.type = vis_parameters.type;
		this.selection = vis_parameters.selection;
		this.name = vis_parameters.name;
		this.indicator = vis_parameters.indicator;
		this.y_name = vis_parameters.y_name;
		this.y_format = vis_parameters.y_format;
		this.x_name = vis_parameters.x_name;
		this.x_format = vis_parameters.x_format;
		this.limit = vis_parameters.limit;

		this.init();
	};

	this.favorite = function(){

		var savestring = this.get_save_string();
		var curchart = this;

		
		var htmlencoded = $('<div/>').text(savestring).html();
console.log(htmlencoded);
		var data = {
			'action': 'favorite_visualisation',
			'visdata': savestring
		};

		
		$.post(ajaxurl, data, function(response) {

			// console.log(response);

			if(response.status == "log_in_first"){
				console.log("log in first");
				$("#header-login-register-button").click();
				$("#urbannumbers-login h1").text("Log in first");

			} else if (response.status == "already_in_favorites"){
				console.log("Already in favorites");
				$("section[data-indicator='"+curchart.indicator+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
			
			} else if (response.status == "saved"){
				$("section[data-indicator='"+curchart.indicator+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
				console.log("Saved");
			}
		});
	};

	this.unfavorite = function(){
		var savestring = this.get_save_string();
		// remove from favorites via wp-ajax
		var data = {
			'action': 'unfavorite_visualisation',
			'visdata': savestring
		};

		var curchart = this;
		
		$.post(ajaxurl, data, function(response) {
			
			if(response.status == "log_in_first"){
				$("#header-login-register-button").click();

			} else if (response.status == "not_in_favorites"){
				console.log("Not found in favorites");
				$("section[data-indicator='"+curchart.indicator+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");
				
			} else if (response.status == "removed_from_favorites"){
				$("section[data-indicator='"+curchart.indicator+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");
				console.log("Removed");
			}
		});

	};

	this.refresh = function(data){

		if (!data){
			// get url
			var url = this.get_url();

			// get data
			this.get_data(url);
			
		} else {
			this.visualize(data);
		}
	};

	this.export = function(filetype){
		new OipaExport(this, filetype);
	};

	this.embed = function(){
		var embed = new OipaEmbed(this);
	};

	this.get_url = function(){

		var str_region = get_parameters_from_selection(this.selection.regions);
		var str_country = get_parameters_from_selection(this.selection.countries);
		var str_city = get_parameters_from_selection(this.selection.cities);
		var str_indicators = get_parameters_from_selection(this.selection.indicators);
		var str_limit = "";

		if(this.limit){
			str_limit = "&limit=" + this.limit;
		}

		return search_url + 'indicator-data/?format=json'+str_limit+'&countries__in=' + str_country + '&regions__in=' + str_region + '&cities__in=' + str_city + '&indicators__in=' + str_indicators;
	};

	this.get_data = function(url){
		
		// filters
		var thisvis = this;

		$.support.cors = true;

		if(window.XDomainRequest){
			var xdr = new XDomainRequest();
			xdr.open("get", url);
			xdr.onprogress = function () { };
			xdr.ontimeout = function () { };
			xdr.onerror = function () { };
			xdr.onload = function() {
				var jsondata = $.parseJSON(xdr.responseText);
				if (jsondata === null || typeof (jsondata) === 'undefined')
				{
					jsondata = $.parseJSON(jsondata.firstChild.textContent);
					thisvis.refresh(jsondata);
					
				}
			};
			setTimeout(function () {xdr.send();}, 0);
		} else {
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'json',
				success: function(data){
					thisvis.refresh(data);
				}
			});
		}
	}

	this.getRandomColor = function() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	this.format_data = function(data){
		// override
	};

	this.visualize = function(data){
		// override 
	};

	this.zoom_in = function(){
		$("section[data-indicator='"+this.indicator+"'] .glyphicon-zoom-in").removeClass("glyphicon-zoom-in").addClass("glyphicon-zoom-out");
		$("section[data-indicator='"+this.indicator+"']").css('position', 'fixed').css('width', '90%').css('height', '90%').css('margin', '3% 5%').css('z-index', '9999999').css('top', '0').css('left', '0').css('background-color', 'white');
		$("section[data-indicator='"+this.indicator+"'] svg").css("height", "90%").css("width", "90%"); $(window).resize();
	};

	this.zoom_out = function(){
		$("section[data-indicator='"+this.indicator+"'] .glyphicon-zoom-out").removeClass("glyphicon-zoom-out").addClass("glyphicon-zoom-in");
		$("section[data-indicator='"+this.indicator+"']").css('position', 'relative').css('width', 'auto').css('height', 'auto').css('margin', 'auto').css('z-index', '1').css('top', 'auto').css('left', 'auto').css('background-color', 'transparent');
		$(window).resize();
	};

	this.load_listeners = function(){

		var curchart = this;

		
		$("section[data-indicator='"+curchart.indicator+"'] .btn-vis-close").click(function(e){
			e.preventDefault();
			
			// TO DO: on deletion of vis, remove vis from Oipa.visualisations

			$(this).closest("li").hide(500, function(){
				$(this).remove();
			});
			
		});

		$("section[data-indicator='"+curchart.indicator+"'] .btn-vis-zoom").click(function(e){
			e.preventDefault();

			if ($("section[data-indicator='"+curchart.indicator+"'] .glyphicon-zoom-in").length){ // if unzoomed
				curchart.zoom_in();
			} else { // zoomed, so zoom out
				curchart.zoom_out();
			}
		});

		$("section[data-indicator='"+curchart.indicator+"'] .vis-box-show-all").click(function(e){
			e.preventDefault();
			curchart.limit = null;
			curchart.refresh();
		});

		$("section[data-indicator='"+curchart.indicator+"'] .btn-vis-save").click(function(e){
			e.preventDefault();
			if($("section[data-indicator='"+curchart.indicator+"'] .glyphicon-star-empty").length > 0){
				curchart.favorite();
			} else {
				curchart.unfavorite();
			}
		});
	};

}

function OipaTableChart(){
	this.type = "OipaTableChart";

}
OipaTableChart.prototype = new OipaVis();



function OipaLineChart(){
	this.type = "OipaLineChart";



	

	this.format_data = function(data){

		// the to be used data is this.data, that's still in the API call's format. We need to transform it to values to be used for the line chart
		var curchart = this;
		var returned_data = [];
		$.each(data[curchart.indicator].locs, function(key, value){

			// each key is a city / country, so draw i line per key
			var line_data = [];
			$.each(value.years, function(year, yearvalue){
				line_data.push({x: year, y: yearvalue});
			});

			var color = curchart.getRandomColor();
			returned_data.push({values: line_data, key: value.name, color: color});
		});

		//Line chart data should be sent as an array of series objects.
		return returned_data;
	}

	this.visualize = function(data){

		var current_vis = this;

		nv.addGraph(function() {
		  var chart = nv.models.lineChart()
		                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
		                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
		                .transitionDuration(350)  //how fast do you want the lines to transition?
		                .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
		                .showYAxis(true)        //Show the y-axis
		                .showXAxis(true)        //Show the x-axis
		  ;

		  chart.xAxis     //Chart x-axis settings
		      .axisLabel(current_vis.x_name)
		      .tickFormat(current_vis.x_format);

		  chart.yAxis     //Chart y-axis settings
		      .axisLabel(current_vis.y_name)
		      .tickFormat(current_vis.y_format);

		  /* Done setting the chart up? Time to render it!*/
		  var myData = current_vis.format_data(data);   //You need data...
		  d3.select('section[data-indicator="'+current_vis.indicator+'"] svg')    //Select the <svg> element you want to render the chart in.   
		      .datum(myData)         //Populate the <svg> element with chart data...
		      .call(chart);          //Finally, render the chart!

		  //Update the chart when window resizes.
		  nv.utils.windowResize(function() { chart.update() });

		  current_vis.chart = chart;

		  return chart;
		});

		
	}

	

}
OipaLineChart.prototype = new OipaVis();



function OipaBubbleChart(){
	this.type = "OipaBubbleChart";
}
OipaBubbleChart.prototype = new OipaVis();


function OipaRadarChart(){
	this.type = "OipaRadarChart";
}
OipaRadarChart.prototype = new OipaVis();





// function resize() {
//     /* Find the new window dimensions */
// 	var width = parseInt(d3.select("#line-chart").style("width")) - margin*2,
// 	height = parseInt(d3.select("#line-chart").style("height")) - margin*2;
	
// 	/* Update the range of the scale with new width/height */
// 	xScale.range([0, width]).nice(d3.time.year);
// 	yScale.range([height, 0]).nice();
	 
// 	/* Update the axis with the new scale */
// 	graph.select('.x.axis')
// 	  .attr("transform", "translate(0," + height + ")")
// 	  .call(xAxis);
	 
// 	graph.select('.y.axis')
// 	  .call(yAxis);
	 
// 	/* Force D3 to recalculate and update the line */
// 	graph.selectAll('.line')
// 	  .attr("d", line);
// }
 
// d3.select(window).on('resize', resize); 


var Oipa = {
	pageType: null,
	visualisations : new Array(),
    refresh_visualisations : function(){
    	for (var i = 0; i < visualisations.length; i++){
    		visualisations[i].refresh();
    	}
    }
}

function OipaSelection(){
	this.cities = [];
	this.countries = [];
	this.regions = [];
	this.sectors = [];
	this.budgets = [];
	this.query = [];
	this.indicators = [];
	this.reporting_organisation = null;
	this.get_selection_from_url = function(){
		var query = window.location.search.substring(1);
		  if(query != ''){
		    var vars = query.split("&");
		    for (var i=0;i<vars.length;i++) {
		      var pair = vars[i].split("=");
		      var vals = pair[1].split(",");
		      current_selection[pair[0]] = [];

		      for(var y=0;y<vals.length;y++){
		        if (pair[0] != "query"){
		          this[pair[0]].push({"id":vals[y], "name":"unknown"});
		        } else{
		          this[pair[0]].push({"id":vals[y], "name":vals[y]});
		        }
		      }
		    }
		}
	}
}


var OipaSelectionBox = {
	fill_selection_box: function(){

	  var html = '';
	  var indicatorhtml = '';
	  if (!(typeof current_selection.sectors === "undefined") && (current_selection.sectors.length > 0)) html += fill_selection_box_single_filter("SECTORS", current_selection.sectors);
	  if (!(typeof current_selection.countries === "undefined") && (current_selection.countries.length > 0)) html += fill_selection_box_single_filter("COUNTRIES", current_selection.countries);
	  if (!(typeof current_selection.budgets === "undefined") && (current_selection.budgets.length > 0)) html += fill_selection_box_single_filter("BUDGETS", current_selection.budgets);
	  if (!(typeof current_selection.regions === "undefined") && (current_selection.regions.length > 0)) html += fill_selection_box_single_filter("REGIONS", current_selection.regions);
	  if (!(typeof current_selection.cities === "undefined") && (current_selection.cities.length > 0)) html += fill_selection_box_single_filter("CITIES", current_selection.cities);
	  if (!(typeof current_selection.indicators === "undefined") && (current_selection.indicators.length > 0)) indicatorhtml = fill_selection_box_single_filter("INDICATORS", current_selection.indicators);
	  if (!(typeof current_selection.reporting_organisations === "undefined") && (current_selection.reporting_organisations.length > 0)) indicatorhtml = fill_selection_box_single_filter("REPORTING_ORGANISATIONS", current_selection.reporting_organisations);
	  if (!(typeof current_selection.query === "undefined") && (current_selection.query.length > 0)) html += fill_selection_box_single_filter("QUERY", current_selection.query);
	  $("#selection-box").html(html);
	  $("#selection-box-indicators").html(indicatorhtml);
	  init_remove_filters_from_selection_box();
	},
	fill_selection_box_single_filter: function(header, arr){

	  var html = '<div class="select-box" id="selected-' + header.toLowerCase() + '">';
	      html += '<div class="select-box-header">';
	      if (header == "INDICATORS" && selected_type == "cpi"){ header = "DIMENSIONS";}
	      if (header == "QUERY"){header = "SEARCH"}
	      if (header == "REPORTING_ORGANISATIONS"){header = "REPORTING ORGANISATIONS"}
	      html += header;
	      html += '</div>';

	      for(var i = 0; i < arr.length; i++){
	        html += '<div class="select-box-selected">';
	        html += '<div id="selected-' + arr[i].id.toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc') + '" class="selected-remove-button"></div>';
	        
	        if (arr[i].name.toString() == 'unknown'){
	          arr[i].name = $(':checkbox[value=' + arr[i].id + ']').attr("name");
	        }

	        html += '<div>' + arr[i].name + '</div>';
	        if (header == "INDICATORS" || header == "DIMENSIONS"){
	          html += '<div class="selected-indicator-color-filler"></div><div class="selected-indicator' + (i + 1).toString() + '-color"></div>';
	        }
	        html += '</div>';
	      }

	      html += '</div>';
	      return html;
	},
	init_remove_filters_from_selection_box: function (){

	  $(".selected-remove-button").click(function(){
	    var id = $(this).attr('id');
	    id = id.replace("selected-", "");
	    var filtername = $(this).parent().parent().attr('id');
	    filtername = filtername.replace("selected-", "");
	    var arr = current_selection[filtername];
	    for (var i = 0; i < arr.length;i++){
	      if(arr[i].id == id){
	        // arr.splice(i, 1);
	        $('input[name="' + arr[i].name + '"]').attr('checked', false);
	        break;
	      }
	    }
	    save_selection();
	  });
	}
}

function OipaProjectList(){
	this.offset = 0;
	this.per_page = 25;
	this.order_by = null;
}

function OipaMap(){
	this.map = null;
	this.selection = null;
	this.slider = null;
	this.basemap = "zimmerman2014.hmj09g6h";
	this.tl = null;

	this.set_map = function(div_id){

		$("#"+div_id).css("min-height", "300px");
		this.map = L.map(div_id, {
		    attributionControl: false, 
		    scrollWheelZoom: false,
		    zoom: 3,
		    minZoom: 2,
		    maxZoom:12,
		    continuousWorld: 'true'
		}).setView([10.505, 25.09], 3);

		this.tl = L.tileLayer('https://{s}.tiles.mapbox.com/v3/'+this.basemap+'/{z}/{x}/{y}.png', {
	    	maxZoom: 12
		}).addTo(this.map);
	}

	this.refresh = function(){

	}

	this.change_basemap = function(basemap_id){
		this.tl._url = "https://{s}.tiles.mapbox.com/v3/"+basemap_id+"/{z}/{x}/{y}.png";
		this.tl.redraw();
	}


}

function OipaFilters(){

	this.create_filter_attributes = function(objects, columns){
	    var html = '';
	    var per_col = 20;

	    var sortable = [];
	    for (var key in objects){
	      sortable.push([key, objects[key]]);
	    }
	    
	    sortable.sort(function(a, b){
	      var nameA=a[1].toString().toLowerCase(), nameB=b[1].toString().toLowerCase()
	      if (nameA < nameB) //sort string ascending
	        return -1 
	      if (nameA > nameB)
	        return 1
	      return 0 //default return value (no sorting)
	    });

	    var page_counter = 1;
	    html += '<div class="filter-page filter-page-1">';
	    
	    for (var i = 0;i < sortable.length;i++){

	      if (i%per_col == 0){
	          html += '<div class="span' + (12 / columns) + '">';
	      } 

	      var sortablename = sortable[i][1];
	      if (columns == 4 && sortablename.length > 32){
	        sortablename = sortablename.substr(0,28) + "...";
	      } else if (columns == 3 && sortablename.length > 40){
	        sortablename = sortablename.substr(0,36) + "...";
	      }


	      html += '<div class="squaredThree"><div>';
	      html += '<input type="checkbox" value="'+ sortable[i][0] +'" id="'+sortable[i][1].toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'" name="'+sortable[i][1]+'" />';
	      html += '<label class="map-filter-cb-value" for="'+sortable[i][1].toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'"></label>';
	      html += '</div><div class="squaredThree-fname"><span>'+sortablename+'</span></div></div>';
	      if (i%per_col == (per_col - 1)){
	        html += '</div>';
	      }
	      if ((i + 1) > ((page_counter * (per_col * columns))) - 1) { 
	        
	     
	        html += '</div>';
	        page_counter = page_counter + 1;
	        html += '<div class="filter-page filter-page-' + page_counter + '">';
	      }
	        
	    }

	    html += '<div class="filter-total-pages" name="' + page_counter + '"></div>';

	    /// if paginated, close the pagination.
	    if (page_counter > 1){
	      html += '</div>';
	    }

	    return html;
	}
}

function ProjectFilters(){
	ProjectFilters.prototype = Object.create(OipaFilters.prototype);

	// create filter options of one particular filter type, objects = the options, columns = amount of columns per filter page
	function create_project_filter_attributes(objects, columns){
	    var html = '';
	    var per_col = 20;


	    var sortable = [];
	    for (var key in objects){
	      if (objects[key].name == null){
	        objects[key].name = "Unknown";
	      }
	      sortable.push([key, objects[key]]);
	    }
	    
	    sortable.sort(function(a, b){
	      var nameA=a[1].name.toString().toLowerCase(), nameB=b[1].name.toString().toLowerCase()
	      if (nameA < nameB) //sort string ascending
	        return -1 
	      if (nameA > nameB)
	        return 1
	      return 0 //default return value (no sorting)
	    });

	    var page_counter = 1;
	    html += '<div class="filter-page filter-page-1">'
	    
	    for (var i = 0;i < sortable.length;i++){

	      if (i%per_col == 0){
	          html += '<div class="span' + (12 / columns) + '">';
	      } 

	      var sortablename = sortable[i][1].name;
	      if (columns == 4 && sortablename.length > 32){
	        sortablename = sortablename.substr(0,28) + "...";
	      } else if (columns == 3 && sortablename.length > 46){
	        sortablename = sortablename.substr(0,42) + "...";
	      }
	      var sortableamount = sortable[i][1].total.toString();

	      html += '<div class="squaredThree"><div>';
	      html += '<input type="checkbox" value="'+ sortable[i][0] +'" id="'+sortable[i][0]+sortable[i][1].name.toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'" name="'+sortable[i][1].name+'" />';
	      html += '<label class="map-filter-cb-value" for="'+sortable[i][0]+sortable[i][1].name.toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'"></label>';
	      html += '</div><div class="squaredThree-fname"><span>'+sortablename+' (' + sortableamount + ')</span></div></div>';
	      if (i%per_col == (per_col - 1)){
	        html += '</div>';
	      }
	      if ((i + 1) > ((page_counter * (per_col * columns))) - 1) { 
	        
	     
	        html += '</div>';
	        page_counter = page_counter + 1;
	        html += '<div class="filter-page filter-page-' + page_counter + '">';
	      }
	        
	    }

	    html += '<div class="filter-total-pages" name="' + page_counter + '"></div>';

	    /// if paginated, close the pagination.
	    if (page_counter > 1){
	      html += '</div>';
	    }

	    return html;
	}
}

function IndicatorFilters(){
	IndicatorFilters.prototype = Object.create(OipaFilters.prototype);
}

function CPIFilters(){
	CPIFilters.prototype = Object.create(OipaFilters.prototype);
}

function OipaUrl(){

	this.get_selection_from_url = function(){

	}

	this.set_current_url = function(){
		  var link = document.URL.toString().split("?")[0] + build_parameters();
		  if (history.pushState) {
		    history.pushState(null, null, link);
		  }
	}

	this.build_parameters = function (api_call){


	// switch




	// build current url based on selection made
	  var url = '?p=';
	  if (!(typeof oipaSelection.sectors === "undefined")) url += build_current_url_add_par("sectors", oipaSelection.sectors);
	  if (!exclude_countries){
	    if (!(typeof oipaSelection.countries === "undefined")) url += build_current_url_add_par("countries", oipaSelection.countries);
	  }
	  if (!(typeof oipaSelection.budgets === "undefined")) url += build_current_url_add_par("budgets", oipaSelection.budgets);
	  if (!(typeof oipaSelection.regions === "undefined")) url += build_current_url_add_par("regions", oipaSelection.regions);
	  if (!(typeof oipaSelection.indicators === "undefined")) url += build_current_url_add_par("indicators", oipaSelection.indicators);
	  if (!(typeof oipaSelection.cities === "undefined")) url += build_current_url_add_par("cities", oipaSelection.cities);
	  if (!(typeof oipaSelection.reporting_organisations === "undefined")) url += build_current_url_add_par("reporting_organisations", oipaSelection.reporting_organisations);
	  if (!(typeof oipaSelection.offset === "undefined")) url += build_current_url_add_par("offset", oipaSelection.offset);
	  if (!(typeof oipaProjectList.per_page === "undefined")) url += build_current_url_add_par("per_page", oipaProjectList.per_page);
	  if (!(typeof oipaProjectList.order_by === "undefined")) url += build_current_url_add_par("order_by", oipaProjectList.order_by);
	  if (!(typeof oipaProjectList.query === "undefined")) url += build_current_url_add_par("query", oipaProjectList.query);
	  if (url == '?p='){return '';}
	  url = url.replace("?p=&", "?");

	  return url;
	}

	this.build_current_url_add_par = function(name, arr, dlmtr){

	  if(dlmtr === undefined){
	    dlmtr = ",";
	  }

	  if(arr.length == 0){return '';}
	  var par = '&' + name + '=';
	  for(var i = 0; i < arr.length;i++){
	    par += arr[i].id.toString() + dlmtr;
	  }
	  par = par.substr(0, par.length - 1);

	  return par;
	}
}


function OipaVis(){
	this.type = null;
	this.data_url = null;
	this.parameters = new Array();

	this.export = function(filetype){
		new OipaExport(this, filetype);
	};

	this.embed = function(){
		var embed = new OipaEmbed(this);
	}

	this.get_url = function(){

	}

	this.refresh = function(){

	}

}


function OipaTableChart(){
	OipaTableChart.prototype = Object.create(OipaVis.prototype);

}

function OipaLineChart(){
	OipaLineChart.prototype = Object.create(OipaVis.prototype);

}

function OipaBubbleChart(){
	OipaBubbleChart.prototype = Object.create(OipaVis.prototype);

}

function OipaExport(vis, filetype){
	this.visualisation = vis;
	this.filetype = filetype;
	
	function render(){

	}

}

function OipaEmbed(vis){
	this.visualisation = vis;


}


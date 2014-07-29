$("#main-map .change-basemap-link").click(function(e){
	e.preventDefault();
	var basemap_id = $(this).attr("name");
	map.change_basemap(basemap_id);
});

$("#left-map .change-basemap-link").click(function(e){
	e.preventDefault();
	var basemap_id = $(this).attr("name");
	leftmap.change_basemap(basemap_id);
});

$("#right-map .change-basemap-link").click(function(e){
	e.preventDefault();
	var basemap_id = $(this).attr("name");
	rightmap.change_basemap(basemap_id);
});

$(".filters-save-button").click(function(e){
	e.preventDefault();
	var saved = filter.save();
	if (saved){
		$(".sort-list .active .opener").click();
	}
	console.log(saved);
});

$("#reset-filters").click(function(e){
	filter.reset_filters();
});

$(".compare-filters-save-button").click(function(e){
	filter.save();

});

$("#compare-cities-randomize").click(function(e){

	e.preventDefault();
	OipaCompare.randomize();

});

$("#indicator-filter-wrapper .filter-open").click(function(e){
	var filtername = $(this).attr("name");
	filter.reload_specific_filter(filtername);

});

function get_random_city_within_selection(selection, already_chosen){
	
	var rand = selection[Math.floor(Math.random() * selection.length)];

	if(already_chosen){
		if(rand==already_chosen){
			rand = get_random_city_within_selection(selection, already_chosen);
		}
	}

	return rand;
}

$("#opener-left-cities").click(function(e){
	e.preventDefault();
	filter.reload_specific_filter("left-cities", null);
});

$("#opener-right-cities").click(function(e){
	e.preventDefault();
	filter.reload_specific_filter("right-cities", null);
});

$("#header-login-register-button").click(function(e){
	if ($(this).attr("href") == "#"){
		e.preventDefault();
		$("#hoover-wrapper").show();
		$("#urbannumbers-login").show();
	}
	

});

$("#lost-password-login").click(function(e){
	e.preventDefault();
	$("#urbannumbers-login").hide();
	$("#urbannumbers-lostpassword").show();

});

$("#register-button").click(function(e){
	e.preventDefault();	
	$("#urbannumbers-register").show();
	$("#urbannumbers-login").hide();
});

$("#delete-account-button").click(function(e){
	e.preventDefault();
	$("#hoover-wrapper").show();
	$("#urbannumbers-remove-account").show();
});

$(".close-login").click(function(e){
	e.preventDefault();
	$("#hoover-wrapper").hide();
	$("#urbannumbers-login").hide();
	$("#urbannumbers-register").hide();
	$("#urbannumbers-lostpassword").hide();
});


function UnhabitatOipaCompareFilters(){
	this.get_url = function(selection, parameters_set){
		// get url from filter selection object
		if (parameters_set){
			var cururl = search_url + "indicator-filter-options/?format=json&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity&adm_division__in=city" + parameters_set;
		} else {
			var cururl = search_url + "indicator-filter-options/?format=json&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity&adm_division__in=city&indicators__in=" + get_parameters_from_selection(this.selection.indicators);
		}
		
		return cururl;
	};
}
UnhabitatOipaCompareFilters.prototype = new OipaCompareFilters();

function UnhabitatOipaIndicatorFilters(){

	this.get_url = function(selection, parameters_set){
		// get url from filter selection object
		if (parameters_set){
			var cururl = search_url + "indicator-filter-options/?format=json&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity" + parameters_set;
		} else {
			var cururl = search_url + "indicator-filter-options/?format=json&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity&indicators__in=" + get_indicator_parameters_from_selection(this.selection.indicators) + "&regions__in=" + get_parameters_from_selection(this.selection.regions) + "&countries__in=" + get_parameters_from_selection(this.selection.countries) + "&cities__in=" + get_parameters_from_selection(this.selection.cities);
		}
		
		return cururl;
	};

	this.reset_filters = function(){
		jQuery("#"+this.filter_wrapper_div+" input[type=checkbox]").attr('checked', false);
		filter.selection.search = "";
		filter.selection.query = "";
		filter.selection.country = "";
		filter.selection.region = "";
		filter.selection.regions = [];
		filter.selection.cities = [];
		filter.selection.countries = [];
		filter.selection.indicators = [];
		filter.selection.indicators.push({"id": "urban_population_countries", "name": "Urban population – Countries", "type": "Slum dwellers"});
		// TO DO: set checkboxes
		filter.save(true);
	}
};
UnhabitatOipaIndicatorFilters.prototype = new OipaIndicatorFilters();


function get_wiki_city_data(city_name, left_right_city){

	city_name = city_name.replace(" ", "_");

	//An approch to getting the summary / leading paragraphs / section 0 out of Wikipedia articlies within the browser using JSONP with the Wikipedia API: http://en.wikipedia.org/w/api.php

	// var url = "http://en.wikipedia.org/wiki/";
	// var title = url.split("/");
	// title = title[title.length - 1];
	var text = "";
	//Get Leading paragraphs (section 0)
	$.getJSON("http://en.wikipedia.org/w/api.php?action=parse&page=" + city_name + "&prop=text&section=0&format=json&callback=?", function (data) {
	    

	    for (text in data.parse.text) {
	        var text = data.parse.text[text].split("<p>");
	        var pText = "";

	        for (p in text) {
	            //Remove html comment
	            text[p] = text[p].split("<!--");
	            if (text[p].length > 1) {
	                text[p][0] = text[p][0].split(/\r\n|\r|\n/);
	                text[p][0] = text[p][0][0];
	                text[p][0] += "</p> ";
	            }
	            text[p] = text[p][0];

	            //Construct a string from paragraphs
	            if (text[p].indexOf("</p>") == text[p].length - 5) {
	                var htmlStrip = text[p].replace(/<(?:.|\n)*?>/gm, '') //Remove HTML
	                var splitNewline = htmlStrip.split(/\r\n|\r|\n/); //Split on newlines
	                for (newline in splitNewline) {
	                    if (splitNewline[newline].substring(0, 11) != "Cite error:") {
	                        pText += splitNewline[newline];
	                        pText += "\n";
	                    }
	                }
	            }
	        }
	        pText = pText.substring(0, pText.length - 2); //Remove extra newline
	        pText = pText.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)
	        text = pText;
	        jQuery("."+left_right_city+"-city-wikipedia").text(pText);
	    }
	});
}

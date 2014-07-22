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
	filter.save();
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
};
UnhabitatOipaIndicatorFilters.prototype = new OipaIndicatorFilters();

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

$(".compare-filters-save-button").click(function(e){
	filter.save();
});

$("#compare-cities-randomize").click(function(e){

	e.preventDefault();
	OipaCompare.randomize();

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
	filter.reload_specific_filter("left-cities", null);
});

$("#opener-right-cities").click(function(e){
	filter.reload_specific_filter("right-cities", null);
});


function OipaCompareFilters() {
	OipaCompareFilters.prototype = Object.create(OipaFilters.prototype);


}





$("#header-login-register-button").click(function(e){
	e.preventDefault();

	$("#hoover-wrapper").show();
	$("#urbannumbers-login").show();

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



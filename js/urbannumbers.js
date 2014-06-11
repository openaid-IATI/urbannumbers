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












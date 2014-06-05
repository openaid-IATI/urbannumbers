



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

$("#compare-cities-randomize").click(function(e){

	e.preventDefault();
	// get cities


	// choose 2 random ones
	selection = [31, 92, 286, 308, 617, 628, 714, 1812, 1843, 2697, 5354, 5486, 5898, 6060, 6080, 6103, 6121, 6150, 6153, 6128];
	var city_id_1 = get_random_city_within_selection(selection);
	var city_id_2 = get_random_city_within_selection(selection, city_id_1);

	set_city(city_id_1, 1);
	set_city(city_id_2, 2);

	console.log(search_url);

});

var OipaCompare = {
	item1 : null,
	item2 : null,
	refresh_state : 0,
	refresh_comparison: function(){
		leftmap.map.setView(this.item1.latlng, 10);
		rightmap.map.setView(this.item2.latlng, 10);
		$("#compare-left-title").text(this.item1.name);
		$("#compare-right-title").text(this.item2.name);
	}
}

function set_city(city_id, city_1_or_2){

	var city = new OipaCity();
	city.id = city_id;
	if (city_1_or_2 == 1){
		OipaCompare.item1 = city;
	} else if (city_1_or_2 == 2){
		OipaCompare.item2 = city;
	}

	url = search_url + "cities/?format=json&id=" + city_id;

	$.support.cors = true; 
  
	if(window.XDomainRequest){
	var xdr = new XDomainRequest();
	xdr.open("get", url);
	xdr.onprogress = function () { };
	xdr.ontimeout = function () { };
	xdr.onerror = function () { };
	xdr.onload = function() {
	   var jsondata = $.parseJSON(xdr.responseText);
	   if (jsondata == null || typeof (jsondata) == 'undefined')
	   {
	        jsondata = $.parseJSON(data.firstChild.textContent);
	        city.set_compare_data(jsondata);
	   }
		
	}
	setTimeout(function () {xdr.send();}, 0);
	} else {

		$.ajax({
		      type: 'GET',
		       url: url,
		       contentType: "application/json",
		       dataType: 'json',
		       success: function(data){
		          city.set_compare_data(data);
		       }
		});
	}

}


function get_random_city_within_selection(selection, already_chosen){
	
	var rand = selection[Math.floor(Math.random() * selection.length)];

	if(already_chosen){
		if(rand==already_chosen){
			rand = get_random_city_within_selection(selection, already_chosen);
		}
	}

	return rand;
}

function geo_point_to_latlng(point_string){
	point_string = point_string.replace("POINT (", "");
	point_string = point_string.substring(0, point_string.length - 1);
	lnglat = point_string.split(" ");
	latlng = [lnglat[1], lnglat[0]];
	return latlng;
}


function OipaCity(){
	this.id = null;
	this.name = null;
	this.latlng = null;

	this.set_compare_data = function(data){
		this.name = data.objects[0].name;
		this.latlng = geo_point_to_latlng(data.objects[0].location);
		OipaCompare.refresh_state++;
		if (OipaCompare.refresh_state > 1){
			
			OipaCompare.refresh_state = 0;
			// refresh map
			OipaCompare.refresh_comparison();
		}
		
	}
}
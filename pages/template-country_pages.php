<?php
/*
Template Name: Country pages
*/

$indicators = array();
if (isset($_GET['indicators'])) {
    $indicators = explode(',', $_GET['indicators']);
}

$countries = array();
if (isset($_GET['countries'])) {
    $countries = explode(',', $_GET['countries']);
}

get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map no-shadow">
			<!-- container-sort -->
			<?php get_template_part("indicator", "filters"); ?>


			<div class="heading-row"><span class="heading">SELECTION: <a href="#">XXXX</a></span></div>
			<!-- sort-columns -->
			<div class="sort-columns">
				<div class="column">
					<span class="heading">COUNTRY</span>
					<ul class="sort-info">
						<li><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_name">Loading... </span></li>
					</ul>
				</div>
				<div class="column style00" id="year_widget">
					<span class="heading">YEAR</span>
					<ul class="sort-info">
						<li class="value"><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_year">2000</span></li>
					</ul>
				</div>
				<div class="column style01">
					<span id="horizontal_vis_block_year_ind_1_name" class="heading">Average city prosperity</span>
					<div class="widget"><img src="<?php echo get_template_directory_uri(); ?>/images/img36.png" alt=""></div>
				</div>
				<div class="column style02">
					<span id="horizontal_vis_block_year_ind_2_name" class="heading">Total road network (in Km)</span>
					<div class="widget"><img src="<?php echo get_template_directory_uri(); ?>/images/img37.png" alt=""></div>
				</div>
				<div class="column style03">
					<span id="horizontal_vis_block_year_ind_3_name" class="heading">Population</span>
					<ul class="sort-info">
						<li><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_year_ind_3_value"> </span> Urban</li>
						<li><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_year_ind_4_value"> </span> Slum</li>
					</ul>
				</div>
				<div class="column style03">
					<span class="heading">&nbsp;</span>
					<ul class="sort-info">
						<li><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_year_ind_5_value"> </span> Rural</li>
						<li><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_year_ind_6_value"> </span> Total</li>
					</ul>
				</div>
			</div>
			
			<div id="map-wrapper">
			<?php 
			$curmapname = "main";
			include( TEMPLATEPATH .'/map.php' ); 
			?>
				<?php if(!is_page("city-prosperity")){ ?>
			    <div id="map-timeline-wrapper">
			        <div id="timeline-left"></div>
			        <div id="map-timeline">
			            <div id="map-slider-tooltip">
			            </div>

			            <?php for ($i = 1950; $i < 2051;$i++){   
			            echo '<div class="slider-year';
			            echo '" id="year-' . $i . '">';
			            if ($i == 1950) { echo '<div class="slider-year-inner-left"></div>';}
			            echo '<div class="slider-year-inner-white"></div></div>'; 
			            } ?>
			        </div>
			        <div id="timeline-right"></div>
			    </div>
			    <?php } ?>
			</div>

		<?php //include( TEMPLATEPATH .'/indicator-visualisations.php' ); ?>
		</div>

	</div>


<style> 
.widget label{
	display: none;
}
.container-map .columns-holder{
	box-shadow: 0;
}
</style>


<?php get_template_part("footer", "scripts"); ?>

<script>


	

function OipaCountry(){
	this.id = null;
	this.name = null;
	this.latlng = null;
	this.cities = null;
	this.capital_city = null;
	this.region_id = null;
	this.polygon = null;
	this.center_longlat = null;
	var thiscountry = this;

	this.get_data = function(data, map_left_right){

		this.name = data.objects[0].name;
		this.latlng = geo_point_to_latlng(data.objects[0].location);

		if(map_left_right == "left"){
			OipaCompare.item1 = this;
			get_wiki_city_data(this.name, "left");
		} else if (map_left_right == "right"){
			OipaCompare.item2 = this;
			get_wiki_city_data(this.name, "right");
		}

		OipaCompare.refresh_state++;
		
		if (OipaCompare.refresh_state > 1){
			
			OipaCompare.refresh_state = 0;
			// refresh map
			OipaCompare.refresh_comparison();
		}	
	}

	this.set_data = function() {

		url = search_url + "countries/"+this.id+"/?format=json";

		jQuery.support.cors = true;
	
		jQuery.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'json',
			success: function(data){

				thiscountry.name = data.name;
				thiscountry.capital_city = data.capital_city;
				thiscountry.cities = data.cities;
				thiscountry.region_id = data.region_id;
				thiscountry.polygon = JSON.parse(data.polygon);
				thiscountry.center_longlat = geo_point_to_latlng(data.center_longlat);

				thiscountry.init_country_page();
			}
		});
	};


	this.get_cities_within_country = function(){

		// This might get really slow when we add more data (it loads all indicator data from the country)
		// TO DO: add functionality to only get Urbnrs data from the indicator-data call -> &categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity
		// this func is in indicator-filter-options already.
		url = search_url + "indicator-data/?format=json&countries__in=" + thiscountry.id;

		jQuery.support.cors = true;
	
		jQuery.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'json',
			success: function(data){

				thiscountry.cities = new Object();

				// loop through indicators and get city id, name, latitude, longitude
				var years = {min: null, max: null};
                $.each(data, function(_, indicator) {
                    if (typeof(indicator) == "string") {
                        // do not continue if indicator is undefined
                        return;
                    }

                    $.each(indicator.locs, function(_, loc) {

                    	if (!(loc.id in thiscountry.cities) && !(isNaN(loc.id))){
                    		thiscountry.cities[loc.id] = {"id": loc.id, "name": loc.name, "latitude": loc.latitude, "longitude": loc.longitude};

                    		// show cities in country as circle with orange color, capital city as green color
							color = "#008b85";
							radius = 30000;
							opacity = 0.7;
							if (loc.name == thiscountry.capital_city.name){
								color = "#f06002";
								radius = 50000;
								opacity = 0.9;
							}

							var circle = L.circle([loc.latitude, loc.longitude], radius, {
					                color: "#666",
					                weight: '0.5',
					                fillColor: color,
					                fillOpacity: opacity
					        }).bindPopup('<a href="/compare-cities/city-pages/?cities='+loc.id+'"><h4>'+loc.name+'</h4></a>').addTo(map.map);

                    	}

                	});
				});
			}
		});
	}

	this.get_markers_bounds = function(){

		var minlat = 0;
		var maxlat = 0;
		var minlng = 0;
		var maxlng = 0;
		var first = true;

		for (var i = 0;i < this.polygon.coordinates.length;i++){
			for (var y = 0;y < this.polygon.coordinates[i].length;y++){
				
				curlat = this.polygon.coordinates[i][0][y][1];
		  		curlng = this.polygon.coordinates[i][0][y][0];

		  		if (first){
					minlat = curlat;
					maxlat = curlat;
					minlng = curlng;
					maxlng = curlng;
					first = false;
				}

				if (curlat < minlat){ minlat = curlat; }
				if (curlat > maxlat){ maxlat = curlat; }
				if (curlng < minlng){ minlng = curlng; }
				if (curlng > maxlng){ maxlng = curlng; }
			}
		}

		return [[minlat, minlng],[maxlat, maxlng]];
	}


	this.init_country_page = function(){

		// use polygon to get outter bounds -> to zoom in
		map.map.setView(this.center_longlat);
		var bounds = this.get_markers_bounds();
	    map.map.fitBounds(bounds);
		
		// set country name
		jQuery("#horizontal_vis_block_name").text(this.name);


		// cities
		this.get_cities_within_country();
		

		// show indicators for the country
		// country_indicator_1_namecountry_indicator_2_namecountry_indicator_3_name
		// for (var i = 0;i < filter.selection.indicators.length;i++){
		// 	if (i == 3){ break; }

		// 	jQuery("#horizontal_vis_block_year_ind_"+(i+1)+"_name").text(filter.selection.indicators[i].name);

		// }
		
		// urban_population_countries
		// pop_urban_percentage
		// population
	    
	    // show indicators for the cities in the country

	}


}

	


	
	Oipa.pageType = "indicator-country-page";
	Oipa.mainSelection = new OipaIndicatorSelection(1);
	
	var map = new OipaIndicatorMap();

	map.set_map("main-map");
	map.init();
	
	map.selection = Oipa.mainSelection;
	Oipa.maps.push(map);
	
	var filter = new UnhabitatOipaIndicatorFilters();

	filter.filter_wrapper_div = "indicator-filter-wrapper";
	filter.selection = Oipa.mainSelection;
	<?php
    if (!(count($indicators))) { ?>
    	filter.selection.indicators.push({"id": "population", "name": "Total population", "type": "Slum dwellers"});
        filter.selection.indicators.push({"id": "urban_population_countries", "name": "Urban population", "type": "Slum dwellers"});
        filter.selection.indicators.push({"id": "urban_slum_population_countries", "name": "Urban slum population", "type": "Slum dwellers"});
        filter.selection.indicators.push({"id": "rural_population", "name": "Rural population", "type": "Slum dwellers"});
    <?php } 

    if (!(count($countries))) { ?>
        filter.selection.countries.push({"id": "KE", "name": "Kenya"});
    <?php } ?>


	filter.init();
	

	if (filter.selection.countries.length > 0){
		
		var country = new OipaCountry();
		country.id = filter.selection.countries[0].id;
		country.set_data();


		function temp_patch_map(map) {
	        // Monkey patch map.refresh_circles function to trigger year_changed event
	        var _original_refresh_circles = map.refresh_circles;
	        map.refresh_circles = function(year) {
	            var _ = _original_refresh_circles.apply(this, [year]);
	            
        		$("#horizontal_vis_block_year").text(year);


        		urban_pop = Math.round(map.circles.locations[country.id].urban_population_countries.years[year]) * 1000;
        		$("#horizontal_vis_block_year_ind_3_value").text(comma_formatted(urban_pop));
        		

        		if (typeof(map.circles.locations[country.id].urban_slum_population_countries) != "undefined"){
        			slum_pop = Math.round(map.circles.locations[country.id].urban_slum_population_countries.years[year]) * 1000;
        			$("#horizontal_vis_block_year_ind_4_value").text(comma_formatted(slum_pop));
        		} else {
        			$("#horizontal_vis_block_year_ind_4_value").text("N/A");
        		}

        		if (typeof(map.circles.locations[country.id].rural_population) != "undefined"){
        			rural_pop = Math.round(map.circles.locations[country.id].rural_population.years[year]) * 1000;
        			$("#horizontal_vis_block_year_ind_5_value").text(comma_formatted(rural_pop));
        		} else {
        			$("#horizontal_vis_block_year_ind_5_value").text("N/A");
        		}

				if (typeof(map.circles.locations[country.id].population) != "undefined"){
        			pop = Math.round(map.circles.locations[country.id].population.years[year]) * 1000;
        			$("#horizontal_vis_block_year_ind_6_value").text(comma_formatted(pop));
        		} else {
        			$("#horizontal_vis_block_year_ind_6_value").text("N/A");
        		}

        		
	            return _;
	        }
	        // this.patch_refresh(map);
	    }

	    temp_patch_map(map);
    

	    // Create infographics
	    // var first = new OipaPieInfographicsVis('pop_urban_percentage', 1, {});
	    // first.selection = Oipa.mainSelection;
	    // first.init();

	    // OipaWidgetsBus.patch_map(map);

	}

	filter.save(true);

	

</script>

<?php get_footer(); ?>
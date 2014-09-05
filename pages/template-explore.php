<?php
/*
Template Name: Explore
*/
get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map">
			<!-- container-sort -->
			<?php get_template_part("indicator", "filters"); ?>


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
		</div>

		<?php include( TEMPLATEPATH .'/indicator-visualisations.php' ); ?>
	</div>

<?php get_template_part("footer", "scripts"); ?>

<script>
	Oipa.pageType = "indicators";
	Oipa.mainSelection = new OipaIndicatorSelection(1);
	
	var map = new OipaIndicatorMap();
	map.set_map("main-map");
	map.init();
	map.map.setZoom(3);
	
	map.selection = Oipa.mainSelection;
	Oipa.maps.push(map);
	
	var filter = new UnhabitatOipaIndicatorFilters();
	filter.filter_wrapper_div = "indicator-filter-wrapper";
	filter.selection = Oipa.mainSelection;
	filter.init();

    <?php
    $indicators = array();
    if (isset($_GET['indicators']) && !empty($_GET['indicators'])) {
        $indicators = explode(',', $_GET['indicators']);
    }
    if (count($indicators)) {
        foreach ($indicators as $indicator) { ?>
            filter.selection.indicators.push({"id": "<?=$indicator?>", "name": "Urban population – Countries", "type": "Slum dwellers"});
        <?php
        }
    } else { ?>
        filter.selection.indicators.push({"id": "slum_proportion_living_urban", "name": "Urban population – Countries", "type": "Slum dwellers"});
        filter.selection.indicators.push({"id": "urban_population_cities", "name": "Urban population – Countries", "type": "Slum dwellers"});
        filter.selection.indicators.push({"id": "urban_population_countries", "name": "Urban population – Countries", "type": "Slum dwellers"});
    <?php } ?>
	filter.save(true);

    OipaWidgetsBus.patch_map(map);

</script>

<?php get_template_part("footer", "bus_scripts"); ?>

<?php get_footer(); ?>
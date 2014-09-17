<?php
/*
Template Name: Explore
*/
get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map">
			<!-- container-sort -->
			<?php /*get_template_part("indicator", "filters");*/ ?>

            <div id="map-wrapper">
                <div id="map-indicator-filter-wrapper">
                    <div class="sort-holder">
                        <div class="map-indicator-header"><a href="javascript:void(0)"><i class="glyphicon glyphicon-align-justify"></i> MAP FILTERS</a><a href="#" id="reset-filters" class="btn btn-default reset-button">Reset</a></div>
                        <ul class="sort-list">
                            <li class="Cityprosperity-li">
                                <div><a name="Cityprosperity" class="opener filter-open" href="#">City prosperity <span class="caret"></span></a></div>
                                <ul class="Cityprosperity-list subul">
                                </ul>
                            </li>
                            <li class="Slumdwellers-li">
                                <div><a name="Slumdwellers" class="opener filter-open" href="#">Slum dwellers <span class="caret"></span></a></div>
                                <ul class="Slumdwellers-list subul">
                                </ul>
                            </li>
                            <li class="Publicspaces-li">
                                <div><a name="Publicspaces" class="opener filter-open" href="#">Public spaces <span class="caret"></span></a></div>
                                <ul class="Publicspaces-list subul">
                                </ul>
                            </li>
                            <li class="regions-li">
                                <div><a name="regions" class="opener filter-open" href="#">REGION <span class="caret"></span></a></div>
                                <ul class="regions-list subul">
                                </ul>
                            </li>
                            <li class="countries-li">
                                <div><a name="countries" class="opener filter-open" href="#">COUNTRY <span class="caret"></span></a></div>
                                <ul class="countries-list subul">
                                </ul>
                            </li>
                            <li class="cities-li">
                                <div><a name="cities" class="opener filter-open" href="#">CITY <span class="caret"></span></a></div>
                                <ul class="cities-list subul">
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
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
	
	var map = new OipaIndicatorMap(true);
	map.set_map("main-map");
	map.init();
	map.map.setZoom(3);
	
	map.selection = Oipa.mainSelection;
	Oipa.maps.push(map);
	
	var filter = new UnhabitatInMapOipaIndicatorFilters();
	filter.filter_wrapper_div = "map-indicator-filter-wrapper";
	filter.selection = Oipa.mainSelection;
	filter.init();

    <?php
    $indicators = array();
    if (isset($_GET['indicators']) && !empty($_GET['indicators'])) {
        $indicators = explode(',', $_GET['indicators']);
    }
    
    if (count($indicators)) {
        foreach ($indicators as $indicator) { ?>
            filter.selection.add_indicator("<?=$indicator?>", "Urban population – Countries", "Slum dwellers");
        <?php
        }
    } else { ?>
        filter.selection.add_indicator("slum_proportion_living_urban", "Urban population – Countries", "Slum dwellers");
        filter.selection.add_indicator("urban_population_cities", "Urban population – Countries", "Slum dwellers");
        filter.selection.add_indicator("urban_population_countries", "Urban population – Countries", "Slum dwellers");
    <?php } ?>
	filter.save(true);

    OipaWidgetsBus.patch_map(map);

</script>

<?php get_template_part("footer", "bus_scripts"); ?>

<?php get_footer(); ?>
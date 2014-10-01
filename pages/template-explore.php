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
                                <div>
                                    <i class="map-indicator-filter-icon icon-yellow "></i>
                                    <a name="Cityprosperity" class="opener filter-open" href="#"><label class="top">City prosperity</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Cityprosperity-list subul">
                                </ul>
                            </li>
                            <li class="Slumdwellers-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-green"></i>
                                    <a name="Slumdwellers" class="opener filter-open" href="#"><label class="top">Slum dwellers</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Slumdwellers-list subul">
                                </ul>
                            </li>
                            <li class="Population-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Population" class="opener filter-open" href="#"><label class="top">Population</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Population-list subul">
                                </ul>
                            </li>
                            <li class="Streets-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Streets" class="opener filter-open" href="#"><label class="top">Streets</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Streets-list subul">
                                </ul>
                            </li>
                            <li class="Transport-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Transport" class="opener filter-open" href="#"><label class="top">Transport</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Transport-list subul">
                                </ul>
                            </li>
                            <li class="Health-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Health" class="opener filter-open" href="#"><label class="top">Health</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Health-list subul">
                                </ul>
                            </li>
                            <li class="Resilience-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Resilience" class="opener filter-open" href="#"><label class="top">Resilience</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Resilience-list subul">
                                </ul>
                            </li>
                            <li class="Education-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Education" class="opener filter-open" href="#"><label class="top">Education</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Education-list subul">
                                </ul>
                            </li>
                            <li class="Crime-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Crime" class="opener filter-open" href="#"><label class="top">Crime</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Crime-list subul">
                                </ul>
                            </li>
                            <li class="Landarea-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue"></i>
                                    <a name="Landarea" class="opener filter-open" href="#"><label class="top">Landarea</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Landarea-list subul">
                                </ul>
                            </li>
                            <li class="Other-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-grey"></i>
                                    <a name="Other" class="opener filter-open" href="#"><label class="top">Other data</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Other-list subul">
                                </ul>
                            </li>
                            <li class="regions-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-white"></i>
                                    <a name="regions" class="opener filter-open" href="#"><label class="top">REGION</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="regions-list subul">
                                </ul>
                            </li>
                            <li class="countries-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-white"></i>
                                    <a name="countries" class="opener filter-open" href="#"><label class="top">COUNTRY</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="countries-list subul">
                                </ul>
                            </li>
                            <li class="cities-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-white"></i>
                                    <a name="cities" class="opener filter-open" href="#"><label class="top">CITY</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
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
	map.set_map("main-map", "topright");
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
            filter.selection.add_indicator("<?=$indicator?>", "Urban population – Countries", 'indicators');
        <?php
        }
    } else { ?>
        filter.selection.add_indicator("slum_proportion_living_urban", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_cities", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_countries", "Urban population – Countries", 'indicators');
    <?php } ?>

	//filter.save(true);
    filter.update_selection_after_filter_load(filter.selection);

    OipaWidgetsBus.patch_map(map);

</script>

<?php get_template_part("footer", "bus_scripts"); ?>

<?php get_footer(); ?>
<?php
/*
Template Name: City pages
*/

$indicators = array();
if (isset($_GET['indicators'])) {
    $indicators = explode(',', $_GET['indicators']);
}

$cities = array();
if (isset($_GET['cities'])) {
    $cities = explode(',', $_GET['cities']);
}

$city = (count($cities) && !empty($cities[0])) ? $cities[0] : 6139;


get_header(); the_post(); ?>
<link media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/country-pages.css">
    <div id="main" class="city-page">
        <!-- container-map -->
        <div class="container-map no-shadow">
            <!-- container-sort -->
            <!-- sort-columns -->
            <div class="sort-columns">
                <div class="column">
                    <span class="heading">CITY</span>
                    <ul class="sort-info">
                        <li><i class="icon-arrow-right"></i> <span class="horizontal_vis_block_name">Loading...</span></li>
                    </ul>
                </div>
                <div class="column style00">
                    <span class="heading">YEAR</span>
                    <ul class="sort-info">
                        <li><i class="icon-arrow-right"></i> <span class="horizontal_vis_block_year">2000</span></li>
                    </ul>
                </div>
                <div class="column style03" id="chart_cpi_wrapper">
                    <span id="horizontal_vis_block_year_ind_1_name" class="heading">City prosperity</span>
                    <ul class="sort-info">
                        <li><i class="icon-arrow-right"></i> <span id="cpi_4_dimensions_data">Loading...</span></li>
                    </ul>
                </div>
                <div class="column style01" id="chart_slum_wrapper">
                    <span id="horizontal_vis_block_year_ind_1_name" class="heading">Slum proportion living in urban areas</span>
                    <ul class="sort-info">
                        <li><i class="icon-arrow-right"></i> <span id="slum_proportion_living_urban_data">Loading...</span></li>
                    </ul>
                </div>
                <div class="column style01" id="chart_pub_wrapper">
                    <span id="horizontal_vis_block_year_ind_1_name" class="heading">Land allocated to street index – City core</span>
                    <ul class="sort-info">
                        <li><i class="icon-arrow-right"></i> <span  id="land_allocated_to_street_index_city_core_data">Loading...</span></li>
                    </ul>
                </div>
                <div class="column style03">
                    <span class="heading">Urban population</span>
                    <ul class="sort-info">
                        <li><i class="icon-arrow-right"></i> <span class="horizontal_vis_block_population">Loading..</span> </li>
                    </ul>
                </div>
            </div>
            
            <div id="map-wrapper">
                <div id="map-indicator-filter-wrapper">
                    <div class="sort-holder">
                        <div class="map-indicator-header">
                            <a href="javascript:void(0)"><i class="glyphicon glyphicon-align-justify"></i> MAP FILTERS</a>
                            <a href="#" id="reset-filters" class="btn btn-default reset-button">Reset</a></div>
                        <ul class="sort-list">
                            <li class="Cityprosperity-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-yellow " style="border-color: rgba(253, 190, 44, 1);"></i>
                                    <a name="Cityprosperity" class="opener filter-open" href="#"><label class="top">City prosperity</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Cityprosperity-list subul">
                                </ul>
                            </li>
                            <li class="Slumdwellers-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-green" style="border-color: rgba(164, 215, 42, 1);"></i>
                                    <a name="Slumdwellers" class="opener filter-open" href="#"><label class="top">Slum dwellers</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Slumdwellers-list subul">
                                </ul>
                            </li>
                            <li class="Population-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(23, 131, 251, 1);"></i>
                                    <a name="Population" class="opener filter-open" href="#"><label class="top">Population</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Population-list subul">
                                </ul>
                            </li>
                            <li class="Streets-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(22, 220, 250, 1)"></i>
                                    <a name="Streets" class="opener filter-open" href="#"><label class="top">Streets</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Streets-list subul">
                                </ul>
                            </li>
                            <li class="Transport-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(253, 23, 130, 1)"></i>
                                    <a name="Transport" class="opener filter-open" href="#"><label class="top">Transport</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Transport-list subul">
                                </ul>
                            </li>
                            <li class="Health-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(254, 31, 23, 1)"></i>
                                    <a name="Health" class="opener filter-open" href="#"><label class="top">Health</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Health-list subul">
                                </ul>
                            </li>
                            <li class="Resilience-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(23, 255, 31, 1)"></i>
                                    <a name="Resilience" class="opener filter-open" href="#"><label class="top">Resilience</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Resilience-list subul">
                                </ul>
                            </li>
                            <li class="Education-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(248, 255, 23, 1)"></i>
                                    <a name="Education" class="opener filter-open" href="#"><label class="top">Education</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Education-list subul">
                                </ul>
                            </li>
                            <li class="Crime-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(0, 0, 0, 1)"></i>
                                    <a name="Crime" class="opener filter-open" href="#"><label class="top">Crime</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Crime-list subul">
                                </ul>
                            </li>
                            <li class="Landarea-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-grey" style="border-color: rgba(182, 182, 182, 1)"></i>
                                    <a name="Landarea" class="opener filter-open" href="#"><label class="top">Landarea</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Landarea-list subul">
                                </ul>
                            </li>
                            <li class="Other-li">
                                <div>
                                    <i class="map-indicator-filter-icon icon-grey" style="border-color: rgba(182, 182, 182, 1)"></i>
                                    <a name="Other" class="opener filter-open" href="#"><label class="top">Other data</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                </div>
                                <ul class="Other-list subul">
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

                        <?php for ($i = 1950; $i < 2051;$i++) {
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
        <?php include( TEMPLATEPATH .'/indicator-visualisations.php' ); ?>
        </div>
        
    </div>




<?php get_template_part("footer", "scripts"); ?>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/oipa/country.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/oipa/city.js"></script>

<script>
    Oipa.pageType = "indicator-country-page";
    Oipa.mainSelection = new OipaIndicatorSelection(1);
    Oipa.invisible_visualizations = ['land_allocated_to_street_index_city_core', 'cpi_6_dimensions'];
    Oipa.mainSelection.indicator_options = {
            chart_class: OipaBarChart,
        }

    var map = new OipaIndicatorMap();
    map.max_circle_size = 5000;
    map.set_map("main-map");
    map.init();

    map.selection = Oipa.mainSelection;
    Oipa.maps.push(map);

    OipaWidgetsBus.patch_map(map);

    var filter = new UnhabitatInMapOipaIndicatorFilters();
    Oipa.filter = filter;

    filter.filter_wrapper_div = "map-indicator-filter-wrapper";
    filter.selection = Oipa.mainSelection;

    filter.selection.indicator_options = {
        chart_class: OipaCountryPieChart
    }

    <?php if (!count($indicators)): ?>
        filter.selection.add_indicator("urban_population_cities", "Urban population", "indicators");
        filter.selection.add_indicator("land_allocated_to_street_index_city_core", "Urban slum population", "indicators");
        filter.selection.add_indicator("urban_population_countries", "Urban population", "indicators");
        filter.selection.add_indicator("slum_proportion_living_urban", "Rural population", "indicators");
        filter.selection.add_indicator("cpi_4_dimensions", "City Prosperity", "indicators");
    <?php else: ?>
    <?php foreach ($indicators as $id => $indicator): ?>
        filter.selection.add_indicator("<?php echo $indicator; ?>", "Loading...", "indicators");
    <?php endforeach; ?>
    <?php endif; ?>

    filter.selection.update_selection("cities", "<?php echo $city; ?>", "Nairobi", "cities");

    filter.init();

    var city = new OipaCity(<?php echo $city; ?>);

    OipaWidgetsBus.add_listener(city);

//filter.save(true);

</script>

<?php get_footer(); ?>
<?php
/*
Template Name: City pages
*/

$indicators = array();
if (isset($_GET['indicators'])) {
    $indicators = explode(',', $_GET['indicators']);
}
$required_indicators = array(
    'cpi_4_dimensions',
    'slum_proportion_living_urban',
    'land_allocated_to_street_index_city_core'
);
if (count($indicators)) {
    foreach ($required_indicators as $ind) {
        if (!in_array($ind, $indicators)) {
            $indicators[] = $ind;
        }
    }
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
            <?php
            include( TEMPLATEPATH .'/in-map-filter.php' );
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
    Oipa.use_prefill = true;
    Oipa.pageType = "indicator-country-page";
    Oipa.mainSelection = new OipaIndicatorSelection(1);
    Oipa.invisible_visualizations = ['land_allocated_to_street_index_city_core', 'cpi_6_dimensions'];
    Oipa.mainSelection.indicator_options = {
            chart_class: OipaBarChart,
        }

    var map = new OipaIndicatorMap();
    map.max_circle_size = 5000;
    map.set_map("main-map", "topright");
    map.init();

    map.selection = Oipa.mainSelection;
    Oipa.maps.push(map);

    OipaWidgetsBus.patch_map(map);

    var city = new OipaCity(<?php echo $city; ?>, map);

    OipaWidgetsBus.add_listener(city);

    var filter = new UnhabitatInMapOipaIndicatorFilters();
    Oipa.filter = filter;

    filter.filter_wrapper_div = "map-indicator-filter-wrapper";
    filter.selection = Oipa.mainSelection;

    filter.selection.indicator_options = {
        chart_class: OipaCountryPieChart
    }

    <?php if (count($indicators)): ?>
    <?php foreach ($indicators as $id => $indicator): ?>
        filter.selection.add_indicator("<?php echo $indicator; ?>", "Loading...", "indicators");
    <?php endforeach; ?>
    <?php endif; ?>

    filter.selection.update_selection("cities", "<?php echo $city; ?>", "Nairobi", "cities");

    filter.init();


//filter.save(true);

</script>

<?php get_footer(); ?>
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
    <div id="main">
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
                <div class="column style01" id="chart_cpi_wrapper">
                    <span id="horizontal_vis_block_year_ind_1_name" class="heading">City prosperity</span>
                    <div class="widget row columns-holder" id="chart_cpi">
                        <canvas height="40" width="40" id="cpi_4_dimensions_canvas"></canvas>
                        <div class="info-overlay"></div>
                    </div>
                </div>
                <div class="column style02" id="chart_road_wrapper">
                    <span id="horizontal_vis_block_year_ind_2_name" class="heading">Intersection density (in km\2)</span>

                    <div class="widget row columns-holder" id="chart_road">
                        <canvas height="40" width="40" id="intersection_density_total_canvas"></canvas>
                        <div class="info-overlay"></div>
                    </div>
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
        <?php if( have_rows('blocks') ): ?>
        <div class="main">
            <div class="container-custom">
                <ul class="box-list large">
                <?php while ( have_rows('blocks') ) : the_row();
                $title = get_sub_field('title');
                $graphic = get_sub_field('graphic');
                if($title || $graphic):
                ?>
                    <li>
                        <!-- container-box -->
                        <section class="container-box">
                            <?php if($title): ?>
                            <header class="heading-holder">
                                <h3><?php echo $title; ?></h3>
                            </header>
                            <?php endif; ?>
                            <?php if($graphic): ?>
                            <div class="box-content">
                                <div class="widget">
                                    <?php echo apply_filters('widget_text', $graphic); ?>
                                </div>
                                <a href="#" class="btn-close"><i class="glyphicon glyphicon-remove"></i></a>
                            </div>
                            <?php endif; ?>
                        </section>
                    </li>
                <?php endif; endwhile; ?>
                </ul>
            </div>
        </div>
        <?php endif; ?>
    </div>




<?php get_template_part("footer", "scripts"); ?>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/oipa/country.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/oipa/city.js"></script>

<script>
    
    Oipa.pageType = "indicator-country-page";
    Oipa.mainSelection = new OipaIndicatorSelection(1);
    
    var map = new OipaIndicatorMap();
    map.set_map("main-map");
    map.init();
    
    map.selection = Oipa.mainSelection;
    Oipa.maps.push(map);

    OipaWidgetsBus.patch_map(map);
    
    var filter = new UnhabitatOipaIndicatorFilters();

    filter.filter_wrapper_div = "indicator-filter-wrapper";
    filter.selection = Oipa.mainSelection;

    filter.selection.indicator_options = {
        chart_class: OipaCountryPieChart
    }

    filter.init();
    <?php if (!count($indicators)): ?>
        filter.selection.add_indicator("base_year_population_estimate", "Total population", "indicators");
        filter.selection.add_indicator("urban_population_cities", "Urban population", "indicators");
        filter.selection.add_indicator("urban_population_share_national", "Urban slum population", "indicators");
        filter.selection.add_indicator("intersection_density_total", "Rural population", "indicators");
        filter.selection.add_indicator("cpi_4_dimensions", "City Prosperity", "indicators");
    <?php else: ?>
    <?php foreach ($indicators as $id => $indicator): ?>
        filter.selection.add_indicator("<?php echo $indicator; ?>", "Rural population", "indicators");
    <?php endforeach; ?>
    <?php endif; ?>

    filter.selection.update_selection("cities", "<?php echo $city; ?>", "Kenya", "cities");

    var city = new OipaCity(<?php echo $city; ?>);

    OipaWidgetsBus.add_listener(city);

    var cpi = new OipaCountryPieInfographicsVis('cpi_4_dimensions', {
        color: "#FFBF00",
    });

    var road = new OipaCountryPieInfographicsVis("intersection_density_total", {
        color: "#FFBF00",
        divide_by: 0.01,
        overlay_transform: function(chart_id_data) {
            return humanReadableSize(chart_id_data.value);
        }
    });

    cpi.init();
    cpi.chartwrapper = '#chart_cpi';
    road.init();
    road.chartwrapper = '#chart_road';

    filter.save(true);

</script>

<?php get_footer(); ?>
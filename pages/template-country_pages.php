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
<link media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/country-pages.css">

    <div id="main">
        <!-- container-map -->
        <div class="container-map no-shadow">
            <!-- container-sort -->
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
                <div class="column style01" id="cpi_wrapper">
                    <span id="horizontal_vis_block_year_ind_1_name" class="heading">City prosperity</span>
                    <div class="widget row columns-holder" id="chart_cpi">
                        <canvas height="40" width="40" id="cpi_4_dimensions_canvas"></canvas>
                        <div class="info-overlay"></div>
                    </div>
                </div>
                <div class="column style02" id="road_wrapper">
                    <span id="horizontal_vis_block_year_ind_2_name" class="heading">Total road network (in Km)</span>

                    <div class="widget row columns-holder" id="chart_road">
                        <canvas height="40" width="40" id="total_length_road_canvas"></canvas>
                        <div class="info-overlay"></div>
                    </div>
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

        <?php include( TEMPLATEPATH .'/indicator-visualisations.php' ); ?>
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
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/oipa/country.js"></script>

<script>

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

filter.selection.indicator_options = {
    chart_class: OipaCountryPieChart
}
<?php
if (!(count($indicators))) { ?>
    filter.selection.indicators.push({"id": "population", "name": "Total population", "type": "Slum dwellers"});
    filter.selection.indicators.push({"id": "urban_population_countries", "name": "Urban population", "type": "Slum dwellers"});
    filter.selection.indicators.push({"id": "urban_slum_population_countries", "name": "Urban slum population", "type": "Slum dwellers"});
    filter.selection.indicators.push({"id": "rural_population", "name": "Rural population", "type": "Slum dwellers"});
    filter.selection.indicators.push({"id": "cpi_4_dimensions", "name": "Rural population", "type": "Slum dwellers"});
    filter.selection.indicators.push({"id": "total_length_road", "name": "Rural population", "type": "Slum dwellers"});
<?php } 

if (!(count($countries))) { ?>
    filter.selection.countries.push({"id": "KE", "name": "Kenya"});
<?php } ?>


filter.init();


if (filter.selection.countries.length > 0) {
    
    var country = new OipaCountry();
    country.id = filter.selection.countries[0].id;
    country.set_data();

    OipaWidgetsBus.patch_map(map);

    OipaWidgetsBus.add_listener(country);

    var cpi = new OipaCountryPieInfographicsVis('cpi_4_dimensions', {
        color: "#FFBF00",
    });

    var road = new OipaCountryPieInfographicsVis('total_length_road', {
        color: "#FFBF00",
    });

    cpi.init();
    cpi.chartwrapper = '#chart_cpi';
    road.init();
    road.chartwrapper = '#chart_road';

}



filter.save(true);

    

</script>

<?php get_footer(); ?>
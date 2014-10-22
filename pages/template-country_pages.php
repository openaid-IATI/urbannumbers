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
                <div class="column style01" id="chart_cpi_wrapper">
                    <span id="horizontal_vis_block_gini_ind_1_name" class="heading">Income Gini Coefficient</span>
                    <ul class="sort-info">
                        <li class="value"><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_gini">Loading...</span></li>
                    </ul>
                </div>
                <div class="column style02" id="chart_road_wrapper">
                    <span id="horizontal_vis_block_year_ind_2_name" class="heading">Total road network (in Km)</span>
                    <ul class="sort-info">
                        <li class="value"><i class="icon-arrow-right"></i> <span id="horizontal_vis_block_chart_road">Loading...</span></li>
                    </ul>
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
Oipa.invisible_visualizations = [
    'population',
    'urban_slum_population_countries',
    'urban_population_countries',
    'rural_population',
    'income_gini_coefficient_countries',
    'total_length_road'
];

var map = new OipaIndicatorMap();

map.set_map("main-map");
map.init();

map.selection = Oipa.mainSelection;
Oipa.maps.push(map);

var filter = new UnhabitatInMapOipaIndicatorFilters();

filter.filter_wrapper_div = "map-wrapper";
filter.selection = Oipa.mainSelection;

filter.selection.indicator_options = {
    chart_class: OipaCountryPieChart,
}
<?php if (count($indicators)): ?>
    <?php foreach($indicators as $k => $indicator): ?>
    <?php $_options = ($indicator == 'slum_proportion_living_urban') ? ", {chart_class: OipaPieChart}" : ""; ?>
    filter.selection.add_indicator("<?php echo $indicator; ?>", "Total population", "indicators"<?php echo $_options; ?>);
    <?php endforeach; ?>
<?php else: ?>
    filter.selection.add_indicator("population", "Total population", "indicators");
    filter.selection.add_indicator("urban_population_countries", "Urban population", "indicators");
    filter.selection.add_indicator("urban_population_cities", "Urban population", "indicators");
    filter.selection.add_indicator("slum_proportion_living_urban", "Urban population", "indicators", {chart_class: OipaPieChart});
    filter.selection.add_indicator("urban_slum_population_countries", "Urban slum population", "indicators");
    filter.selection.add_indicator("rural_population", "Rural population", "indicators");
    filter.selection.add_indicator("income_gini_coefficient_countries", "City Prosperity", "indicators");
    filter.selection.add_indicator("total_length_road", "Total length roadwork", "indicators");
    filter.selection.add_indicator("street_density_city_core", "Street density - city core", "indicators");
<?php endif; ?>

<?php if (count($countries)): ?>
  <?php foreach($countries as $k => $code): ?>
  filter.selection.update_selection("countries", "<?php echo $code; ?>", "Kenya", "countries");
  <?php endforeach; ?>
<?php else: ?>
    filter.selection.update_selection("countries", "KE", "Kenya", "countries");
<?php endif; ?>


filter.init();


if (filter.selection.countries.length > 0) {
    var country = new OipaCountry();
    country.id = filter.selection.countries[0].id;
    country.set_data();

    OipaWidgetsBus.patch_map(map);

    OipaWidgetsBus.add_listener(country);


}

filter.save(true);

</script>

<?php get_footer(); ?>
<?php
/*
Template Name: City compare
*/
get_header(); the_post(); ?>
<div id="main" class="city-compare-wrapper">
    <!-- container-map -->
    <div class="container">
        <?php get_template_part("compare", "filters"); ?>
        <?php get_template_part("compare", "visualisations"); ?>
    </div>
    <div class="container">
        <div class="container-map">
            <div class="columns-holder">
                <div class="holder">
                    <div class="row city-names">
                        <div class="col-md-6">
                            <h2 class="compare-left-city-name"></h2>
                        </div>
                        <div class="col-md-6">
                            <h2 class="compare-right-city-name"></h2>
                        </div>
                    </div>
                    <div id="compare-left-map-border" class="column">
                        <?php
                        $curmapname = "left";
                        include( TEMPLATEPATH .'/map.php' );
                        ?>
                        <div class="text-box">
                            <div class="text-frame left-city-wikipedia"></div>
                        </div>
                    </div>
                    <div id="compare-right-map-border" class="column">
                        <?php
                        $curmapname = "right";
                        include( TEMPLATEPATH .'/map.php' );
                        ?>
                        <div class="text-box">
                            <div class="text-frame right-city-wikipedia"></div>
                        </div>
                    </div>
                    <br clear="all" /><br />
                </div>
            </div>
        </div>

    </div>
</div>

<div class="fav-alert alert alert-success" role="alert"></div>

<?php get_template_part("footer", "scripts"); ?>
<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/compare.css" />
<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/selectric.css" />

<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.selectric.min.js"></script>

<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/city.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/compareFilters.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/unhabitat/compareFilters.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/compare.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/comparemap.js"></script>

<script>
Oipa.use_prefill = false;
Oipa.visualisation_size = 200;
Oipa.pageType = "compare";
Oipa.blank_visualizations_count = 10;
Oipa.mainSelection = new OipaCompareSelection(1);
Oipa.mainSelection.indicator_options = {
    //chart_class: OipaCompareBarChart,
    chart_reset: true,
    all_years: true
}

// Force refresh
var filter_div = "";

var leftmap = new OipaCompareMap();
leftmap.set_map("left-map", "no_zoom");
leftmap.compare_left_right = "left";

OipaWidgetsBus.add_listener(leftmap);
Oipa.maps.push(leftmap);

var rightmap = new OipaCompareMap();
rightmap.set_map("right-map", "no_zoom");
rightmap.compare_left_right = "right";

OipaWidgetsBus.add_listener(rightmap);
Oipa.maps.push(rightmap);

var filter = new UnhabitatOipaCompareFilters();

filter.filter_wrapper_div = 'indicator-filter-wrapper';
filter.selection = Oipa.mainSelection;

<?php
if (isset($_GET['cities']) && !empty($_GET['cities']) && count(explode(',', $_GET['cities']))) {
    foreach (explode(',', $_GET['cities']) as $city): ?>
        filter.selection.update_selection('cities', <?php echo $city; ?>, '', 'cities');
    <?php endforeach;
}
?>

<?php
if (isset($_GET['countries']) && !empty($_GET['countries']) && count(explode(',', $_GET['countries']))) {
    foreach (explode(',', $_GET['countries']) as $country): ?>
        filter.selection.update_selection('countries', '<?php echo $country; ?>', '', 'countries');
    <?php endforeach;
}
?>

<?php
if (isset($_GET['indicators']) && !empty($_GET['indicators']) && count(explode(',', $_GET['indicators']))) {
    foreach (explode(',', $_GET['indicators']) as $indicator): ?>
        filter.selection.add_indicator('<?php echo $indicator; ?>', '', 'indicators');
    <?php endforeach;
}
?>

filter.init();

$("#compare-cities-randomize").click(function(e){
    e.preventDefault();
    OipaCompare.randomize(undefined, true);
});

filter.update_selection_after_filter_load(filter.selection);



</script>

<?php get_template_part("footer", "bus_scripts"); ?>
<?php get_footer(); ?>

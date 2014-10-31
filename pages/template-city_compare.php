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
                    <div id="compare-left-map-border" class="column">
                        <?php
                        $curmapname = "left";
                        include( TEMPLATEPATH .'/map.php' );
                        ?>
                    </div>
                    <div id="compare-right-map-border" class="column">
                        <?php
                        $curmapname = "right";
                        include( TEMPLATEPATH .'/map.php' );
                        ?>
                    </div>
                </div>
            </div>
            <div class="container-text hidden-xs">
                <div class="holder">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <div class="text-box">
                                <div class="text-frame left-city-wikipedia"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="text-box">
                                <div class="text-frame right-city-wikipedia"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="display: none">
            <div class="col-md-4"><a id="reset-filters" class="btn btn-default" href="#">RESET FILTERS</a></div>
            <div class="col-md-4"><a id="compare-cities-randomize" class="btn btn-success" href="#">RANDOMIZE</a></div>
            <div class="col-md-4"><?php get_template_part("share", "widget"); ?></div>
        </div>
        <br />
    </div>
</div>
<?php get_template_part("footer", "scripts"); ?>
<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/compare.css" />
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/city.js"></script>

<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/compareFilters.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/unhabitat/compareFilters.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/compare.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/comparemap.js"></script>

<script>
Oipa.use_prefill = false;
Oipa.visualisation_size = 200;
Oipa.pageType = "compare";
Oipa.mainSelection = new OipaCompareSelection(1);
Oipa.mainSelection.indicator_options = {
    chart_class: OipaCompareBarChart,
    chart_reset: true,
    all_years: true
}

// Force refresh
    var filter_div = "";

var leftmap = new OipaCompareMap();
leftmap.set_map("left-map");
leftmap.compare_left_right = "left";

OipaWidgetsBus.add_listener(leftmap);
Oipa.maps.push(leftmap);

var rightmap = new OipaCompareMap();
rightmap.set_map("right-map");
rightmap.compare_left_right = "right";

OipaWidgetsBus.add_listener(rightmap);
Oipa.maps.push(rightmap);

var filter = new UnhabitatOipaCompareFilters();

filter.selection = Oipa.mainSelection;

filter.init();

$("#compare-cities-randomize").click(function(e){
    e.preventDefault();
    OipaCompare.randomize(undefined, true);
});

filter.update_selection_after_filter_load(filter.selection);

</script>

<?php get_template_part("footer", "bus_scripts"); ?>
<?php get_footer(); ?>
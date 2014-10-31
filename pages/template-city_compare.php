<?php
/*
Template Name: City compare
*/
get_header(); the_post(); ?>
<style>
#visualization_wheel {
    width: 1000px;
}
#visualization_wheel canvas {
    margin-top: -50px;
}
#legend {
    position: absolute; 
    z-index: 999;
    top: 0px;   
    right: 10px;
    background: #FFF;
    padding: 10px;
    display: inline-block;
}
#legend ul li {
    list-style: none;
    display: block;
    width: auto;
}
#legend ul li span {
    width: 20px;
    font-size: 2px;
    padding: 0px 10px;
    vertical-align: middle;
    margin-right: 10px;
}
</style>
    <div id="main" class="city-compare-wrapper">
        <!-- container-map -->
        <div class="container-map small">
            <?php get_template_part("compare", "filters"); ?>

            <div class="container-heading">
                <!-- container-heading -->
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-6"><span id="compare-left-title" class="heading"></span></div>
                    <div class="col-md-6 col-sm-6 col-xs-6"><span id="compare-right-title" class="heading"></span></div>
                </div>
                <!-- action-list -->
                <ul class="action-list">
                    <li><a id="compare-cities-randomize" href="#"><i class="icon-reset"></i>RANDOMIZE</a></li>
                </ul>
            </div>
        </div>

        <?php get_template_part("compare", "visualisations"); ?>
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
                                <div class="text-frame left-city-wikipedia">
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="text-box">
                                <div class="text-frame right-city-wikipedia">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <?php get_template_part("footer", "scripts"); ?>
    <script src="<?php echo get_template_directory_uri(); ?>/js/oipa/city.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/oipa/compare.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/oipa/comparemap.js"></script>

    <script>

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
/*
        filter.selection.add_indicator("urban_population_cities", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("avg_annual_rate_change_percentage_urban", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_share_national", "Urban population – Countries", 'indicators');

        filter.reload_specific_filter('compare-indicators');
*/

    </script>

    <?php get_template_part("footer", "bus_scripts"); ?>

    <script type="text/javascript">
    //filter.save();
    </script>
<?php get_footer(); ?>
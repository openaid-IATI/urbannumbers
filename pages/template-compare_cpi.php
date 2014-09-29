<?php
/*
Template Name: CPI compare
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
        <?php get_template_part("compare", "visualisations"); ?>

    </div>


    <?php get_template_part("footer", "scripts"); ?>
    <script src="<?php echo get_template_directory_uri(); ?>/js/oipa/wheel-chart.js"></script>

    <script>

        Oipa.pageType = "compare";
        Oipa.mainSelection = new OipaCompareSelection(1);
        patch_oipa(Oipa);

        // Force refresh
        OipaWidgetsBus.use_force_refresh = true;
        var filter_div = "";

        var leftmap = new OipaMap();
        leftmap.set_map("left-map");
        leftmap.compare_left_right = "left";
        Oipa.maps.push(leftmap);

        var rightmap = new OipaMap();
        rightmap.set_map("right-map");
        rightmap.compare_left_right = "right";
        Oipa.maps.push(rightmap);


        
        var filter = new UnhabitatOipaCompareFilters();
        filter.selection = Oipa.mainSelection;

        filter.selection.add_indicator("cpi_composite_street_connectivity_index", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("cpi_environment_index", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("cpi_equity_index", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("cpi_infrastructure_index", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("cpi_productivity_index", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("cpi_quality_of_live_index", "Urban population – Countries", 'indicators');
        //OipaCompare.randomize(1);
        filter.init();


        $("#compare-cities-randomize").click(function(e){
            e.preventDefault();
            OipaCompare.randomize(undefined, true);
        });

    </script>

    <?php get_template_part("footer", "bus_scripts"); ?>

    <script type="text/javascript">
    //filter.save();
    </script>
<?php get_footer(); ?>
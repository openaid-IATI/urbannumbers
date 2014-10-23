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
            <?php
                $SHOW_FILTER_GEO = True;
                include( TEMPLATEPATH .'/in-map-filter.php' );
            ?>
            <div class="container-sort share-hover">
                    <ul class="action-list">
                        <?php get_template_part("share", "widget"); ?>
                    </ul>
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
        Oipa.filter = filter;
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
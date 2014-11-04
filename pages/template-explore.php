<?php
/*
Template Name: Explore
*/
get_header(); the_post(); ?>
<div id="main">
    <!-- container-map -->
    <div class="container-sort">
        <div class="container">
            <div class="row compare-controls-nav">
                <div class="col-md-5"><a id="reset-filters" class="btn btn-default" href="#">RESET FILTERS</a></div>
                <div class="col-md-4">
                    <a id="explore-randomize" class="btn btn-success" href="#"><i class="glyphicon glyphicon-refresh"></i> RANDOMIZE</a>
                </div>
            </div>
        </div>
    </div>
<div id="indicator-filter-wrapper" class="container-sort row">
    <div class="container">
    <nav id="indicators-pagination" class="pagination"></nav>

    <div class="slide-content container">
        <div id="indicators-filters" class="holder"></div>
        <div class="btns-holder">
          <div class="holder">
              <a href="#" class="explore-filters-save-button btn btn-blue">Save</a>
              <a href="#" class="explore-filters-close-button btn btn-default">Close</a>
          </div>
        </div>
    </div>
    </div>
</div>
    <div class="container-map">
        <div id="map-wrapper" class="container">
            <div class="row">
                <div class="col-md-6">
                    <?php
                    $curmapname = "main";
                    include( TEMPLATEPATH .'/map.php' ); 
                    ?>
                    <div id="map-timeline-wrapper">
                        <div id="map-timeline">
                            <div id="map-slider-tooltip"></div>
                            <?php for ($i = 1950; $i < 2050;$i++): ?><div class="slider-year" id="year-<?php echo $i; ?>"><?php if ($i == 1950) { echo '<div class="slider-year-inner-left"></div>';} ?><div class="slider-year-inner-white"></div></div><?php endfor; ?>
                        </div>
                    </div>
                        <hr />
                        <h4>Legend map colors</h4>
                        <hr />
                        <div class="row legend">
                            <div class="col-md-4">
                                <i class="map-indicator-filter-icon icon-yellow " style="border-color: rgba(253, 190, 44, 1);"></i><label class="top">City prosperity</label><br />

                                <i class="map-indicator-filter-icon icon-green" style="border-color: rgba(164, 215, 42, 1);"></i><label class="top">Slum dwellers</label><br />

                                <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(23, 131, 251, 1);"></i><label class="top">Population</label><br />

                                <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(22, 220, 250, 1)"></i><label class="top">Streets</label><br />
                            </div>
                            <div class="col-md-4">
                                <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(253, 23, 130, 1)"></i><label class="top">Transport</label><br />

                                <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(254, 31, 23, 1)"></i><label class="top">Health</label><br />

                                <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(23, 255, 31, 1)"></i><label class="top">Resilience</label><br />

                                <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(248, 255, 23, 1)"></i><label class="top">Education</label><br />
                            </div>
                            <div class="col-md-4">

                                <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(0, 0, 0, 1)"></i><label class="top">Crime</label><br />

                                <i class="map-indicator-filter-icon icon-grey" style="border-color: rgba(182, 182, 182, 1)"></i><label class="top">Landarea</label><br />

                                <i class="map-indicator-filter-icon icon-grey" style="border-color: rgba(182, 182, 182, 1)"></i><label class="top">Other data</label>
                            </div>
                        </div>
                        <hr>
                        <p>More information on these UN-Habitat indicators can be found <a href="#">here</a>.</p>
                        <hr>
                </div>
                <div class="col-md-6">
                    <?php include( TEMPLATEPATH .'/indicator-visualisations.php' ); ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php get_template_part("footer", "scripts"); ?>

<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/explore.css" />
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/explore.js"></script>
<script>
    Oipa.visualisation_size = 200;
    Oipa.pageType = "indicators";
    Oipa.mainSelection = new OipaIndicatorSelection(1);

        var map = new OipaIndicatorMap(true);
        map.set_map("main-map", "topright");
        map.init();
        map.map.setZoom(3);
        
        map.selection = Oipa.mainSelection;
        Oipa.maps.push(map);
        
        var filter = new ExploreIndicatorFilters();
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
        } ?>
        filter.update_selection_after_filter_load(filter.selection);
    <?php } else { ?>
        //filter.randomize(3);
        filter.selection.add_indicator("slum_proportion_living_urban", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_cities", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_countries", "Urban population – Countries", 'indicators');
    <?php } ?>

    filter.update_selection_after_filter_load(filter.selection);
        //filter.save(true);

    OipaWidgetsBus.patch_map(map);

</script>

<?php get_template_part("footer", "bus_scripts"); ?>

<?php get_footer(); ?>
<?php
/*
Template Name: Explore
*/
get_header(); the_post();

$popups = new Popups();
$popups->init();

?>
<div id="main">
    <!-- container-map -->
    <div class="container sort-holder">
        <div class="container-sort sort-columns">
            <div class="row compare-controls-nav">
                <div class="col-md-5">
                    <a id="reset-filters" class="btn btn-default" href="#">RESET FILTERS</a>

                    <div class="helper">
                        <i class="glyphicon glyphicon-question-sign"></i>
                        <div class="helper-popup">
                            <?php echo $popups->get('reset_filters', "popup_reset_filters"); ?>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <a id="explore-randomize" class="btn btn-success" href="#"><i class="glyphicon glyphicon-refresh"></i> RANDOMIZE</a>

                    <div class="helper">
                        <i class="glyphicon glyphicon-question-sign"></i>
                        <div class="helper-popup">
                            <?php echo $popups->get('randomize', "popup_randomize"); ?>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 share-col">
                    <ul class="action-list">
                        <li><a class="btn btn-default add-to-favorites" href="#"><i class="glyphicon glyphicon-plus"></i> ADD TO FAVORITES</a></li>
                        <li><a class="opener share-btn btn btn-success" href="#"><i class="glyphicon glyphicon-share-alt"></i> SHARE</a>
                            <div class="dropdown-box share-widget open">
                                <span class="heading">Share</span>
                                <ul class="social-networks">
                                    <li><a href="#" target="_blank" class="icon-facebook">facebook</a></li>
                                    <li><a href="#" target="_blank" class="icon-twitter">twitter</a></li>
                                    <li><a href="#" target="_blank" class="icon-linkedin">linkedin</a></li>
                                    <li><a href="#" target="_blank" class="icon icon-google">google</a></li>
                                </ul>
                                <form action="#">
                                    <fieldset>
                                        <label for="item1">Share link</label>
                                        <div class="input-wrap"><input class="form-control share-widget-input" type="text"></div>
                                        <div class="btn-holder">
                                            <a class="close-share btn btn-blue btn-close">Cancel</a>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="indicator-filter-wrapper" class="container sort-holder">
        <div class="container-map container-sort sort-columns">
        <nav id="indicators-pagination" class="pagination"></nav>

        <div class="helper">
            <i class="glyphicon glyphicon-question-sign"></i>
            <div class="helper-popup">
                <?php echo $popups->get('randomize', "popup_indicators"); ?>
            </div>
        </div>

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

    <div class="container">
        <div id="map-wrapper" class="container">
            <div class="row">
                <div class="col-md-6">
                    <div id="map-indicator-filter-wrapper">
                        <div class="sort-holder">
                            <ul class="sort-list">
                                <li class="regions-li">
                                    <div class="selector">
                                        <i class="map-indicator-filter-icon icon-white" style="border-color: rgba(182, 182, 182, 1)"></i>
                                        <a name="regions" class="opener filter-open" href="#"><label class="top">REGION</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                    </div>
                                    <div id="regions-filters" class="regions-list subul">
                                    </div>
                                </li>
                                <li class="countries-li">
                                    <div class="selector">
                                        <i class="map-indicator-filter-icon icon-white" style="border-color: rgba(182, 182, 182, 1)"></i>
                                        <a name="countries" class="opener filter-open" href="#"><label class="top">COUNTRY</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                    </div>
                                    <div id="countries-filters" class="countries-list subul">
                                    </div>
                                </li>
                                <li class="cities-li">
                                    <div class="selector">
                                        <i class="map-indicator-filter-icon icon-white" style="border-color: rgba(182, 182, 182, 1)"></i>
                                        <a name="cities" class="opener filter-open" href="#"><label class="top">CITY</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                                    </div>
                                    <div id="cities-filters" class="cities-list subul">
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <?php
                    $curmapname = "main";
                    include( TEMPLATEPATH .'/map.php' );
                    ?>
                    <div id="map-timeline-wrapper">
                        <div id="map-slider-tooltip"></div>
                        <div id="map-timeline">
                            <?php for ($i = 1950; $i < 2050;$i++): ?><div class="slider-year" id="year-<?php echo $i; ?>"><?php if ($i == 1950) { echo '<div class="slider-year-inner-left"></div>';} ?><div class="slider-year-inner-white"></div></div><?php endfor; ?>
                        </div>
                    </div>
                        <hr />
                        <h4 class="legend-h4">Legend map colors</h4>
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
                        <p>More information on these UN-Habitat indicators can be found <a href="/about/">here</a>.</p>
                        <hr>
                </div>
                <div class="col-md-6">
                    <?php include( TEMPLATEPATH .'/indicator-visualisations.php' ); ?>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="fav-alert alert alert-success" role="alert"></div>

<?php get_template_part("footer", "scripts"); ?>

<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/explore.css" />
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/explore.js"></script>
<script>
    Oipa.visualisation_size = 200;
    Oipa.pageType = "indicators";
    Oipa.max_prefill = 6;
    Oipa.blank_visualizations_count = 6;
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
    ?>

    <?php if (count($indicators)): ?>
        <?php foreach ($indicators as $indicator): ?>
            filter.selection.add_indicator("<?=$indicator?>", "Urban population – Countries", 'indicators');
        <?php endforeach; ?>
        filter.update_selection_after_filter_load(filter.selection);
    <?php else: ?>
        //filter.randomize(5);
        filter.selection.add_indicator("hiv_prevalence_15_to_49_year", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("population", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("slum_proportion_living_urban", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_cities", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_countries", "Urban population – Countries", 'indicators');
        filter.selection.add_indicator("urban_population_share_national", "Urban population – Countries", 'indicators');
    <?php endif; ?>

    filter.update_selection_after_filter_load(filter.selection);
        //filter.save(true);

    OipaWidgetsBus.patch_map(map);

</script>

<?php get_template_part("footer", "bus_scripts"); ?>

<?php get_footer(); ?>

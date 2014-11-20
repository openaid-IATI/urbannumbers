<?php
/*
Template Name: Indincators
*/
get_header(); the_post();

$popups = new Popups();
$popups->init();

?>
<div id="main">
  <div id="main-map"></div>
                    <?php include( TEMPLATEPATH .'/indicator-visualisations.php' ); ?>
</div>


<?php get_template_part("footer", "scripts"); ?>

<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/explore.css" />
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/explore.js"></script>
<script type="text/javascript">
    Oipa.visualisation_size = 200;
    Oipa.pageType = "indicators";
    Oipa.max_prefill = 6;
    Oipa.blank_visualizations_count = 6;
    Oipa.mainSelection = new OipaIndicatorSelection(1);

    var filter = new ExploreIndicatorFilters();
    Oipa.filter = filter;
    filter.filter_wrapper_div = "map-indicator-filter-wrapper";
    filter.selection = Oipa.mainSelection;
    filter.init();
        // filter.selection.add_indicator("hiv_prevalence_15_to_49_year", "Urban population – Countries", 'indicators');
        // filter.selection.add_indicator("population", "Urban population – Countries", 'indicators');
        // filter.selection.add_indicator("slum_proportion_living_urban", "Urban population – Countries", 'indicators');
        // filter.selection.add_indicator("urban_population_cities", "Urban population – Countries", 'indicators');
        // filter.selection.add_indicator("urban_population_countries", "Urban population – Countries", 'indicators');
        // filter.selection.add_indicator("urban_population_share_national", "Urban population – Countries", 'indicators');
        $(function() {
    $.ajax({
      url: 'http://149.210.163.126/api/v3/indicator-filter-options/?format=json',
      data: {},
      success: function(data) {
        $.each(data.indicators, function(a, b) {
           filter.selection.add_indicator(a, b.name, 'indicators');
           console.log('added', a);
        });
        filter.save(true);
        // Oipa.create_visualisations(data);
      },
      dataType: 'json'
    });
            console.log('b');
  });

</script>

<?php get_template_part("footer", "bus_scripts"); ?>

<?php get_footer(); ?>

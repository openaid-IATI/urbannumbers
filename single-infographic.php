<?php 
get_header(); 
the_post(); 
$subtitle = get_field('subtitle');
$user_name = get_field('user-name');
$visualisations = get_field('visualisations');

if (is_array($visualisations) && array_key_exists('user-name', $visualisations)) {
    unset($visualisations['user-name']);
}


ob_start();
the_content();
$the_content = ob_get_clean();
?>
    <div id="main">

        <div class="container ci-main">
            <div class="ci-controls row">
                <div class="steps-nav col-md-8">
                    <?php if (is_user_logged_in()): ?>
                    <a href="javascript: void(0)" name="<?php the_ID(); ?>" class="save-infographic btn btn-info">Save to dashboard</a>
                    <?php endif; ?>
                    <!--a href="#export" class="btn btn-info">Export</a-->
                    <!--a href="#share" class="btn btn-info">Share</a-->
                </div>
                <div class="col-md-4">
                    <a href="/create-infographic/" class="save_btn btn btn-success">Create new</a>
                </div>
            </div>
        </div>
        <!-- main-container -->
        <div class="main-container">
            <section class="main-block">
                <header class="heading-container">
                    <div class="container-custom">
                        <h1><?php the_title(); ?></h1>
                        <p><?php the_date(); ?></p>
                        <p>Created by: <?php echo $user_name; ?></p>
                        <?php if (!empty($the_content)): ?>
                        <p class="description"><?php echo trim(trim($the_content), "</p>"); ?></p>
                        <?php endif; ?>
                    </div>
                </header>

                <div class="container-custom">
                    <div class="row">
                        <div class="col-md-12 data-col">
                            <h2 class="Cityprosperity-head">City prosperity</h2>
                            <ul class="box-list large Cityprosperity-list">
                            </ul>

                            <h2 class="bordered Slumdwellers-head">Slum dwellers</h2>
                            <ul class="box-list large Slumdwellers-list">
                            </ul>

                            <h2 class="Population-head bordered">Population</h2>
                            <ul class="Population-list box-list large">
                            </ul>

                            <h2 class="Streets-head bordered">Streets</h2>
                            <ul class="Streets-list box-list large">
                            </ul>

                            <h2 class="Transport-head bordered">Transport</h2>
                            <ul class="Transport-list box-list large">
                            </ul>

                            <h2 class="Health-head bordered">Health</h2>
                            <ul class="Health-list box-list large">
                            </ul>

                            <h2 class="Resilience-head bordered">Resilience</h2>
                            <ul class="Resilience-list box-list large">
                            </ul>

                            <h2 class="Education-head bordered">Education</h2>
                            <ul class="Education-list box-list large">
                            </ul>

                            <h2 class="Crime-head bordered">Crime</h2>
                            <ul class="Crime-list box-list large">
                            </ul>

                            <h2 class="Landarea-head bordered">Landarea</h2>
                            <ul class="Landarea-list box-list large">
                            </ul>
                        </div>
                        <!--<div class="col-md-4 maps-col">
                            <ul id="visualisation-maps-block-wrapper" class="box-list large">
                            </ul>
                        </div>-->
                    </div>
                </div>
            </section>
            <br />
        </div>
    </div>

<?php get_template_part("footer", "scripts"); ?>
<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/urbannumbers-infographic.css" />
<script src="<?php echo get_template_directory_uri(); ?>/js/urbannumbers-infographic.js" type="text/javascript"></script>

<?php

$region = null;
$country = null;
$city = null;
if (is_array($visualisations)) {
    if (array_key_exists('regions', $visualisations)) {
        $region = $visualisations['regions'][0];
    }
    if (array_key_exists('countries', $visualisations)) {
        $country = $visualisations['countries'][0];
    }
    if (array_key_exists('cities', $visualisations)) {
        $city = $visualisations['cities'][0];
    }
}

?>
<script type="text/javascript">
$(function() {
    Oipa.pageType = "indicators";
    Oipa.mainSelection = new OipaIndicatorSelection(1);

    var filter = new OipaFilters();
    filter.selection = Oipa.mainSelection;
    filter.selection.indicator_options = {
        all_years: true,
        chart_class: InfographicsChart
    }
    //filter.init(1);

    <?php /*if ($region !== null): ?>
    var regionmap = new InfographicOipaMapVis();
        regionmap.name = "South of Sahara";
        regionmap.geotype = "point"; // point / polygon / line
        regionmap.geo_location = "region"; // exact location / city / country / region
        regionmap.indicator = "<?php echo $region; ?>";
        regionmap.id = <?php echo $region; ?>;
        regionmap.map_div = null;
        regionmap.init();
    <?php endif; ?>

    <?php if ($country !== null): ?>
    var countrymap = new InfographicOipaMapVis();
        countrymap.name = "Kenya";
        countrymap.geotype = "point"; // point / polygon / line
        countrymap.geo_location = "country"; // exact location / city / country / region
        countrymap.indicator = "<?php echo $country; ?>";
        countrymap.id = "<?php echo $country; ?>";
        countrymap.map_div = null;
        countrymap.init();
    <?php endif; ?>

    <?php if ($city !== null): ?>
    var citymap = new InfographicOipaMapVis();
        citymap.name = "Nairobi";
        citymap.geotype = "point"; // point / polygon / line
        citymap.geo_location = "city"; // exact location / city / country / region
        citymap.indicator = "<?php echo $city; ?>";
        citymap.id = "<?php echo $city; ?>";
        citymap.map_div = null;
        citymap.init();
        <?php endif; */ ?>

    // Force refresh
    OipaWidgetsBus.use_force_refresh = true;
    
    <?php
    foreach($visualisations as $key => $value) {
        if (!in_array($key, array('regions', 'countries', 'cities'))) {
        ?>
        filter.selection.update_selection("indicators", "<?php echo $key; ?>", "<?php echo $value; ?>", "indicators");
        <?php
        } else {
        ?>
        filter.selection.update_selection("<?php echo $key; ?>", "<?php echo implode($value, ','); ?>", "<?php echo $value[0]; ?>", "<?php echo $key; ?>");
        <?php
        }
    }
    ?>
    filter.init();
    filter.update_selection_after_filter_load(filter.selection);
    Oipa.create_visualisations();

    $.each(Oipa.visualisations, function(key, vis) {
        vis.filter = filter;
        // Force refresh of every visualisation
        vis.refresh(undefined, true);
        })
});
</script>
<?php get_footer(); ?>
<?php
/*
Template Name: Home
*/
get_header(); the_post();


$popups = new Popups();
$popups->init();

?>
<?php
$args = array(
            'post_type' => 'gallery',
            'posts_per_page' => 10,
        );
query_posts($args);
if (have_posts()) : ?>
    <!-- visual -->
    <div class="visual container">
        <div class="slideset row">
            <?php while (have_posts()) : the_post();
            $title = get_field('title');
            $subtitle = get_field('subtitle');
            $start_exploring = get_field('start_exploring');
            $about_city_prosperity = get_field('about_city_prosperity');
            $compare_cities = get_field('compare_cities');
            $image_credits = get_field('image_credits');
            $image = get_field('image');
            ?>
            <div class="slide col-md-12">
                <?php if($title || $subtitle || $start_exploring): ?>
                <div class="container">
                    <div class="text-holder">
                        <?php if($title || $subtitle): ?>
                        <div class="text-frame">
                            <?php if($title): ?><h1><?php echo $title; ?></h1><?php endif; ?>
                            <?php if($subtitle): ?><p><?php echo $subtitle; ?></p><?php endif; ?>
                        </div>
                        <?php endif; ?>
                        <?php if($start_exploring): ?><a href="<?php echo $start_exploring; ?>" class="btn btn-primary">Start exploring</a><?php endif; ?>
                    </div>
                    <article class="box">
                    <?php the_field('info'); ?>
                    <div class="btn-holder">
                    <!--	<?php if($about_city_prosperity): ?><a href="<?php echo $about_city_prosperity; ?>" class="btn btn-blue">About city prosperity</a><?php endif; ?> -->
                        <?php if($compare_cities): ?><a href="<?php echo $compare_cities; ?>" class="btn btn-blue">Compare this city</a><?php endif; ?>
                    </div>
                    <?php if($image_credits): ?>
                    <dl>
                        <dt>IMAGE CREDITS:</dt>
                        <dd><?php echo $image_credits; ?></dd>
                    </dl>
                    <?php endif; ?>
                </article>
                </div>
                <?php endif; ?>

                <?php if($image) echo '<img class="visual-decor" src="'. $image['sizes']['gallery1500x500'] .'" alt="">'; ?>
            </div>
            <?php endwhile; ?>
        </div>
        <div class="pagination"></div>
    </div>
    <?php endif; wp_reset_query(); ?>
    <?php if( have_rows('home_blocks') and 0 ): ?>
    <!-- box-container -->
        <div class="container homepage-top-buttons">
            <div class="row">
                <?php while ( have_rows('home_blocks') ) : the_row();
                $title = get_sub_field('title');
                $image = get_sub_field('image');
                $read_more_url = get_sub_field('read_more_url');
                if($title || $graphic):
                ?>
                    <div class="col-md-3">
                        <a href="<?php echo $read_more_url; ?>" class="box">
                            <div class="holder">
                                <?php if($title): ?>
                                <header class="heading-holder">
                                    <h2><?php echo $title; ?></h2>
                                </header>
                                <?php endif; ?>
                                <?php if($image): ?>
                                <div class="frame">
                                    <img src="<?php echo $image['sizes']['block277']; ?>" alt="">
                                </div>
                                <?php endif; ?>
                            </div>
                        </a>
                    </div>
                <?php endif; endwhile; ?>
            </div>
        </div>

    <?php endif; ?>
    <!-- container-map -->
    <div class="container">
    <section class="container-map">
        <?php
            $map_title = get_field('map_title');
            $map_control = false; //get_field('map_control');
            $map_images = get_field('map_images');
        ?>
        <?php if($map_title): ?>
        <header class="heading-holder">
            <h2><?php echo $map_title; ?></h2>
        </header>
        <?php endif; ?>
        <?php if($map_control): ?>
        <div class="check-row home-info-controls">
            <?php echo $map_control; ?>
        </div>
        <?php endif; ?>
        <?php if( have_rows('map_images') ): ?>
        <div class="box-container infobox-container noshadow">
            <div class="widget row columns-holder" id="chart_cpi" style="display: none;" data-indicator="cpi_6_dimensions"></div>
            <div class="widget row columns-holder" id="chart_slum" style="display: none;" data-indicator="slum_proportion_living_urban"></div>
            <div class="widget row columns-holder" id="chart_pub" style="display: none;" data-indicator="land_allocated_to_street_index_city_core"></div>
        </div>
        <?php endif; ?>


            <div id="map-wrapper" class="map-homepage">
            <?php
            $curmapname = "main";
            include( TEMPLATEPATH .'/map.php' );
            ?>

            </div>

    </section>
</div>
    <!-- area -->
    <section class="area">
        <?php $title = get_field('data_driven_stories_block_title');
        if($title):
        ?>
        <header class="heading-holder">
            <h2><?php echo $title; ?></h2>
        </header>
        <?php endif; ?>
        <?php
        $args = array(
                        'post_type' => 'dds',
                        'posts_per_page' => 4,
                    );
        query_posts($args);
        if (have_posts()) : ?>
        <div class="container">
            <ul class="thumbnails">
                <?php while (have_posts()) : the_post();
                    $image = get_field('image');
                    $description = get_field('description');
                    $name = get_field('name');
                    $country = get_field('country');
                    $city = get_field('city');
                ?>
                <li>
                    <div class="box" itemscope itemtype="http://schema.org/Person">
                        <?php if($image): ?>
                        <div class="img-holder">
                            <a href="<?php the_permalink(); ?>">
                                <!-- picturefill html structure example -->
                                <span data-picture data-alt="image description">
                                    <span data-src="<?php echo $image['sizes']['dds320x200']; ?>" ></span>
                                    <span data-src="<?php echo $image['sizes']['dds640x400']; ?>" data-media="(-webkit-min-device-pixel-ratio:1.5), (min-resolution:144dpi)" ></span>
                                    <!--[if (lt IE 9) & (!IEMobile)]>
                                        <span data-src="<?php echo $image['sizes']['dds320x200']; ?>"></span>
                                    <![endif]-->
                                    <!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
                                    <noscript><img src="<?php echo $image['sizes']['dds320x200']; ?>" alt="image description" ></noscript>
                                </span>
                            </a>
                        </div>
                        <?php endif; ?>
                        <?php if($description): ?>
                        <div class="info-holder" style="min-height: 170px">
                            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                            <p>“<?php echo $description; ?>”</p>
                        </div>
                        <?php endif; ?>
                    </div>
                </li>
                <?php endwhile; ?>
            </ul>
        </div>
        <a href="<?php echo get_post_type_archive_link( 'dds' ); ?>" class="btn btn-primary">More stories</a>
    </section>
    <?php endif; wp_reset_query(); ?>
    <!-- contain main informative part of the site -->
    <?php
    $about_title = get_field('about_title');
    $about_text = get_field('about_text');
    $about_logo = get_field('about_logo');
    $about_logo_link = get_field('about_logo_link');
    ?>
    <section class="main">
        <div class="text-container">
            <?php if($about_title): ?><h2><?php echo $about_title; ?></h2><?php endif; ?>
            <?php echo $about_text; ?>
            <div class="logo-holder">
                <strong class="logo"<?php if($about_logo) echo ' style="background-image: url(\''. $about_logo .'\')"'; ?>><a href="<?php echo $about_logo_link; ?>">Urban Numbers Mapping City Data</a></strong>
            </div>
        </div>
    </section>

    <?php get_template_part("footer", "scripts"); ?>

    <style>
    .container-map {
        box-shadow: 0px 0px 0px;
        -webkit-box-shadow: 0px 0px 0px;
    }
    </style>
<script type="text/javascript">

    var _filters = {
        cpi: 'cpi_6_dimensions',
        slum: 'slum_proportion_living_urban',
        pub: 'land_allocated_to_street_index_city_core'
    };
    var _selected_filter = null;
    $.each(_filters, function(id, filter_id) {
        $('#filter_' + id).change(function(e) {
            if ($(this).prop('checked')) {
                // Deselect others and hide charts
                $.each(_filters, function(_id, _) {
                    if (_id !== id) {
                        $('#chart_' + _id).hide();
                        if ($('#filter_' + _id).prop('checked')) {
                            $('#filter_' + _id).click();
                        }
                    }
                });

                // Select new
                Oipa.mainSelection.indicators = [];
                Oipa.mainSelection.indicators.push({
                    id: filter_id,
                    name: "Urban population – Countries",
                    type: "Slum dwellers"
                });
                $('#chart_' + id).show();
                map.refresh();
            }
        });
    });

    Oipa.pageType = "indicators";
    Oipa.mainSelection = new OipaIndicatorSelection(1);
    Oipa.mainSelection.url.get_selection_from_url();

    var map = new OipaIndicatorMap();
    map.set_map("main-map", null, 3, 3);
    map.init();

    map.selection = Oipa.mainSelection;

    // Create inforaphics
    var _regions = [89, 789, 589, 389, 189, 889, 489, 689, 289];
    var first = new OipaRegionPieInfographicsVis('cpi_6_dimensions',
        _regions,
        {
            color: "#FFBF00",
        });
    var second = new OipaRegionPieInfographicsVis('slum_proportion_living_urban',
        _regions,
        {
            divide_by: 100,
            color: "#A3D900",
            overlay_transform: function(chart_id_data) {
                return chart_id_data.value.toFixed(1) + "%";
            }
        }
    );
    var third = new OipaRegionPieInfographicsVis('land_allocated_to_street_index_city_core',
        _regions,
        {
            color: "#0074EC",
            overlay_transform: function(chart_id_data) {
                return parseFloat(chart_id_data.value) * 1000;
            }
        }
    );

    first.selection = Oipa.mainSelection;
    second.selection = Oipa.mainSelection;
    third.selection = Oipa.mainSelection;
    first.init();
    second.init();
    third.init();

    Oipa.maps.push(map);
    OipaWidgetsBus.patch_map(map);
    if (Oipa.mainSelection.indicators.length == 0) {

        Oipa.mainSelection.indicators = [];
        Oipa.mainSelection.indicators.push({
            id: 'cpi_6_dimensions',
            name: "Urban population – Countries",
            type: "Slum dwellers"
        });
        $('#chart_cpi').show();
        map.refresh();

    } else {
        map.refresh();
    }

</script>

<?php get_footer(); ?>

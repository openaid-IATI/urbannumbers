<?php get_header(); ?>

<div id="main">
    <!-- main-container -->
    <div class="main-container">
        <div class="heading-container">
            <div class="container-custom">
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <h1>Infographics</h1>
                    <p>View infographics by others</p>
                    </div>
                </div>
            </div>
        </div>


        <div class="main">
            <div class="container-custom">
                <ul class="box-list large">

                    <?php
                    $args = array(
                        'post_type' => 'infographic',
                        'posts_per_page' => 12,
                        'author__in' => array(''),
                        'orderby' => 'author', 'order' => 'DESC'
                    );
                    $current_user = wp_get_current_user();
                    if ($current_user->ID > 0) {
                        $args['author__in'][] = $current_user->ID;
                    }

                    $loop = new WP_Query($args);
                    while ($loop->have_posts()):
                        $loop->the_post();
                    ?>
                    <li>
                        <section class="container-box" data-indicator="'+this.indicator+'">
                            <header class="heading-holder">
                                <a href="<?php echo get_permalink(); ?>"><h3><?php the_title(); ?></h3></a>
                            </header>
                            <div class="box-content">
                                <div class="widget">
                                    <?php the_excerpt(); ?>
                                </div>
                            </div>
                        </section>
                    </li>
                        
                    <?php 
                    endwhile; 
                    wp_reset_postdata();
                    ?>

                </ul>
                    
            </div>
        </div>
    </div>
</div>
        
<?php get_footer(); ?>
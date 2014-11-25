<?php get_header(); ?>
	<div id="main">
		<?php if (have_posts()) : ?>
		<!-- area -->
		<section class="area">
			<header class="heading-holder">
				<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
				<?php /* If this is a category archive */ if (is_category()) { ?>
				<h2><?php printf(__( 'Archive for the &#8216;%s&#8217; Category', 'base' ), single_cat_title('', false)); ?></h2>
				<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>			
				<h2><?php printf(__( 'Posts Tagged &#8216;%s&#8217;', 'base' ), single_tag_title('', false)); ?></h2>
				<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h2><?php _e('Archive for', 'base'); ?> <?php the_time('F jS, Y'); ?></h2>
				<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h2><?php _e('Archive for', 'base'); ?> <?php the_time('F, Y'); ?></h2>
				<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h2><?php _e('Archive for', 'base'); ?> <?php the_time('Y'); ?></h2>
				<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				<h2><?php _e('Author Archive', 'base'); ?></h2>
				<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h2><?php _e('Blog Archives', 'base'); ?></h2>
				<?php } ?>
			</header>
			<ul class="thumbnails">
                <?php
                $args = array(
                    'post_type' => 'dds',
                    'posts_per_page' => 12,
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
					<?php get_template_part('blocks/content', get_post_type()); ?>
				<?php endwhile; ?>
			</ul>
		</section>
		<?php else : ?>
			<?php get_template_part('blocks/not_found'); ?>
		<?php endif; ?>
	</div>
<?php get_footer(); ?>
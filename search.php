<?php get_header(); ?>
	<div id="main">
		<?php if (have_posts()) : ?>
		<!-- area -->
		<section class="area">
			<header class="heading-holder">
				<h2><?php printf( __( 'Search Results for: %s', 'base' ), '<span>' . get_search_query() . '</span>'); ?></h2>
			</header>
			<ul class="thumbnails">
				<?php while (have_posts()) : the_post(); ?>
					<?php get_template_part('blocks/content', get_post_type()); ?>
				<?php endwhile; ?>
			</ul>
			<?php get_template_part('blocks/pager'); ?>
		</section>
		<?php else : ?>
			<?php get_template_part('blocks/not_found'); ?>
		<?php endif; ?>
	</div>
<?php get_footer(); ?>
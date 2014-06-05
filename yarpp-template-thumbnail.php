<?php
/*
YARPP Template: Thumbnails
Description: Requires a theme which supports post thumbnails
Author: mitcho (Michael Yoshitaka Erlewine)
*/ ?>
<?php if (have_posts()):?>
<div class="side-box">
	<h4>Related post’s</h4>
	<ul class="post-list">
		<?php while (have_posts()) : the_post();
		$image = get_field('image');
		?>
			<li>
				<?php if($image): ?><div class="img-holder"><a href="<?php the_permalink(); ?>"><img src="<?php echo $image['sizes']['post76x76']; ?>" alt=""></a></div><?php endif; ?>
				<div class="text-holder">
					<?php add_filter( 'excerpt_length', 'custom_excerpt_length', 999 ); ?>
					<p><?php echo strip_tags(get_the_excerpt()); ?> <br /><a href="<?php the_permalink(); ?>">Read more ...</a></p>
					<?php remove_filter('excerpt_length', 'custom_excerpt_length'); ?>
				</div>
			</li>
		<?php endwhile; ?>
	</ul>
</div>
<?php endif; ?>
<?php get_header(); the_post();
global $lightbox;
$subtitle = get_field('subtitle');
$single_image = get_field('single_image');
$image_credits = get_field('image_credits');
?>
	<div id="main">
		<!-- twocolumns -->
		<section id="twocolumns">
			<header class="main-heading">
				<h1><?php the_title(); ?></h1>
			</header>
			<div class="twocolumns-frame">
				<!-- content -->
				<div id="content">
					<!-- post -->
					<article class="post" itemscope itemtype="http://schema.org/Person">
						<?php if($subtitle): ?><h3><?php echo $subtitle; ?></h3><?php endif; ?>
						<?php if($single_image): ?>
						<div class="img-holder">
							<!-- picturefill html structure example -->
							<span data-picture data-alt="image description">
								<span data-src="<?php echo $single_image['sizes']['post749x288']; ?>" ></span>
								<span data-src="<?php echo $single_image['sizes']['post1498x576']; ?>" data-media="(-webkit-min-device-pixel-ratio:1.5), (min-resolution:144dpi)" ></span>
								<!--[if (lt IE 9) & (!IEMobile)]>
									<span data-src="<?php echo $single_image['sizes']['post749x288']; ?>"></span>
								<![endif]-->
								<!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
								<noscript><img src="<?php echo $single_image['sizes']['post749x288']; ?>" alt="image description" ></noscript>
							</span>
						</div>
						<?php endif; ?>
						<div class="post-info">
							<div class="row">
								<div class="col-md-6 col-sm-6 col-xs-6">
									<time datetime="<?php the_time('Y-m-d'); ?>"><?php the_time('F j, Y'); ?></time>
									<dl>
										<dt>By:</dt>
										<dd itemprop="knows"><?php the_author_link(); ?></dd>
									</dl>
								</div>
								<?php if($image_credits): ?>
								<div class="col-md-6 col-sm-6 col-xs-6">
									<dl>
										<dt>IMAGE CREDITS:</dt>
										<dd itemprop="homeLocation"><?php echo $image_credits; ?></dd>
									</dl>
								</div>
								<?php endif; ?>
							</div>
							<ul class="social-networks">
								<li itemprop="follows"><a itemprop="url" href="#"><i class="icon-share"></i> SHARE</a></li>
							</ul>
						</div>
						<div class="post-content">
							<?php the_content(); ?>
							<?php edit_post_link( __( 'Edit', 'base' ) ); ?>
						</div>
					</article>
				</div>
				<?php if( have_rows('blocks') ): ?>
				<!-- sidebar -->
				<aside id="sidebar">
					<div class="row">
						<?php $i=1;
						$blocks_count = count(get_field('blocks'));
						while ( have_rows('blocks') ) : the_row();
						$title = get_sub_field('title');
						$graphic = get_sub_field('graphic');
						$popup_graphic = get_sub_field('popup_graphic');
						if($title || $graphic):
							if($popup_graphic){
								$lightbox .= '<div class="modal popup fade" id="myModal'.$i.'" tabindex="-1" role="dialog" aria-hidden="true">
												<div class="modal-dialog">
													<div class="modal-content">'.
														($title ? '<span class="heading">'. $title .'</span>' : '' ) .
														($popup_graphic ? '<div class="widget">'. apply_filters('widget_text', $popup_graphic) .'</div>' : '' )
														.'<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
													</div>
												</div>
											</div>';
							}
						?>
							<div class="col-md-6">
								<!-- container-box -->
								<section class="container-box">
									<?php if($title): ?>
									<header class="heading-holder">
										<h3><?php echo $title; ?></h3>
									</header>
									<?php endif; ?>
									<?php if($graphic): ?>
									<div class="box-content">
										<div class="widget">
											<?php echo apply_filters('widget_text', $graphic); ?>
										</div>
										<a data-toggle="modal" data-target="#myModal<?php echo $i; ?>" href="#" class="btn-zoom">+</a>
									</div>
									<?php endif; ?>
								</section>
							</div>
						<?php if($i%2 == 0 && $i != $blocks_count) echo '</div><div class="row">'; ?>
						<?php $i++; endif; endwhile; ?>
					</div>
				</aside>
				<?php endif; ?>
			</div>
		</section>
		<?php
		wp_reset_query();
		$args = array(
						'post_type' => get_post_type(),
						'posts_per_page' => 12,
						'post__not_in' => array(get_the_ID())
					);
		query_posts($args);
		if (have_posts()) : ?>
		<!-- area -->
		<section class="area">
			<header class="heading-holder">
				<h2>Title</h2>
			</header>
			<ul class="thumbnails">
				<?php while (have_posts()) : the_post(); ?>
					<?php get_template_part('blocks/content', get_post_type()); ?>
				<?php endwhile; ?>
			</ul>
		</section>
		<?php endif; wp_reset_query(); ?>
	</div>
<?php get_footer(); ?>
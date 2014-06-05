<?php
/*
Template Name: About
*/
get_header(); the_post();
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
			<div class="twocolumns-holder">
				<div class="row">
					<div class="col-md-7 col-sm-8">
						<!-- content -->
						<div id="content">
							<!-- post -->
							<article class="post" itemscope itemtype="http://schema.org/Person">
								<?php if($subtitle): ?><h3><?php echo $subtitle; ?></h3><?php endif; ?>
								<?php if($single_image): ?>
								<div class="img-holder"><img src="<?php echo $single_image['sizes']['post748x288']; ?>" alt=""></div>
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
								<div class="post-content small">
									<?php the_content(); ?>
								</div>
							</article>
							<!-- box-widget -->
							<div class="box-widget"><img src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder4.jpg" alt=""></div>
						</div>
					</div>
					<div class="col-md-3 col-sm-4">
						<!-- sidebar -->
						<aside id="sidebar">
							<?php related_entries(array(
									// Pool options: these determine the "pool" of entities which are considered
									'post_type' => array('post', 'page', 'dds'),
									// The threshold which must be met by the "match score"
									'threshold' => 2,
									// Display options:
									'template' => 'yarpp-template-thumbnail.php', // either the name of a file in your active theme or the boolean false to use the builtin template
									'limit' => 4, // maximum number of results
									'order' => 'score DESC'
								)); ?>
							<?php the_tags('<div class="side-box"><h4>Tags</h4><ul class="side-list"><li>', '</li><li>', '</li></ul></div>'); ?>
							<?php if( have_rows('downloads') ): ?>
							<div class="side-box">
								<h4>Downloads</h4>
								<ul class="side-list">
									<?php while ( have_rows('downloads') ) : the_row(); ?>
										<li><a href="<?php the_sub_field('link_url'); ?>"><?php the_sub_field('link_title'); ?></a></li>
									<?php endwhile; ?>
								</ul>
							</div>
							<?php endif; ?>
						</aside>
					</div>
				</div>
			</div>
		</section>
	</div>
<?php get_footer(); ?>
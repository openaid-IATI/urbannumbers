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
		<div class="container">
			<!-- twocolumns -->
			<section id="twocolumns">
				<header class="main-heading">
					<h1><?php the_title(); ?></h1>
				</header>
				<div class="twocolumns-holder">
					<div class="row">
						<div class="col-sm-8">
							<!-- content -->
							<div id="content">
								<!-- post -->
								<article class="post" itemscope itemtype="http://schema.org/Person">
									
									<?php if($single_image): ?>
									<div class="img-holder"><img src="<?php echo $single_image['sizes']['post748x288']; ?>" alt=""></div>
									<?php endif; ?>
									<div class="post-info">
										<div class="row">
							
											<?php if($image_credits): ?>
											<div class="col-md-6 col-sm-6 col-xs-6">
												<dl>
													<dt>IMAGE CREDITS:</dt>
													<dd itemprop="homeLocation"><?php echo $image_credits; ?></dd>
												</dl>
											</div>
											<?php endif; ?>
										</div>
								
									</div>
									<div class="post-content small">
										<?php the_content(); ?>
									</div>
								</article>
							</div>
						</div>
				
						<div class="col-sm-4">
						
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
	</div>
	<?php get_template_part("footer", "scripts"); ?>
<?php get_footer(); ?>
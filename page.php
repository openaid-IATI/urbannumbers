<?php get_header(); the_post(); ?>
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
						<div class="post-content">
							<?php the_content(); ?>
							<?php edit_post_link( __( 'Edit', 'base' ) ); ?>
						</div>
					</article>
				</div>
			</div>
		</section>
	</div>
<?php get_footer(); ?>
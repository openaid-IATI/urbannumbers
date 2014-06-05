<?php
/*
Template Name: Create infographic 2
*/
get_header(); the_post(); ?>
	<div id="main">
		<ul class="social-networks">
			<li><a href="#"><i class="icon-share"></i> SHARE</a></li>
		</ul>
		<!-- main-container -->
		<div class="main-container">
			<section class="main-block">
				<header class="heading-container">
					<div class="container-custom">
						<h1>My first data report!</h1>
						<p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
					</div>
				</header>
				<div class="container-row">
					<div class="holder">
						<div class="container-custom">
							<span class="name">By: Pontus Westerberg</span>
						</div>
					</div>
				</div>
				<div class="container-content">
					<div class="container-custom">
						<div class="row">
							<div class="col-md-8">
								<div class="text-frame">
									<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.</p>
								</div>
								<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
							</div>
						</div>
					</div>
				</div>
				<!-- treecolumns -->
				<div class="treecolumns">
					<div class="container-custom">
						<div class="column">
							<span class="heading">Region</span>
							<ul class="sort-info">
								<li><i class="icon-arrow-right"></i> Africa</li>
								<li><i class="icon-arrow-right"></i> Nairobi</li>
							</ul>
						</div>
						<div class="column">
							<span class="heading">Population Size and Rate of Change</span>
							<div class="widget"><img src="<?php echo get_template_directory_uri(); ?>/images/img36.png" alt=""></div>
						</div>
						<div class="column style01">
							<span class="heading">Proportion of urban population living in slum area</span>
							<div class="widget"><img src="<?php echo get_template_directory_uri(); ?>/images/img37.png" alt=""></div>
						</div>
					</div>
				</div>
				<!-- area -->
				<div class="area-boxes">
					<div class="container-custom">
						<ul class="box-list">
							<li>
								<!-- container-box -->
								<section class="container-box">
									<header class="heading-holder">
										<h3>Africa</h3>
									</header>
									<div class="box-content">
										<div class="map-holder">
											<img src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder-map5.jpg" alt="">
										</div>
									</div>
								</section>
							</li>
							<li>
								<!-- container-box -->
								<section class="container-box">
									<header class="heading-holder">
										<h3>Kenya</h3>
									</header>
									<div class="box-content">
										<div class="map-holder">
											<img src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder-map6.jpg" alt="">
										</div>
									</div>
								</section>
							</li>
							<li>
								<!-- container-box -->
								<section class="container-box">
									<header class="heading-holder">
										<h3>Nairobi</h3>
									</header>
									<div class="box-content">
										<div class="map-holder">
											<img src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder-map7.jpg" alt="">
										</div>
									</div>
								</section>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<?php if( have_rows('blocks') ): ?>
			<!-- area -->
			<div class="area-boxes">
				<div class="row-holder">
					<div class="container-custom">
						<ul class="box-list">
						<?php while ( have_rows('blocks') ) : the_row();
						$read_more_url = get_sub_field('read_more_url');
						$title = get_sub_field('title');
						$graphic = get_sub_field('graphic');
						if($title || $graphic):
						?>
							<li>
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
									</div>
									<?php endif; ?>
								</section>
							</li>
						<?php endif; endwhile; ?>
						</ul>
					</div>
				</div>
			</div>
			<?php endif; ?>
		</div>
	</div>
<?php get_footer(); ?>
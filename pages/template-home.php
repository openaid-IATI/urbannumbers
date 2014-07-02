<?php
/*
Template Name: Home
*/
get_header(); the_post(); ?>
<?php
$args = array(
			'post_type' => 'gallery',
			'posts_per_page' => 10,
		);
query_posts($args);
if (have_posts()) : ?>
	<!-- visual -->
	<div class="visual">
		<div class="slideset">
			<?php while (have_posts()) : the_post();
			$title = get_field('title');
			$subtitle = get_field('subtitle');
			$start_exploring = get_field('start_exploring');
			$about_city_prosperity = get_field('about_city_prosperity');
			$compare_cities = get_field('compare_cities');
			$image_credits = get_field('image_credits');
			$image = get_field('image');
			?>
			<div class="slide">
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
				</div>
				<?php endif; ?>
				<article class="box">
					<?php the_field('info'); ?>
					<div class="btn-holder">
						<?php if($about_city_prosperity): ?><a href="<?php echo $about_city_prosperity; ?>" class="btn btn-blue">About city prosperity</a><?php endif; ?>
						<?php if($compare_cities): ?><a href="<?php echo $compare_cities; ?>" class="btn btn-blue">Compare cities</a><?php endif; ?>
					</div>
					<?php if($image_credits): ?>
					<dl>
						<dt>IMAGE CREDITS:</dt>
						<dd><?php echo $image_credits; ?></dd>
					</dl>
					<?php endif; ?>
				</article>
				<?php if($image) echo '<img class="visual-decor" src="'. $image['sizes']['gallery1500x500'] .'" alt="">'; ?>
			</div>
			<?php endwhile; ?>
		</div>
		<div class="pagination"></div>
	</div>
	<?php endif; wp_reset_query(); ?>
	<?php if( have_rows('home_blocks') ): ?>
	<!-- box-container -->
	<div class="box-container">
		<div class="columns-holder">
			<?php while ( have_rows('home_blocks') ) : the_row();
			$title = get_sub_field('title');
			$image = get_sub_field('image');
			$read_more_url = get_sub_field('read_more_url');
			if($title || $graphic):
			?>
				<div class="column">
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
	<section class="container-map">
		<?php
			$map_title = get_field('map_title');
			$map_control = get_field('map_control');
			$map_images = get_field('map_images');
		?>
		<?php if($map_title): ?>
		<header class="heading-holder">
			<h2><?php echo $map_title; ?></h2>
		</header>
		<?php endif; ?>
		<?php if($map_control): ?>
		<div class="check-row">
			<?php echo $map_control; ?>
		</div>
		<?php endif; ?>
		<?php if( have_rows('map_images') ): ?>
		<div class="info-row">
			<?php $i=0; while ( have_rows('map_images') ) : the_row(); ?>
			<div class="info-box<?php if($i++==1) echo ' center'; ?>"><img src="<?php the_sub_field('image'); ?>" alt=""></div>
			<?php endwhile; ?>
		</div>
		<?php endif; ?>

		<?php 
		$curmapname = "main";
		include( TEMPLATEPATH .'/map.php' ); 
		?>
		
	</section>
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
					<div class="text-holder">
						<p><a href="<?php the_permalink(); ?>">“<?php echo $description; ?>”</a></p>
					</div>
					<?php endif; ?>
					<?php if($name || $country || $city): ?>
					<div class="info-holder">
						<dl>
							<?php if($name): ?>
							<dt>Name:</dt>
							<dd itemprop="name"><?php echo $name; ?></dd>
							<?php endif; ?>
							<?php if($country): ?>
							<dt>Country:</dt>
							<dd itemprop="nationality"><?php echo $country; ?></dd>
							<?php endif; ?>
							<?php if($city): ?>
							<dt>City:</dt>
							<dd itemprop="homeLocation"><?php echo $city; ?></dd>
							<?php endif; ?>
						</dl>
					</div>
					<?php endif; ?>
				</div>
			</li>
			<?php endwhile; ?>
		</ul>
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

<script>
	
	Oipa.pageType = "indicators";
	Oipa.mainSelection = new OipaIndicatorSelection(1);
	Oipa.mainSelection.indicators.push({"id": "cpi_5_dimensions","name": "5 dimensions of City Prosperity"});
	
	var map = new OipaIndicatorMap();
	map.set_map("main-map");
	map.init();
	
	map.selection = Oipa.mainSelection;
	Oipa.maps.push(map);
	
	map.refresh();

</script>



<?php get_footer(); ?>
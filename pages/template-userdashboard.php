<?php
/*
Template Name: User dashboard
*/
get_header(); the_post(); ?>


<div id="main">
	<!-- main-container -->
	<div class="main-container">
		<div class="heading-container">
			<div class="container-custom">
				<div class="row">
					<div class="col-md-8 col-sm-8">
						<h1>My city infographics</h1>
						<p>Manage your creations, modify and share</p>
					</div>
				</div>
			</div>
		</div>


		<div class="main">
			<div class="container-custom">
				<ul class="box-list large">

					<?php 

					$args = array( 'post_type' => 'infographic', 'posts_per_page' => 12, 'author' => get_current_user_id());
					$loop = new WP_Query( $args );

					while ( $loop->have_posts() ) : $loop->the_post();
						
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
		
		
		<div class="heading-container">
			<div class="container-custom">
				<div class="row">
					<div class="col-md-8 col-sm-8">
						<h1>My favourite city data</h1>
						<p>Review and share favourited data</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- container-columns -->
		<div class="main">
			<div class="container-custom">
				<ul id="visualisation-block-wrapper" class="box-list large">
					
					
				</ul>

			</div>
		</div>
	</div>
</div>


<?php get_template_part("footer", "scripts"); ?>

<?php 
// $favorites = get_user_meta(get_current_user_id(),'oipa_visualisation_favorites',true);
// var_dump($favorites); 
?>

<script>
	
	Oipa.pageType = "indicators";
	Oipa.mainSelection = new OipaIndicatorSelection(1);
	var curchart = null;
	<?php 

		// get a user's favorites, set it in a variable, and generate a vis per favorite.
		$favorites = get_user_meta(get_current_user_id(),'oipa_visualisation_favorites',true);
		if ($favorites){
			foreach($favorites as $vis){
				if (!empty($vis)){ 
					$decoded_vis = json_decode($vis);
					echo "curchart = new " . $decoded_vis->type . "();";
					echo "curchart.load_from_string('" . $vis . "');";

				}
			}
		}
	?>

</script>
<?php get_footer(); ?>

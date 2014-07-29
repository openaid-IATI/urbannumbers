<?php
/*
Template Name: City compare
*/
get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map small">
			
			<?php get_template_part("compare", "filters"); ?>

			<div class="container-heading">
				<!-- container-heading -->
				<div class="row">
					<div class="col-md-6 col-sm-6 col-xs-6"><span id="compare-left-title" class="heading"></span></div>
					<div class="col-md-6 col-sm-6 col-xs-6"><span id="compare-right-title" class="heading"></span></div>
				</div>
				<!-- action-list -->
				<ul class="action-list">
					<li><a id="compare-cities-randomize" href="#"><i class="icon-reset"></i>RANDOMIZE</a></li>
				</ul>
			</div>
			<div class="columns-holder">
				<div class="holder">
					<div class="column">
						<?php 
						$curmapname = "left";
						include( TEMPLATEPATH .'/map.php' ); 
						?>
					</div>
					<div class="column">
						<?php 
						$curmapname = "right";
						include( TEMPLATEPATH .'/map.php' ); 
						?>
					</div>
				</div>
			</div>
			<div class="container-text hidden-xs">
				<div class="holder">
					<div class="row">
						<div class="col-md-6 col-sm-6">
							<div class="text-box">
								<div class="text-frame left-city-wikipedia">
									<p>Barcelona is the capital city of the autonomous community of Catalonia in Spain, and the second largest city in the country, with a population of 1,620,943[1] within its administrative limits. The urban area of Barcelona extends beyond the administrative city limits with a population of around 4.5 million,[citation needed] being the sixth-most populous urban area in the European Union after Paris, London, the Ruhr, Madrid and Milan. </p>
								</div>
								
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="text-box">
								<div class="text-frame right-city-wikipedia">
									<p>Jakarta, officially known as the Special Capital Region of Jakarta (Indonesian: Daerah Khusus Ibu Kota Jakarta), is the capital and largest city of Indonesia, and one of the most populous Urban agglomerations in the world.</p>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<?php get_template_part("compare", "visualisations"); ?>

	</div>


	<?php get_template_part("footer", "scripts"); ?>

	<script>

		Oipa.pageType = "compare";
		Oipa.mainSelection = new OipaCompareSelection(1);

		var filter_div = "";

		var leftmap = new OipaMap();
		leftmap.set_map("left-map");
		leftmap.compare_left_right = "left";
		Oipa.maps.push(leftmap);

		var rightmap = new OipaMap();
		rightmap.set_map("right-map");
		rightmap.compare_left_right = "right";
		Oipa.maps.push(rightmap);
		

		var filter = new UnhabitatOipaCompareFilters();
		filter.selection = Oipa.mainSelection;
		filter.init();

	</script>
<?php get_footer(); ?>
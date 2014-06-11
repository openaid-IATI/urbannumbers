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
								<div class="text-frame">
									<p>Barcelona is the capital city of the autonomous community of Catalonia in Spain, and the second largest city in the country, with a population of 1,620,943[1] within its administrative limits. The urban area of Barcelona extends beyond the administrative city limits with a population of around 4.5 million,[citation needed] being the sixth-most populous urban area in the European Union after Paris, London, the Ruhr, Madrid and Milan. </p>
								</div>
								<p>About five million people live in the Barcelona metropolitan area. It is the largest metropolis on the Mediterranean Sea, located on the coast between the mouths of the rivers Llobregat and Besòs, and bounded to the west by the Serra de Collserola mountain range, the tallest peak of which is 512 metres (1,680 ft) high.</p>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="text-box">
								<div class="text-frame">
									<p>Jakarta, officially known as the Special Capital Region of Jakarta (Indonesian: Daerah Khusus Ibu Kota Jakarta), is the capital and largest city of Indonesia, and one of the most populous Urban agglomerations in the world.</p>
								</div>
								<p>Located on the northwest coast of Java, Jakarta is the country’s economic, cultural and political centre, and with a population of 9,761,407 as of December 2012,[4] it is the most populous city in Indonesia and in Southeast Asia. The official metropolitan area, known as Jabodetabek (a name formed by combining the initial syllables of Jakarta, Bogor, Depok, Tangerang and Bekasi), is the second largest in the world, yet the metropolis’s suburbs still continue beyond it. The metropolitan has an area of 4,383.53 square kilometres (1,692.49 sq mi) and population of well over 28 million.[5]</p>
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

		var filter_div = "";

		var leftmap = new OipaMap();
		leftmap.set_map("left-map");
		leftmap.compare_left_right = "left";

		var rightmap = new OipaMap();
		rightmap.set_map("right-map");
		rightmap.compare_left_right = "right";


		Oipa.pageType = "compare";
		Oipa.mainSelection = new OipaCompareSelection(1);
		var filter = new OipaFilters();
		filter.selection = Oipa.mainSelection;
		filter.init();

	</script>
<?php get_footer(); ?>
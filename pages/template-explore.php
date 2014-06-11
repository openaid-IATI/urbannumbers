<?php
/*
Template Name: Explore
*/
get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map">
			<!-- container-sort -->
			<div class="container-sort">
				<div class="sort-holder">
					<ul class="action-list">
						<li><a href="#"><i class="icon-reset"></i>RESET FILTERS</a></li>
						<li>
							<a class="opener" href="#"><i class="icon-export"></i>EXPORT</a>
							<div class="dropdown-box export-drop">
								<span class="heading">Export</span>
								<p>Select your desired download format from the list below.</p>
								<ul class="export-list">
									<li><a href="#"><i class="icon-download"></i>CSV</a></li>
									<li><a href="#"><i class="icon-download"></i>PDF</a></li>
									<li><a href="#"><i class="icon-download"></i>PNG</a></li>
								</ul>
								<div class="btn-holder">
									<button type="submit" class="btn btn-blue btn-close">Cancel</button>
								</div>
							</div>
						</li>
						<li>
							<a class="opener" href="#"><i class="icon-share"></i>SHARE</a>
							<div class="dropdown-box">
								<span class="heading">Share</span>
								<ul class="social-networks">
									<li><a href="#" class="icon-facebook">facebook</a></li>
									<li><a href="#" class="icon-twitter">twitter</a></li>
									<li><a href="#" class="icon-linkedin">linkedin</a></li>
									<li><a href="#" class="icon-google">google</a></li>
									<li><a href="#" class="icon-mail">mail</a></li>
								</ul>
								<form action="#">
									<fieldset>
										<label for="item1">Share link</label>
										<div class="input-wrap"><input id="item1" class="form-control" type="text" placeholder="http://goo.gl/vhjKBq"></div>
										<label for="item2" class="code">Embed code</label>
										<div class="input-wrap"><input id="item2" class="form-control" type="text" placeholder="example embed code"></div>
										<div class="btn-holder">
											<button type="submit" class="btn btn-blue btn-close">Cancel</button>
										</div>
									</fieldset>
								</form>
							</div>
						</li>
					</ul>
					<!-- sort-list -->
					<ul class="sort-list">
						<li>
							<a class="opener" href="#">REGION <span class="caret"></span></a>
							<div class="slide slide-region">
								<div class="heading-holder"><span class="heading">Choose region</span></div>
								<nav id="regions-pagination" class="pagination">
									
								</nav>
								<div class="slide-content">
									<div id="regions-filters" class="holder">
										
									</div>
								</div>
								<div class="btns-holder">
									<div class="holder">
										<ul class="btns-list">
											<li><a href="#" class="btn btn-blue">Save</a></li>
											<li><a href="#" class="btn btn-gray btn-close">Cancel</a></li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<li>
							<a class="opener" href="#">COUNTRY <span class="caret"></span></a>
							<div class="slide">
								<div class="heading-holder"><span class="heading">Choose country</span></div>
								<nav id="countries-pagination" class="pagination">
									
								</nav>
								<div class="slide-content">
									<div id="countries-filters" class="holder">
										
									</div>
								</div>
								<div class="btns-holder">
									<div class="holder">
										<ul class="btns-list">
											<li><a href="#" class="btn btn-blue">Save</a></li>
											<li><a href="#" class="btn btn-gray btn-close">Cancel</a></li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<li>
							<a class="opener" href="#">CITY <span class="caret"></span></a>
							<div class="slide">
								<div class="heading-holder"><span class="heading">Choose city</span></div>
								<nav id="cities-pagination" class="pagination">
									
								</nav>
								<div class="slide-content">
									<div id="cities-filters" class="holder">
										
									</div>
								</div>
								<div class="btns-holder">
									<div class="holder">
										<ul class="btns-list">
											<li><a href="#" class="btn btn-blue">Save</a></li>
											<li><a href="#" class="btn btn-gray btn-close">Cancel</a></li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<li>
							<a class="opener" href="#">ADD INDICATORS <span class="caret"></span></a>
							<div class="slide">
								<div class="heading-holder"><span class="heading">Add indicators</span></div>
								<nav id="indicators-pagination" class="pagination">
									
								</nav>
								<div class="slide-content">
									<div id="indicators-filters" class="holder">

									</div>
								</div>
								<div class="btns-holder">
									<div class="holder">
										<ul class="btns-list">
											<li><a href="#" class="btn btn-blue">Save</a></li>
											<li><a href="#" class="btn btn-gray btn-close">Cancel</a></li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<li>
							<a class="opener" href="#">TIMELINE <span class="caret"></span></a>
							<div class="slide">
								<div class="heading-holder"><span class="heading">Choose year</span></div>
								<nav id="year-pagination" class="pagination">
									
								</nav>
								<div class="slide-content">
									<div id="years-filters" class="holder">
										
									</div>
								</div>
								<div class="btns-holder">
									<div class="holder">
										<ul class="btns-list">
											<li><a href="#" class="btn btn-blue">Save</a></li>
											<li><a href="#" class="btn btn-gray btn-close">Cancel</a></li>
										</ul>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<?php 
			$curmapname = "main";
			include( TEMPLATEPATH .'/map.php' ); 
			?>
		</div>

		<?php if( have_rows('blocks') ): ?>
		<div class="main">
			<div class="container-custom">
				<ul class="box-list large">
				<?php while ( have_rows('blocks') ) : the_row();
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
								<a href="#" class="btn-close"><i class="glyphicon glyphicon-remove"></i></a>
							</div>
							<?php endif; ?>
						</section>
					</li>
				<?php endif; endwhile; ?>
				</ul>
			</div>
		</div>
		<?php endif; ?>
	</div>



<?php get_template_part("footer", "scripts"); ?>

<script>
	
	var map = new OipaMap();
	map.set_map("main-map");

	Oipa.pageType = "indicators";
	Oipa.mainSelection = new OipaIndicatorSelection(1);
	var filter = new OipaFilters();
	filter.selection = Oipa.mainSelection;
	filter.init();

</script>

<?php get_footer(); ?>
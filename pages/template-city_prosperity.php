<?php
/*
Template Name: City Prosperity
*/
get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map">
			<!-- container-sort -->
			<div class="container-sort">
				<div class="sort-holder">
					<ul class="action-list">
						<li>
							<a href="#"><i class="icon-share"></i>SHARE</a>
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
				</div>
			</div>
			<?php if( have_rows('page_blocks') ): ?>
				<?php while ( have_rows('page_blocks') ) : the_row();
				$title = get_sub_field('title');
				$text = get_sub_field('text');
				$image = get_sub_field('image');
				?>
					<?php if($title): ?>
					<div class="main-heading">
						<h1><?php echo $title; ?></h1>
					</div>
					<?php endif; ?>
					<!-- container-area -->
					<section class="container-area">
						<div class="description-box">
							<?php if($image): ?>
								<div class="img-holder"><img src="<?php echo $image['sizes']['page_blocks500x380']; ?>" alt=""></div>
							<?php endif; ?>
							<?php if($text): ?>
							<div class="text-holder">
								<?php echo $text; ?>
							</div>
							<?php endif; ?>
						</div>
					</section>
				<?php break; endwhile; ?>
			<?php endif; ?>
			<div class="info-row mark">
				<div class="info-box"><img alt="" src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder6.png"></div>
				<div class="info-box"><img alt="" src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder7.png"></div>
				<div class="info-box"><img alt="" src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder8.png"></div>
			</div>
			<?php 
			$curmapname = "main";
			include( TEMPLATEPATH .'/map.php' ); 
			?>
			<!-- visual-row -->
			<div class="visual-row">
				<div class="holder">
					<span class="circle"></span>
					<span class="circle"></span>
					<span class="circle"></span>
					<span class="circle"></span>
					<span class="circle"></span>
					<span class="circle style04"></span>
					<span class="circle style04"></span>
					<span class="circle style03"></span>
					<span class="circle style03"></span>
					<span class="circle style03"></span>
					<span class="circle style03"></span>
					<span class="circle style02"></span>
					<span class="circle style02"></span>
					<span class="circle style02"></span>
					<span class="circle style02"></span>
					<span class="circle style01"></span>
					<span class="circle style01"></span>
					<span class="circle style01"></span>
					<span class="circle style01"></span>
					<span class="text-begin">1950</span>
					<span class="text-end">2050</span>
				</div>
			</div>
			<?php if( have_rows('page_blocks') ): ?>
				<div class="container-holder">
					<?php $i=0;
					while ( have_rows('page_blocks') ) : the_row();
					//if($i == 0){ $i++; continue; }
					$title = get_sub_field('title');
					$text = get_sub_field('text');
					$image = get_sub_field('image');
					?>
						<section class="container-area">
							<?php if($title): ?>
								<h1><?php echo $title; ?></h1>
							<?php endif; ?>
							<div class="description-box">
								<?php if($image): ?>
									<div class="img-holder"><img src="<?php echo $image['sizes']['page_blocks500x380']; ?>" alt=""></div>
								<?php endif; ?>
								<?php if($text): ?>
								<div class="text-holder">
									<?php echo $text; ?>
								</div>
								<?php endif; ?>
							</div>
						</section>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>


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
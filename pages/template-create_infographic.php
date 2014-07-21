<?php
/*
Template Name: Create infographic
*/

ob_start(); // ensures anything dumped out will be caught

get_header(); the_post(); ?>

<?php 

if (!empty($_POST)){

	// get infographic data
	$title = "";
	$subtitle = "";
	$user_name = "";
	$infographic_content = "";
	$visualisations = "";

	if (isset($_POST["title"])){ $title = $_POST["title"]; }
	if (isset($_POST["subtitle"])){ $subtitle = $_POST["subtitle"]; }
	if (isset($_POST["user-name"])){ $user_name = $_POST["user-name"]; }
	if (isset($_POST["infographic-content"])){ $infographic_content = $_POST["infographic-content"]; }
	if (isset($_POST["visualisations"])){ $visualisations = $_POST["visualisations"]; }

	// TO DO: save data in django



	// TEMP: save in wordpress
	$my_infographic = array(
	  'post_title'    => $title,
	  'post_content'  => $infographic_content,
	  'post_status'   => 'publish',
	  'post_type'	  => 'infographic'
	);

	$infographic_id = wp_insert_post( $my_infographic );

	add_post_meta($infographic_id, "subtitle", $subtitle);
	add_post_meta($infographic_id, "user-name", $user_name);
	add_post_meta($infographic_id, "visualisations", $visualisations);
	$url = get_permalink( $infographic_id );

	while (ob_get_status()) {
	    ob_end_clean();
	}
	header( "Location: $url" );
}

?>



<form id="infographic-form" role="form" action="" method="post" enctype="multipart/form-data">

	<div id="main">
		<!-- main-container -->
		<div class="main-container">
			<div class="heading-container">
				<div class="container-custom">
					<div class="row">
						<div class="col-md-8 col-sm-8">
							<div class="input-wrap input-title"><input value="<?php if (isset($_POST["title"])){ echo $_POST["title"]; } ?>" name="title" type="text" class="form-control double-click" placeholder="Double-click to add title"></div>
							<div class="input-wrap input-sub-title"><input value="<?php if (isset($_POST["subtitle"])){ echo $_POST["subtitle"]; } ?>" name="subtitle" type="text" class="form-control double-click" placeholder="Double-click to add sub-title"></div>
						</div>
						<div class="col-md-4 col-sm-4">
							<ul class="action-list">
								
								
								<li><button type="submit" class="btn btn-blue">Send</button></li>
								<li><button type="submit" class="btn btn-gray">Cancel</button></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="container-row">
				<div class="holder">
					<div class="container-custom">
						<div class="input-wrap input-name"><input value="<?php if (isset($_POST["user-name"])){ echo $_POST["user-name"]; } else { if(is_user_logged_in()){ get_currentuserinfo(); echo $current_user->data->display_name; } } ?>" name="user-name" type="text" class="form-control double-click" placeholder="Double-click to add you name"></div>

					</div>
				</div>
			</div>
			<div class="container-content">
				<div class="container-custom">
					<div class="row">
						<div class="col-md-8">
							<span class="heading">Content</span>
							<div class="form-group">
								<div id="contribute-editor-wrapper">
									<?php

									$editor_id = "infographic-content";
									$editor_value =  "";
									if (isset($_POST["infographic-content"])){ 
										$editor_value =  $_POST["infographic-content"];
									}
									$editor_settings = array(
										"media_buttons" => false,
									    'textarea_rows' => 16,
									    'tabindex' => 4,
									    'tinymce' => array(
									      'theme_advanced_buttons1' => 'bold, italic, underline, outdent, indent, justifyleft, justifycenter, justifyright, fullscreen',
									      'theme_advanced_buttons2' => 'fontsizeselect, formatselect, pastetext, pasteword, removeformat, blockquote',
									    ),
									);

									wp_editor($editor_value, $editor_id, $editor_settings);
									?>

									<style>
										.wp-editor-tabs{
											display: none;
										}
									</style>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- container-sort -->
			<?php get_template_part("indicator", "filters"); ?>
			<div class="heading-row"><span class="heading">SELECTION: <a href="#">XXXXXXXX</a></span></div>



			<!-- area -->
			<div class="area-boxes mark">
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
			<?php include( TEMPLATEPATH .'/infographic-visualisations.php' ); ?>

			
			<div class="container-btns">
				<div class="container-custom">
					<ul class="action-list">
						<li><a href="#" class="btn btn-blue">Save</a></li>
						<li><a href="#" class="btn btn-gray">Cancel</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>



	<input type="hidden" name="visualisations" value="<?php if (isset($_POST["visualisations"])){ echo $_POST["visualisations"]; } ?>">
</form>




<?php get_template_part("footer", "scripts"); ?>

<script>
Oipa.pageType = "indicators";
Oipa.mainSelection = new OipaIndicatorSelection(1);

// var map = new OipaIndicatorMap();
// map.set_map("main-map");
// map.init();

// map.selection = Oipa.mainSelection;
// Oipa.maps.push(map);

var filter = new UnhabitatOipaIndicatorFilters();
filter.selection = Oipa.mainSelection;
filter.init();
</script>

<?php get_footer(); ?>
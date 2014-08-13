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
			<?php /* <div class="heading-row"><span class="heading">SELECTION: <a href="#">XXXXXXXX</a></span></div> */ ?>



			<!-- area -->
			<div class="area-boxes mark">
				<div class="container-custom">
					<ul id="visualisation-maps-block-wrapper" class="box-list large">
						
			
					</ul>
				</div>
			</div>
			<?php include( TEMPLATEPATH .'/infographic-visualisations.php' ); ?>

			
			<div class="container-btns">
				<div class="container-custom">
					<ul class="action-list">
						<li><button type="submit" class="btn btn-blue">Send</button></li>
						<li><button type="submit" class="btn btn-gray">Cancel</button></li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<input type="hidden" name="visualisations" value="<?php if (isset($_POST["visualisations"])){ echo $_POST["visualisations"]; } ?>">
</form>




<?php get_template_part("footer", "scripts"); ?>

<script>


function UnhabitatOipaInfographicFilters(){

	this.save = function(dont_update_selection){
		
		if(!dont_update_selection){
			// update OipaSelection object
			this.update_selection_object();
			var validated = this.validate_selection();
			if (!validated){
				return false;
			}
		}
		
		// reload maps
		if (Oipa.mainSelection.regions.length > 0){
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='region']").data("indicator", Oipa.mainSelection.regions[0].id).removeClass("grayed-and-inactive");
			regionmap.name = Oipa.mainSelection.regions[0].name;
			regionmap.indicator = Oipa.mainSelection.regions[0].id;
			regionmap.id = Oipa.mainSelection.regions[0].id;
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='region'] .heading-holder h3").html(regionmap.name);
			regionmap.refresh();
		} else {
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='region']").addClass("grayed-and-inactive");
		}
		

		if (Oipa.mainSelection.countries.length > 0){
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='country']").data("indicator", Oipa.mainSelection.countries[0].id).removeClass("grayed-and-inactive");
			countrymap.name = Oipa.mainSelection.countries[0].name;
			countrymap.indicator = Oipa.mainSelection.countries[0].id;
			countrymap.id = Oipa.mainSelection.countries[0].id;
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='country'] .heading-holder h3").html(countrymap.name);
			countrymap.refresh();
		} else {
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='country']").addClass("grayed-and-inactive");
		}

		if (Oipa.mainSelection.cities.length > 0){
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='city']").data("indicator", Oipa.mainSelection.cities[0].id).removeClass("grayed-and-inactive");
			citymap.name = Oipa.mainSelection.cities[0].name;
			citymap.indicator = Oipa.mainSelection.cities[0].id;
			citymap.id = Oipa.mainSelection.cities[0].id;
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='city'] .heading-holder h3").html(citymap.name);
			citymap.refresh();
		} else {
			jQuery("section[data-vis-type='OipaSimpleMapVis'][data-geo-location='city']").addClass("grayed-and-inactive");
		}

		// reload visualisations
		Oipa.refresh_visualisations();

		Oipa.mainSelection.url.set_current_url();
		return true;
	};

	this.load_paginate_listeners = function(attribute_type, total_pages){

		// load pagination filters
		jQuery("#"+attribute_type+"-pagination ul a").click(function(e){
			e.preventDefault();
			var page_number = jQuery(this).text();
			jQuery("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
			filter.load_paginate_page(attribute_type, page_number);
			filter.load_paginate_listeners(attribute_type, total_pages);
		});

		jQuery("#"+attribute_type+"-pagination .pagination-btn-next").click(function(e){
			e.preventDefault();
			var page_number = jQuery("#"+attribute_type+"-pagination .active a").text();
			page_number = parseInt(page_number) + 1;
			jQuery("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
			filter.load_paginate_page(attribute_type, page_number);
			filter.load_paginate_listeners(attribute_type, total_pages);
		});

		jQuery("#"+attribute_type+"-pagination .pagination-btn-previous").click(function(e){
			e.preventDefault();
			var page_number = jQuery("#"+attribute_type+"-pagination .active a").text();
			page_number = parseInt(page_number) - 1;
			jQuery("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
			filter.load_paginate_page(attribute_type, page_number);
			filter.load_paginate_listeners(attribute_type, total_pages);
		});


		jQuery("#indicator-filter-wrapper #"+attribute_type+"-filters input:checkbox").change(function(e){

			if(this.checked) {
				jQuery('#'+attribute_type+'-filters input:checkbox').prop('checked', false);

				jQuery(this).prop('checked', true);
			}
		});
		
	};

}
UnhabitatOipaInfographicFilters.prototype = new UnhabitatOipaIndicatorFilters();






Oipa.pageType = "indicators";
Oipa.mainSelection = new OipaIndicatorSelection(1);

var filter = new UnhabitatOipaInfographicFilters();
filter.selection = Oipa.mainSelection;
filter.init();


// create radar chart from cpi data
var regionmap = new OipaSimpleMapVis();
	regionmap.name = "South of Sahara";
	regionmap.geotype = "point"; // point / polygon / line
	regionmap.geo_location = "region"; // exact location / city / country / region
	regionmap.indicator = "289";
	regionmap.id = 289;
	regionmap.map_div = null;
	regionmap.init();

var countrymap = new OipaSimpleMapVis();
	countrymap.name = "Kenya";
	countrymap.geotype = "point"; // point / polygon / line
	countrymap.geo_location = "country"; // exact location / city / country / region
	countrymap.indicator = "ke";
	countrymap.id = "ke";
	countrymap.map_div = null;
	countrymap.init();

var citymap = new OipaSimpleMapVis();
	citymap.name = "Nairobi";
	citymap.geotype = "point"; // point / polygon / line
	citymap.geo_location = "city"; // exact location / city / country / region
	citymap.indicator = "6139";
	citymap.id = "6139";
	citymap.map_div = null;
	citymap.init();


</script>

<?php get_footer(); ?>
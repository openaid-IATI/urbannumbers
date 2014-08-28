<?php
/*
Template Name: Country pages
*/
get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map no-shadow">
			<!-- container-sort -->
			<?php get_template_part("indicator", "filters"); ?>


			<div class="heading-row"><span class="heading">SELECTION: <a href="#">XXXX</a></span></div>
			<!-- sort-columns -->
			<div class="sort-columns">
				<div class="column">
					<span class="heading">COUNTRY</span>
					<ul class="sort-info">
						<li><i class="icon-arrow-right"></i> Malawi</li>
					</ul>
				</div>
				<div class="column style00" id="year_widget">
					<span class="heading">YEAR</span>
					<ul class="sort-info">
						<li class="value"><i class="icon-arrow-right"></i> 2000</li>
					</ul>
				</div>
				<div class="column style01">
					<span class="heading">INDICATOR NAME</span>
					<div class="widget"><img src="<?php echo get_template_directory_uri(); ?>/images/img36.png" alt=""></div>
				</div>
				<div class="column style02">
					<span class="heading">INDICATOR NAME</span>
					<div class="widget"><img src="<?php echo get_template_directory_uri(); ?>/images/img37.png" alt=""></div>
				</div>
				<div class="column style03">
					<span class="heading">TEXT</span>
					<ul class="sort-info">
						<li><i class="icon-arrow-right"></i> Municipality<br />101.9 km2 </li>
					</ul>
				</div>
			</div>
			
			<div id="map-wrapper">
			<?php 
			$curmapname = "main";
			include( TEMPLATEPATH .'/map.php' ); 
			?>
				<?php if(!is_page("city-prosperity")){ ?>
			    <div id="map-timeline-wrapper">
			        <div id="timeline-left"></div>
			        <div id="map-timeline">
			            <div id="map-slider-tooltip">
			            </div>

			            <?php for ($i = 1950; $i < 2051;$i++){   
			            echo '<div class="slider-year';
			            echo '" id="year-' . $i . '">';
			            if ($i == 1950) { echo '<div class="slider-year-inner-left"></div>';}
			            echo '<div class="slider-year-inner-white"></div></div>'; 
			            } ?>
			        </div>
			        <div id="timeline-right"></div>
			    </div>
			    <?php } ?>
			</div>

		</div>
        

		<div class="main">
			<div class="container-custom">
				<ul class="box-list large">
					<li>
						<!-- container-box -->
						<section class="container-box" id="widget_avg_annual_rate_change_percentage_urban">
							<header class="heading-holder">
								<h3>Title</h3>
							</header>
							<div class="box-content">
                                <canvas id="widget_avg_annual_rate_change_percentage_urban_chart" width="360" height="400"></canvas>
								<div class="widget">
								</div>
							</div>
						</section>
					</li>
				</ul>
			</div>
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
	
	Oipa.pageType = "indicators";
	Oipa.mainSelection = new OipaIndicatorSelection(1);
	
	var map = new OipaIndicatorMap();

    var Bus = new WidgetsBus(map);

    <?php
    $indicators = array();
    if (isset($_GET['indicators'])) {
        $indicators = explode(',', $_GET['indicators']);
    }
    ?>

    // Register widgets
    Bus.add_listener(new function (){
        this.year_changed = function(year) {
            $('#year_widget > ul > li.value').html('<i class="icon-arrow-right"></i> ' + year);
        }
    });

    <?php
    if (in_array('avg_annual_rate_change_percentage_urban', $indicators)) { ?>
    Bus.add_listener(
        new OipaTopIndicatorWidget(
            '#widget_avg_annual_rate_change_percentage_urban',
            'avg_annual_rate_change_percentage_urban',
            10));
    <?php } ?>

	map.set_map("main-map");
	map.init();
	
	map.selection = Oipa.mainSelection;
	Oipa.maps.push(map);
	
	var filter = new UnhabitatOipaIndicatorFilters();
	filter.filter_wrapper_div = "indicator-filter-wrapper";
	filter.selection = Oipa.mainSelection;
	filter.init();
    <?php
    if (count($indicators)) {
        foreach ($indicators as $indicator) { ?>
            filter.selection.indicators.push({"id": "<?=$indicator?>", "name": "Urban population – Countries", "type": "Slum dwellers"});
        <?php
        }
    } else { ?>
        filter.selection.indicators.push({"id": "urban_population_countries", "name": "Urban population – Countries", "type": "Slum dwellers"});
    <?php } ?>
	filter.save(true);


</script>

<?php get_footer(); ?>
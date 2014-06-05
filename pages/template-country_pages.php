<?php
/*
Template Name: Country pages
*/
get_header(); the_post(); ?>
	<div id="main">
		<!-- container-map -->
		<div class="container-map no-shadow">
			<!-- container-sort -->
			<div class="container-sort">
				<div class="sort-holder">
					<ul class="action-list">
						<li><a href="#"><i class="icon-reset"></i>RESET FILTERS</a></li>
						<li>
							<a class="opener" href="#"><i class="icon-export"></i>EXPORT</a>
							<div class="dropdown-box">
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
								<div class="slide-content">
									<div class="holder">
										<div class="row">
											<div class="col-md-12">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Northern America
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Latin America
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Europe
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Africa
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Asia
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Oceania
													</label>
												</div>
											</div>
										</div>
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
								<nav class="pagination">
									<a href="#" class="btn-prev">&lt; previous</a>
									<ul>
										<li class="active"><a href="#">a</a></li>
										<li><a href="#">b</a></li>
										<li><a href="#">c</a></li>
										<li><a href="#">d</a></li>
										<li><a href="#">e</a></li>
										<li><a href="#">f</a></li>
										<li><a href="#">g</a></li>
										<li><a href="#">h</a></li>
										<li><a href="#">i</a></li>
										<li><a href="#">j</a></li>
										<li><a href="#">k</a></li>
										<li><a href="#">l</a></li>
										<li><a href="#">m</a></li>
										<li><a href="#">n</a></li>
										<li><a href="#">o</a></li>
										<li><a href="#">p</a></li>
										<li><a href="#">q</a></li>
										<li><a href="#">r</a></li>
										<li><a href="#">s</a></li>
										<li><a href="#">t</a></li>
										<li><a href="#">u</a></li>
										<li><a href="#">v</a></li>
										<li><a href="#">w</a></li>
										<li><a href="#">x</a></li>
										<li><a href="#">y</a></li>
										<li><a href="#">z</a></li>
									</ul>
									<a href="#" class="btn-next">next &gt;</a>
								</nav>
								<div class="slide-content">
									<div class="holder">
										<div class="row">
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Country name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Country name
													</label>
												</div>
											</div>
										</div>
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
								<nav class="pagination">
									<a href="#" class="btn-prev">&lt; previous</a>
									<ul>
										<li class="active"><a href="#">a</a></li>
										<li><a href="#">b</a></li>
										<li><a href="#">c</a></li>
										<li><a href="#">d</a></li>
										<li><a href="#">e</a></li>
										<li><a href="#">f</a></li>
										<li><a href="#">g</a></li>
										<li><a href="#">h</a></li>
										<li><a href="#">i</a></li>
										<li><a href="#">j</a></li>
										<li><a href="#">k</a></li>
										<li><a href="#">l</a></li>
										<li><a href="#">m</a></li>
										<li><a href="#">n</a></li>
										<li><a href="#">o</a></li>
										<li><a href="#">p</a></li>
										<li><a href="#">q</a></li>
										<li><a href="#">r</a></li>
										<li><a href="#">s</a></li>
										<li><a href="#">t</a></li>
										<li><a href="#">u</a></li>
										<li><a href="#">v</a></li>
										<li><a href="#">w</a></li>
										<li><a href="#">x</a></li>
										<li><a href="#">y</a></li>
										<li><a href="#">z</a></li>
									</ul>
									<a href="#" class="btn-next">next &gt;</a>
								</nav>
								<div class="slide-content">
									<div class="holder">
										<div class="row">
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> City name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> City name
													</label>
												</div>
											</div>
										</div>
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
								<nav class="pagination">
									<a href="#" class="btn-prev">&lt; previous</a>
									<ul>
										<li class="active"><a href="#">1</a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
										<li><a href="#">4</a></li>
										<li><a href="#">5</a></li>
										<li class="style01"><a href="#">...</a></li>
									</ul>
									<a href="#" class="btn-next">next &gt;</a>
								</nav>
								<div class="slide-content">
									<div class="holder">
										<div class="row">
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" checked> Indicator name
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox"> Indicator name
													</label>
												</div>
											</div>
										</div>
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
								<nav class="pagination">
									<a href="#" class="btn-prev">&lt; previous</a>
									<ul>
										<li class="active"><a href="#">1950</a></li>
										<li><a href="#">1960</a></li>
										<li><a href="#">1970</a></li>
										<li><a href="#">1980</a></li>
										<li><a href="#">1990</a></li>
										<li><a href="#">2000</a></li>
										<li><a href="#">2010</a></li>
									</ul>
									<a href="#" class="btn-next">next &gt;</a>
								</nav>
								<div class="slide-content">
									<div class="holder">
										<div class="row">
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1950
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio" checked="checked"> 1951
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1952
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1953
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1954
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1955
													</label>
												</div>
											</div>
											<div class="col-md-3 col-sm-3 col-xs-6">
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1956
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1957
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1958
													</label>
												</div>
												<div class="radio">
													<label>
														<input name="radio1" type="radio"> 1959
													</label>
												</div>
											</div>
										</div>
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
			<div class="heading-row"><span class="heading">SELECTION: <a href="#">XXXX</a></span></div>
			<!-- sort-columns -->
			<div class="sort-columns">
				<div class="column">
					<span class="heading">COUNTRY</span>
					<ul class="sort-info">
						<li><i class="icon-arrow-right"></i> Malawi</li>
					</ul>
				</div>
				<div class="column style00">
					<span class="heading">YEAR</span>
					<ul class="sort-info">
						<li><i class="icon-arrow-right"></i> 2000</li>
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
			<div class="map-holder no-shadow">
				<img src="<?php echo get_template_directory_uri(); ?>/images/img-placeholder-map4.jpg" alt="">
				<div class="dropdown">
					<a class="btn btn-sm btn-blue" data-toggle="dropdown" href="#">Basemaps</a>
					<div class="dropdown-menu dropdown-box" role="menu">
						<ul class="visual-list">
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img19.jpg" alt="">
									<div class="text-holder">
										<p>Satellietbeelden</p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img20.jpg" alt="">
									<div class="text-holder">
										<p>Satellietbeelden met labels </p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img21.jpg" alt="">
									<div class="text-holder">
										<p>Straten</p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img22.jpg" alt="">
									<div class="text-holder">
										<p>Topografisch</p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img23.jpg" alt="">
									<div class="text-holder">
										<p>Terrein met labels</p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img24.jpg" alt="">
									<div class="text-holder">
										<p>Lichtgrijs canvas</p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img25.jpg" alt="">
									<div class="text-holder">
										<p>National Geographic</p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img26.jpg" alt="">
									<div class="text-holder">
										<p>Oceanen</p>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<img src="<?php echo get_template_directory_uri(); ?>/images/img27.jpg" alt="">
									<div class="text-holder">
										<p>OpenStreetMap</p>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
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
<?php get_footer(); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<!-- set the encoding of your site -->
	<meta charset="<?php bloginfo('charset'); ?>">
	<!-- set the viewport width and initial-scale on mobile devices -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php wp_title(' | ', true, 'right'); ?><?php bloginfo('name'); ?></title>
	<!-- include the site stylesheet -->
	<link media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css">
	<link media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/all.css">
	<link media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/urbannumbers.css">
	<link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/style.css"  />
	<script src="http://fast.fonts.net/jsapi/68a30854-f7c3-46a7-89ca-8e9e74e69a2a.js"></script>
	<?php wp_head(); ?>
	<!-- include bootstrap default JavaScript -->
	<script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
	<!-- include custom JavaScript -->
		<script type="text/javascript">
			var pathInfo = {
				base: '<?php echo get_template_directory_uri(); ?>/',
				css: 'css/',
				js: 'js/',
				swf: 'swf/',
			}
		</script>
	<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.main.js"></script>
	<?php if ( is_singular() ) wp_enqueue_script( 'theme-comment-reply', get_template_directory_uri()."/js/comment-reply.js" ); ?>
	<!-- include HTML5 IE enabling script and stylesheet for IE -->
	<!--[if IE]>
		<link type="text/css" media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/ie.css">
		<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/ie.js"></script>
	<![endif]-->
</head>
<body>
	<!-- main container of all the page elements -->
	<div id="wrapper">
		<div class="w1">
			<!-- header of the page -->
			<header id="header">
				<?php $logo = get_field('logo', 'option'); ?>
				<strong class="logo"<?php if($logo) echo ' style="background-image: url(\''. $logo .'\');"'; ?>><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></strong>
				<!-- Split button -->
				<div class="btn-group add-nav">
					<button type="button" class="btn btn-blue" data-toggle="dropdown"><span class="img-wrap"><i class="icon-user"></i></span>Sign in or register</button>
					<button type="button" class="btn btn-blue dropdown-toggle" data-toggle="dropdown">
						<span class="caret"></span>
						<span class="sr-only">Toggle Dropdown</span>
					</button>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#"><span class="img-wrap"><i class="icon-star"></i></span>Favorite city data</a></li>
						<li><a href="#"><span class="img-wrap"><i class="icon-graph"></i></span>My infographics</a></li>
						<li><a href="#"><span class="img-wrap"><i class="icon-add"></i></span>New infographic</a></li>
						<li><a href="#"><span class="img-wrap"><i class="icon-cog"></i></span>Account settings</a></li>
						<li><a href="#"><span class="img-wrap"><i class="icon-sign-out"></i></span>Sign out</a></li>
					</ul>
				</div>
				<?php if(has_nav_menu('navigation')): ?>
				<nav id="nav">
					<div class="btn-group">
						<button type="button" class="btn btn-blue opener">Menu</button>
						<button type="button" class="btn btn-blue opener">
							<span class="caret"></span>
							<span class="sr-only">Toggle Dropdown</span>
						</button>
					</div>
					<?php
						wp_nav_menu( array('container' => false,
							'theme_location' => 'navigation',
							'menu_class' => 'noclass',) );
					?>
				</nav>
				<?php endif; ?>
			</header>
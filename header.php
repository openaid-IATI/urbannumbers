<?php
$login_redirect = site_url() . "/my-dashboard/";
if (!empty($_GET['redirect']) && substr($_GET['redirect'], 0, 1) == "/") {
    $login_redirect = site_url() . $_GET['redirect'];
}
?>
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
	<link media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/nv.d3.css">
	<link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/style.css"  />
	<link media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/urbannumbers.css">
	<script type="text/javascript" src="http://fast.fonts.net/jsapi/68a30854-f7c3-46a7-89ca-8e9e74e69a2a.js"></script>
	<?php wp_head(); ?>
	<!-- include bootstrap default JavaScript -->
	<script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
	<!-- include custom JavaScript -->
		<script type="text/javascript">
        var LOGIN_URL = '<?php echo wp_login_url( $login_redirect ); ?>';
			var pathInfo = {
				base: '<?php echo get_template_directory_uri(); ?>/',
				css: 'css/',
				js: 'js/',
				swf: 'swf/',
			}
		</script>
	<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.main.js"></script>
	<?php // if ( is_singular() ) wp_enqueue_script( 'theme-comment-reply', get_template_directory_uri()."/js/comment-reply.js" ); ?>
	<!-- include HTML5 IE enabling script and stylesheet for IE -->
	<!--[if IE]>
		<link type="text/css" media="all" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/ie.css">
		<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/ie.js"></script>
	<![endif]-->
</head>
<body>

<div id="hoover-wrapper"></div>
<div id="urbannumbers-login">
    <div class="standard-page-content page-login">
        
        <h1>Start saving projects to dashboard by signing in.<a class="close-login" href="#"><span class="glyphicon glyphicon-remove"></span></a></h1>

        <div class="row bttns">
            <div class="col-md-4">
                <a href="<?php echo wp_login_url( $login_redirect ); ?>">Urban Numbers</a>
            </div>
            <?php do_action( 'wordpress_social_login' ); ?>
        </div>

        <div class="row register">
            <div class="col-md-12">
                <a id="register-button" href="<?php echo site_url(); ?>/register/">Or register with Urban Numbers</a>
            </div>
        </div>
    </div>
</div>

<div id="urbannumbers-register">
    <h1>Register<a class="close-login" href="#"><span class="glyphicon glyphicon-remove"></span></a></h1>
    <?php vb_registration_form(); ?>
</div>


<div id="urbannumbers-lostpassword">
	<a class="close-login" href="#"><div class="glyphicon glyphicon-remove"></div></a>
	<div class="row lost-password-login-form">

		<div class="row">
			<div class="col-md-12">
				<h1>Lost password</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">

				<form name="lostpasswordform" id="lostpasswordform" action="<?php echo wp_lostpassword_url( ); ?>" method="post">
					<div class="form-group">
						<label for="user_login">Username or E-mail:</label>
						<input type="text" name="user_login" id="user_login" class="input form-control" value="" size="20">
					</div>
					<p class="submit"><input type="submit" name="wp-submit" id="wp-submit" class="btn btn-primary button-large" value="Get New Password"></p>
	                                <input type="hidden" name="redirect_to" value="wp-login.php?checkemail=confirm&amp;use_sso=false">
				</form>

			</div>
		</div>
	</div>
</div>



	<!-- main container of all the page elements -->
	<div id="wrapper">
		<div class="w1">
			<!-- header of the page -->
			<header id="header" class="nav_my_account">
				<?php $logo = get_field('logo', 'option'); ?>
				<strong class="logo"<?php if($logo) echo ' style="background-image: url(\''. $logo .'\');"'; ?>><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></strong>
				<!-- Split button -->
				<div class="btn-group add-nav">

					<?php if (is_user_logged_in()) { ?>
					<a id="header-login-register-button" href="<?php echo home_url(); ?>/my-dashboard/" class="btn btn-blue" data-toggle="dropdown"><span class="img-wrap"><i class="icon-user"></i></span>
						My account
					</a>
					<button type="button" class="btn btn-blue dropdown-toggle" data-toggle="dropdown">
						<span class="caret"></span>
						<span class="sr-only">Toggle Dropdown</span>
					</button>
					<ul class="dropdown-menu" role="menu">
						<li><a href="<?php echo home_url() . "/my-dashboard/#city-data"; ?>"><span class="img-wrap"><i class="glyphicon glyphicon-star"></i></span>Favorite city data</a></li>
						<li><a href="<?php echo home_url() . "/my-dashboard/#my-infographics"; ?>"><span class="img-wrap"><i class="glyphicon glyphicon-stats"></i></span>My infographics</a></li>
						<li><a href="<?php echo home_url() . "/create-infographic/"; ?>"><span class="img-wrap"><i class="glyphicon glyphicon-plus-sign"></i></span>New infographic</a></li>
						<li><a href="<?php echo home_url() . "/my-dashboard/#account-settings"; ?>"><span class="img-wrap"><i class="glyphicon glyphicon-cog"></i></span>Account settings</a></li>
						<li><a href="<?php echo wp_logout_url(home_url()); ?>"><span class="img-wrap"><i class="glyphicon glyphicon-arrow-left"></i></span>Sign out</a></li>
					</ul>
					<?php } else { ?>
						<a id="header-login-register-button" href="#" class="btn btn-blue" data-toggle="dropdown"><span class="img-wrap"><i class="icon-user"></i></span>
							Sign in or register
						</a>
						<?php
					} ?>

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

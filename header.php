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
	<script src="http://fast.fonts.net/jsapi/68a30854-f7c3-46a7-89ca-8e9e74e69a2a.js"></script>
	<?php wp_head(); ?>
	<!-- include bootstrap default JavaScript -->
	<script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
	<!-- include custom JavaScript -->
		<script type="text/javascript">
        var LOGIN_URL = '<?php echo wp_login_url( site_url() . "/my-dashboard/" ); ?>';
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
		<a class="close-login" href="#"><div class="glyphicon glyphicon-remove"></div></a>

		<?php 
		$form_action = site_url() . "/wp-login.php";
        $login_error = false;

		if (isset($_GET["login"])){
			if($_GET["login"] == "failed"){
                $login_error = true;
			} 
		}
		?>

		<div class="row">
			<div class="col-md-12">
				<div class="sidebar-login-form-login-error alert alert-danger" <?php echo ($login_error ? "" : "style='display:none;'"); ?>>
					The entered username or password incorrect.
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<h1>Log in</h1>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
                            <p>Need to replace with button to our own IdP</p>
                             <div id="sidebar-login-form-placeholder"></div>
                             <?php
                             /*
                             ?>
				<form name="login-form" id="sidebar-login-form" class="standard-form" action="<?php echo $form_action; ?>" method="post">
					
					<div class="form-group">
						<label><?php _e( 'Username', 'urbannumbers' ); ?></label>
						<input type="text" name="log" id="sidebar-user-login" class="form-control input" value="<?php if ( isset( $user_login) ) echo esc_attr(stripslashes($user_login)); ?>" tabindex="97" />
					</div>

					<div class="form-group">
						<label><?php _e( 'Password', 'urbannumbers' ); ?></label>
						<input type="password" name="pwd" id="sidebar-user-pass" class="form-control input" value="" tabindex="98" />
					</div>

					<p class="forgetmenot"><label><input name="rememberme" type="checkbox" id="sidebar-rememberme" value="forever" tabindex="99" /> <?php _e( 'Remember me', 'buddypress' ); ?></label></p>

					<input type="submit" name="wp-submit" id="sidebar-wp-submit" class="btn btn-default" value="<?php _e( 'Sign in', 'urbannumbers' ); ?>" tabindex="100" />

					<br><a id="lost-password-login" href="#" title="Lost Password">Lost Password</a>
				</form>
                <?php
                */
                ?>
                            <?php do_action( 'wordpress_social_login' ); ?>
			</div>
		</div>

		
		<div class="row">
			<div class="col-md-12">
				<div class="dotted-wrapper">
				  <span style="background-color: white; position: relative; top: -0.8em;">
				    <?php _e( 'Or', 'urbannumbers' ); ?>
				  </span>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div class="login-register">
					<a id="register-button" href="<?php echo site_url(); ?>/register/"><?php _e( 'Register', 'urbannumbers' ); ?></a>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div class="login-socialauth"><?php // do_action( 'wordpress_social_login' ); ?> </div>
			</div>
		</div>
	</div>
</div>

<div id="urbannumbers-register">
		<a class="close-login" href="#"><div class="glyphicon glyphicon-remove"></div></a>

		<div class="row">
			<div class="col-md-12">
				<h1>Register</h1>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<?php vb_registration_form(); ?>
			</div>
		</div>
	</div>
	
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
			<header id="header">
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
						<li><a href="<?php echo home_url() . "/my-dashboard/"; ?>"><span class="img-wrap"><i class="icon-star"></i></span>My dashboard</a></li>
						<li><a href="<?php echo home_url() . "/account-settings/"; ?>"><span class="img-wrap"><i class="icon-cog"></i></span>Account settings</a></li>
						<li><a href="<?php echo wp_logout_url(home_url()); ?>"><span class="img-wrap"><i class="icon-sign-out"></i></span>Sign out</a></li>
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
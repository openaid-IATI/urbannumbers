<?php
/*

.Template Name: User validation link
*/
get_header(); the_post(); ?>


<style>
#urbannumbers-remove-account{
	width:500px;
	height: 500px;
	display: none;
	position: absolute;
	top: 100px;
	left: 0;
	right: 0;
	background-color: white;
	z-index: 999;
	padding: 4em;
	margin-left:auto;
    margin-right:auto;
}

#sidebar-wp-submit{
	background-color: #ccc;
}

#hoover-wrapper{
	display: none;
	background-color: #333;
	opacity: 0.7;
	width: 100%;
	height: 9999px;
	position: absolute;
	z-index: 998;
}
</style>

<div id="hoover-wrapper"></div>
<div id="urbannumbers-remove-account">
	<div class="standard-page-content page-login">


		<div class="row">
			<div class="col-md-12">
				<h1>Account validated</h1>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				Permanently delete account? This can not be undone
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<a href="/delete-account/" id="delete-account-confirmed">Confirm</a>
			</div>
		</div>
		
		
	</div>
</div>

<div id="main">
	<div class="main-container">
		<section class="main-block">
			<header class="heading-container">
				<div class="container-dashboard">
					<h1>Account settings</h1>
				</div>	
			</header>
			
	

			<div class="area-columns">
				<!-- container-columns -->
				<div class="container-columns">
					<div class="column">
						<div class="col-holder">
							<div class="col">
								
								<form action="" name="signup_form" id="signup_form" class="standard-form" method="post" enctype="multipart/form-data">
					
									<div class="form-group">
										<label><?php _e( 'Username', 'urbannumbers' ); ?></label>
										<input type="text" name="log" id="sidebar-user-login" class="form-control input" value="<?php if ( isset( $user_login) ) echo esc_attr(stripslashes($user_login)); ?>" tabindex="97" /></label>
									</div>

									<div class="form-group">
										<label><?php _e( 'Password', 'urbannumbers' ); ?></label>
										<input type="password" name="pwd" id="sidebar-user-pass" class="form-control input" value="" tabindex="98" />
									</div>

									<div class="form-group">
										<label><?php _e( 'E-mail', 'urbannumbers' ); ?></label>
										<input type="email" name="email" id="sidebar-user-pass" class="form-control input" value="" tabindex="98" />
									</div>

									<input type="submit" name="wp-submit" id="sidebar-wp-submit" class="btn btn-default" value="<?php _e( 'Save changes', 'urbannumbers' ); ?>" tabindex="100" />

							
								</form>

								<a href="#" id="delete-account-button"> Remove your account? </a>
					
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

<?php get_template_part("footer", "scripts"); ?>

<?php get_footer(); ?>

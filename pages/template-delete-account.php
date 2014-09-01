<?php
/*
Template Name: User delete account
*/

if ( !is_user_logged_in() ) {
  wp_redirect(site_url() . "?action=login&redirect=/account-settings/");
  exit;
}

if ($_SERVER['REQUEST_METHOD'] == "POST" && !empty($_POST['confirm']) && $_POST['confirm'] == 'yes') {
  require_once(ABSPATH.'wp-admin/includes/user.php' );
  wp_delete_user(get_current_user_id());
  wp_logout();
  wp_clear_auth_cookie();
  exit();
}

get_header(); the_post();


?>

<div id="main">
  <div class="main-container">
    <section class="main-block">
      <header class="heading-container">
        <div class="container-dashboard">
          <h1>Delete account</h1>
        </div>
      </header>

      <div class="area-columns">
        <!-- container-columns -->
        <div class="container-columns">
          <div class="column">
            <div class="col-holder">
              <div>
                <form action="<?php echo site_url() . "/delete-account/"; ?>" method="POST">
                <p>Permanently delete account? This can not be undone.</p>
                <a class="btn btn-link" href="<?php echo site_url() . "/my-dashboard/"; ?>">Cancel</a>
                <input type="hidden" name="confirm" value="yes" />
                <input type="submit" class="btn btn-danger" href="/delete-account/" id="delete-account-confirmed" value="Confirm">
                </form>
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

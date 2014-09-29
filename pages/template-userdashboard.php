<?php
/*
Template Name: User dashboard
*/

if ( !is_user_logged_in() ) {
  wp_redirect(site_url() . "?action=login&redirect=/my-dashboard/");
  exit;
}

$current_user = wp_get_current_user();


function _post_data($name, $default = null) {
  return !empty($_POST[$name]) ? $_POST[$name] : $default;
}

if ($_SERVER['REQUEST_METHOD']) {
  $action = 'skip';
  if (!empty($_POST['type']) && !empty($_POST['action'])) {
      $action = implode(array($_POST['type'], $_POST['action']), ':');
  }

  if ($action == 'account:update') {
    $data = array('ID'           => $current_user->ID,
                  'first_name'   => _post_data('first_name', $current_user->first_name),
                  'last_name'    => _post_data('last_name', $current_user->last_name),
                  'display_name' => _post_data('display_name', $current_user->display_name),
                  'user_email'   => _post_data('user_email', $current_user->user_email));

    $user_id = wp_update_user($data);

    if (is_wp_error($user_id)) {
      print($user_id);
    } else {
      wp_redirect(site_url() . '/my-dashboard/');
    }
  }


  if ($action == 'mi:delete' && !empty($_POST['check'])) {
    foreach ($_POST['check'] as $_ => $id) {
      $post = get_post((int)$id);
      if ($post->post_author == $current_user->ID) {
        wp_delete_post($post->ID);
        wp_redirect(site_url() . '/my-dashboard/');
      }
    }
  }


  if ($action == 'md:delete' && !empty($_POST['check'])) {
    $meta = get_user_meta($current_user->ID, 'oipa_visualisation_favorites', True);
    $new_meta = array();
    foreach ($_POST['check'] as $_ => $id) {
      if (!array_key_exists($id, array_keys($meta))) {
        $new_meta[] = $meta[$id];
      }
    }
    var_dump($new_meta);
    //update_user_meta($current_user->ID, 'oipa_visualisation_favorites', $new_meta);
    //wp_redirect(site_url() . '/my-dashboard/');
  }
}



get_header(); the_post();

?>
<div id="main" class="dashboard">
    <div class="main-container">
        <section class="main-block">
            <header class="heading-container">
                <div class="container-custom">
                    <h1>My Dashboard</h1>
                </div>
            </header>

            <div class="container-custom">
                <h2>Welcome to Urban Numbers</h2>
                <p>Pellentesque tristique tempor orci, eget finibus sapien scelerisque non. Donec tincidunt quam ligula. Vivamus aliquam porttitor quam a molestie. Mauris interdum porttitor nisi, id ullamcorper eros consectetur at. Nulla facilisi. Phasellus tristique leo nibh, vitae tincidunt neque mollis eget. Sed eget nulla commodo, semper justo vitae, lacinia lacus. Aenean id ipsum vel sapien aliquet sagittis.</p>
            </div>
        </section>
    </div>

    <!-- main-container -->
    <div class="main-container">
        <a name="my-infographics"></a>
        <div class="heading-container">
            <div class="container-custom">
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <h3>My city infographics</h3>
                    </div>
                </div>
                <form action="" id="dash-mi-form" method="POST">
                <input type="hidden" name="type" value="mi" />
                <input type="hidden" name="action" value="delete" />
                <table class="table table-striped table-hover table-condensed my-infographics">
                  <thead>
                    <tr>
                      <th width="10px"><input type="checkbox" name="" id="dash-mi-form-check" /></th>
                      <th><a href="javascript: void(0);" onclick="dash_select_all('dash-mi-form');">Select all</a></th>
                      <th width="100px" class="actions"><a href="javascript: void(0);" onclick="dash_delete_selected('dash-mi-form');"><i class="glyphicon glyphicon-trash"></i> Delete</a></th>
                    </tr>
                  </thead>
                  <?php
                  $args = array( 'post_type' => 'infographic', 'posts_per_page' => 12, 'author' => get_current_user_id());
                  $loop = new WP_Query( $args );

                  while ( $loop->have_posts() ) {
                    $loop->the_post();
                    ?>
                    <tr>
                        <td><input type="checkbox" name="check[]" value="<?php the_ID(); ?>" /></td>
                        <td><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></td>
                        <td>&nbsp;</td>
                    </tr>
                    <?php
                  }
                  wp_reset_postdata();
                  ?>
                </table>
                </form>
            </div>
        </div>

        <a name="city-data"></a>
        <div class="heading-container">
            <div class="container-custom">
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <h3>My favorite city data</h3>
                    </div>
                </div>
                <form action="" id="dash-md-form" method="POST">
                <input type="hidden" name="type" value="md" />
                <input type="hidden" name="action" value="delete" />
                <table class="table table-striped table-hover table-condensed my-infographics">
                  <thead>
                    <tr>
                      <th width="10px"><input type="checkbox" name="" id="dash-md-form-check" /></th>
                      <th><a href="javascript: void(0);" onclick="dash_select_all('dash-md-form');">Select all</a></th>
                      <th width="100px" class="actions"><a href="javascript: void(0);" onclick="dash_delete_selected('dash-md-form');"><i class="glyphicon glyphicon-trash"></i> Delete</a></th>
                    </tr>
                  </thead>
                  <?php
                  $favorites = get_user_meta(get_current_user_id(),'oipa_visualisation_favorites',true);
                  if ($favorites) {
                      foreach ($favorites as $k=>$v) {
                      ?>
                      <tr>
                        <td><input type="checkbox" name="check[]" value="<?php echo $k; ?>" /></td>
                        <td><a href="<?php echo get_permalink(); ?>"><?php echo json_decode($v)->name; ?></a></td>
                        <td>&nbsp;</td>
                      </tr>
                      <?php
                      }
                  }
                  ?>
                </table>
                </form>
            </div>
        </div>
    </div>

    <!-- main-container -->
    <a name="account-settings"></a>
    <div class="main-container">
        <div class="heading-container">
            <div class="container-custom">
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                    <h3>Account settings</h3>
                    </div>
                </div>
                <form action="" name="signup_form" id="signup_form" class="standard-form" method="post" enctype="multipart/form-data">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label><?php _e( 'First name', 'urbannumbers' ); ?></label>
                          <input type="text" name="first_name" id="sidebar-user-login" class="form-control input" value="<?php echo esc_attr(stripslashes($current_user->first_name)); ?>" tabindex="97" /></label>
                        </div>
                        <div class="form-group">
                          <label><?php _e( 'Last name', 'urbannumbers' ); ?></label>
                          <input type="text" name="last_name" id="sidebar-user-pass" class="form-control input" value="<?php echo esc_attr(stripslashes($current_user->last_name)); ?>" tabindex="98" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label><?php _e( 'Username', 'urbannumbers' ); ?></label>
                          <input type="text" name="display_name" id="sidebar-user-login" class="form-control input" value="<?php echo esc_attr(stripslashes($current_user->display_name)); ?>" tabindex="97" /></label>
                        </div>
                        <div class="form-group">
                          <label><?php _e( 'E-mail', 'urbannumbers' ); ?></label>
                          <input type="email" name="user_email" id="sidebar-user-pass" class="form-control input" value="<?php echo esc_attr(stripslashes($current_user->user_email)); ?>" tabindex="98" />
                        </div>
                      </div>
                    </div>
                    <input type="hidden" name="action" value="update" />
                    <input type="hidden" name="type" value="account" />
                    <input type="submit" name="wp-submit" id="sidebar-wp-submit" class="btn btn-primary" value="<?php _e( 'Save changes', 'urbannumbers' ); ?>" tabindex="100" />
                </form>
            </div>
        </div>
    </div>

    <!-- main-container -->
    <div class="main-container">
        <div class="heading-container">
            <div class="container-custom">
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                      <h3>Delete account</h3>
                    </div>
                </div>
                <p>Permanently delete account? This can not be undone.</p>
                <a class="btn btn-danger" href="<?php echo site_url(); ?>/delete-account/" id="delete-account-confirmed">Delete Account</a><br />
                <br clear="all" /><br />
            </div>
        </div>
    </div>

</div>

<script src="<?php echo get_template_directory_uri(); ?>/js/urbannumbers-dash.js"></script>

<?php get_template_part("footer", "scripts"); ?>

<?php get_footer(); ?>

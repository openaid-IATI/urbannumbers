<?php
include( TEMPLATEPATH . '/constants.php' );

//Staging restrictions
if (file_exists(sys_get_temp_dir() . '/staging-restrictions.php')) {
    define('STAGING_RESTRICTIONS', true);
    require_once sys_get_temp_dir() . '/staging-restrictions.php';
}

include( get_template_directory() . '/classes.php' );
include( get_template_directory() . '/widgets.php' );

add_action('themecheck_checks_loaded', 'theme_disable_cheks');

function theme_disable_cheks() {
    $disabled_checks = array('TagCheck');
    global $themechecks;
    foreach ($themechecks as $key => $check) {
        if (is_object($check) && in_array(get_class($check), $disabled_checks)) {
            unset($themechecks[$key]);
        }
    }
}

add_theme_support('automatic-feed-links');

if (!isset($content_width))
    $content_width = 900;

remove_action('wp_head', 'wp_generator');

add_action('after_setup_theme', 'theme_localization');

function theme_localization() {
    load_theme_textdomain('base', get_template_directory() . '/languages');
}

/* if ( function_exists('register_sidebar') ) {
  register_sidebar(array(
  'id' => 'default-sidebar',
  'name' => __('Default Sidebar', 'base'),
  'before_widget' => '<div class="widget %2$s" id="%1$s">',
  'after_widget' => '</div>',
  'before_title' => '<h3>',
  'after_title' => '</h3>'
  ));
  } */

if (function_exists('add_theme_support')) {
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(50, 50, true); // Normal post thumbnails
    add_image_size('gallery1500x500', 1500, 500, true);
    add_image_size('block277', 277, 150, true);
    add_image_size('dds640x400', 640, 400, true);
    add_image_size('dds320x200', 320, 200, true);
    add_image_size('post749x288', 749, 288, true);
    add_image_size('post1498x576', 1498, 576, true);
    add_image_size('post748x288', 748, 288, true);
    add_image_size('post76x76', 76, 76, true);

    add_image_size('page_blocks500x380', 500, 380, true);
}

register_nav_menus(array(
    'navigation' => __('Navigation', 'base'),
));

//Add [email]...[/email] shortcode
function shortcode_email($atts, $content) {
    $result = '';
    for ($i = 0; $i < strlen($content); $i++) {
        $result .= '&#' . ord($content{$i}) . ';';
    }
    return $result;
}

add_shortcode('email', 'shortcode_email');

//Register tag [template-url]
function filter_template_url($text) {
    return str_replace('[template-url]', get_bloginfo('template_url'), $text);
}

add_filter('the_content', 'filter_template_url');
add_filter('get_the_content', 'filter_template_url');
add_filter('widget_text', 'filter_template_url');

//Register tag [site-url]
function filter_site_url($text) {
    return str_replace('[site-url]', get_bloginfo('url'), $text);
}

add_filter('the_content', 'filter_site_url');
add_filter('get_the_content', 'filter_site_url');
add_filter('widget_text', 'filter_site_url');

//Replace standard wp menu classes
function change_menu_classes($css_classes) {
    $css_classes = str_replace("current-menu-item", "active", $css_classes);
    $css_classes = str_replace("current-menu-parent", "active", $css_classes);
    return $css_classes;
}

add_filter('nav_menu_css_class', 'change_menu_classes');

//Replace standard wp body classes and post classes
function theme_body_class($classes) {
    if (is_array($classes)) {
        foreach ($classes as $key => $class) {
            $classes[$key] = 'body-class-' . $classes[$key];
        }
    }

    return $classes;
}

add_filter('body_class', 'theme_body_class', 9999);

function theme_post_class($classes) {
    if (is_array($classes)) {
        foreach ($classes as $key => $class) {
            $classes[$key] = 'post-class-' . $classes[$key];
        }
    }

    return $classes;
}

add_filter('post_class', 'theme_post_class', 9999);

//Allow tags in category description
$filters = array('pre_term_description', 'pre_link_description', 'pre_link_notes', 'pre_user_description');
foreach ($filters as $filter) {
    remove_filter($filter, 'wp_filter_kses');
}

//Make wp admin menu html valid
function wp_admin_bar_valid_search_menu($wp_admin_bar) {
    if (is_admin())
        return;

    $form = '<form action="' . esc_url(home_url('/')) . '" method="get" id="adminbarsearch"><div>';
    $form .= '<input class="adminbar-input" name="s" id="adminbar-search" tabindex="10" type="text" value="" maxlength="150" />';
    $form .= '<input type="submit" class="adminbar-button" value="' . __('Search', 'base') . '"/>';
    $form .= '</div></form>';

    $wp_admin_bar->add_menu(array(
        'parent' => 'top-secondary',
        'id' => 'search',
        'title' => $form,
        'meta' => array(
            'class' => 'admin-bar-search',
            'tabindex' => -1,
        )
    ));
}

function fix_admin_menu_search() {
    remove_action('admin_bar_menu', 'wp_admin_bar_search_menu', 4);
    add_action('admin_bar_menu', 'wp_admin_bar_valid_search_menu', 4);
}

add_action('add_admin_bar_menus', 'fix_admin_menu_search');

//Disable comments on pages by default
function theme_page_comment_status($post_ID, $post, $update) {
    if (!$update) {
        remove_action('save_post_page', 'theme_page_comment_status', 10);
        wp_update_post(array(
            'ID' => $post->ID,
            'comment_status' => 'closed',
        ));
        add_action('save_post_page', 'theme_page_comment_status', 10, 3);
    }
}

add_action('save_post_page', 'theme_page_comment_status', 10, 3);

//custom excerpt
function theme_the_excerpt() {
    global $post;

    if (trim($post->post_excerpt)) {
        the_excerpt();
    } elseif (strpos($post->post_content, '<!--more-->') !== false) {
        the_content();
    } else {
        the_excerpt();
    }
}

/* advanced custom fields settings */

//theme options tab in appearance
if (function_exists('acf_add_options_sub_page')) {
    acf_add_options_sub_page(array(
        'title' => 'Theme Options',
        'parent' => 'themes.php',
    ));
}

//acf theme functions placeholders
if (!class_exists('acf') && !is_admin()) {

    function get_field_reference($field_name, $post_id) {
        return '';
    }

    function get_field_objects($post_id = false, $options = array()) {
        return false;
    }

    function get_fields($post_id = false) {
        return false;
    }

    function get_field($field_key, $post_id = false, $format_value = true) {
        return false;
    }

    function get_field_object($field_key, $post_id = false, $options = array()) {
        return false;
    }

    function the_field($field_name, $post_id = false) {
        
    }

    function have_rows($field_name, $post_id = false) {
        return false;
    }

    function the_row() {
        
    }

    function reset_rows($hard_reset = false) {
        
    }

    function has_sub_field($field_name, $post_id = false) {
        return false;
    }

    function get_sub_field($field_name) {
        return false;
    }

    function the_sub_field($field_name) {
        
    }

    function get_sub_field_object($child_name) {
        return false;
    }

    function acf_get_child_field_from_parent_field($child_name, $parent) {
        return false;
    }

    function register_field_group($array) {
        
    }

    function get_row_layout() {
        return false;
    }

    function acf_form_head() {
        
    }

    function acf_form($options = array()) {
        
    }

    function update_field($field_key, $value, $post_id = false) {
        return false;
    }

    function delete_field($field_name, $post_id) {
        
    }

    function create_field($field) {
        
    }

    function reset_the_repeater_field() {
        
    }

    function the_repeater_field($field_name, $post_id = false) {
        return false;
    }

    function the_flexible_field($field_name, $post_id = false) {
        return false;
    }

    function acf_filter_post_id($post_id) {
        return $post_id;
    }

}

/* include jQuery library */

function mytheme_enqueue_scripts() {
    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_register_script('jquery', (get_template_directory_uri() . "/js/jquery-1.8.3.min.js"), false, '1.8.3');
        wp_enqueue_script('jquery');
    }
}

add_action('wp_enqueue_scripts', 'mytheme_enqueue_scripts');

add_action('init', 'add_custom_post_type');

function add_custom_post_type() {
    $args = array(
        'labels' => array('name' => __('Gallery')),
        'public' => true,
        'publicly_queryable' => false,
        'exclude_from_search' => true,
        'show_in_nav_menus' => false,
        'supports' => array('title', 'custom-fields')
    );
    register_post_type('gallery', $args);
    $args = array(
        'labels' => array('name' => __('Data driven stories')),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'yarpp_support' => true
    );
    register_post_type('dds', $args);
}

// Make the metabox appear on the page editing screen
function tags_for_pages() {
    register_taxonomy_for_object_type('post_tag', 'page');
}

add_action('init', 'tags_for_pages');

// When displaying a tag archive, also show pages
function tags_archives($wp_query) {
    if ($wp_query->get('tag'))
        $wp_query->set('post_type', 'any');
}

add_action('pre_get_posts', 'tags_archives');

function custom_excerpt_length($length) {
    return 20;
}

function vb_register_user_scripts() {
    // Enqueue script
    wp_register_script('vb_reg_script', get_template_directory_uri() . '/js/ajax-registration.js', array('jquery'), null, false);
    wp_enqueue_script('vb_reg_script');

    wp_localize_script('vb_reg_script', 'vb_reg_vars', array(
        'vb_ajax_url' => admin_url('admin-ajax.php'),
            )
    );
}

add_action('wp_enqueue_scripts', 'vb_register_user_scripts', 100);


/*
 * Add an action filter to wp-login.php to add our own password recovery through
 * our SSO API
 * 
 * #TODO We need to fix the static urls to the SSO provider. 
 */
add_action('login_init', function() {
    //check if there is any action defined
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
        //if the action is the sso request password option...
        if ($action == 'sso_rp') {

            $errors = new WP_Error();

            if (isset($_POST['pass1']) && $_POST['pass1'] != $_POST['pass2'])
                $errors->add('password_reset_mismatch', __('The passwords do not match.'));

            if ((!$errors->get_error_code() ) && isset($_POST['pass1']) && !empty($_POST['pass1'])) {

                //initialize API call to change password
                $ch = curl_init();
                //TODO change this URL to a setting
                curl_setopt($ch, CURLOPT_URL, 'http://sp.zimmermanzimmerman.com/rest-auth/password/reset/confirm/' . urlencode($_GET['uid']) . '/' . urlencode($_GET['keys']) . '/');
                curl_setopt($ch, CURLOPT_POST, 2);
                curl_setopt($ch, CURLOPT_POSTFIELDS, "new_password1=" . $_POST['pass1'] . '&new_password2=' . $_POST['pass2']);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                $response = json_decode(curl_exec($ch), true);
                //close connection
                curl_close($ch);

                //After posting the form, we can check if the user was allowed to change it's password. Maybe change in future API to do this more
                //pro-actively
                if (isset($response['error'])) {
                    wp_redirect(site_url('wp-login.php?action=lostpassword&error=invalidkey'));
                    exit();
                } else {
                    //the user has changed it's password successfully, and could login with it's new password
                    login_header(__('Password Reset'), '<p class="message reset-pass">' . __('Your password has been reset.') . ' <a href="' . esc_url(wp_login_url()) . '">' . __('Log in') . '</a></p>');
                    login_footer();
                    exit;
                }
            }

            wp_enqueue_script('utils');
            wp_enqueue_script('user-profile');

            login_header(__('Reset Password'), '<p class="message reset-pass">' . __('Enter your new password below.') . '</p>', $errors);
            ?>
            <form name="resetpassform" id="resetpassform" action="<?php echo esc_url(site_url('wp-login.php?action=sso_rp&keys=' . urlencode($_GET['keys']) . '&uid=' . urlencode($_GET['uid']), 'login_post')); ?>" method="post" autocomplete="off">


                <p>
                    <label for="pass1"><?php _e('New password') ?><br />
                        <input type="password" name="pass1" id="pass1" class="input" size="20" value="" autocomplete="off" /></label>
                </p>
                <p>
                    <label for="pass2"><?php _e('Confirm new password') ?><br />
                        <input type="password" name="pass2" id="pass2" class="input" size="20" value="" autocomplete="off" /></label>
                </p>

                <div id="pass-strength-result" class="hide-if-no-js"><?php _e('Strength indicator'); ?></div>
                <p class="description indicator-hint"><?php _e('Hint: The password should be at least seven characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ &amp; ).'); ?></p>

                <br class="clear" />


                <p class="submit"><input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="<?php esc_attr_e('Reset Password'); ?>" /></p>
            </form>



            <?php
            //make sure the password indicator works
            login_footer('user_pass');
            //quit executing the normal WP life cycle
            exit();
        }
    }
});

/*
 * Change the behaviour of requesting a new password. 
 * 
 * This method will call the SSO API to request a new password for the requested
 * user.
 * 
 * TODO: Fix URL to API in a setting call.
 */
add_action('lostpassword_post', function( $user ) {
    $errors = new WP_Error();
    $email = $_POST['user_login'];
    $ch = curl_init();
    //TODO add url to settings page
    curl_setopt($ch, CURLOPT_URL, 'http://sp.zimmermanzimmerman.com/rest-auth/password/reset/');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "email=" . $email);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = json_decode(curl_exec($ch), true);
    //close connection
    curl_close($ch);

    if (isset($response['errors'])) {
        $errors->add('invalid_email', __('<strong>ERROR</strong>: There is no user registered with that email address.'));
        return $errors;
    } else {
        return true;
    }
    die();
}, 10, 2);

/*
 * Making sure that the SSO plugin does not overwrite the password options
 */
add_filter('lostpassword_redirect', function(){
    
    return 'wp-login.php?checkemail=confirm&use_sso=false';
});

/**
 * New User registration
 * 
 * Will make a call to the SSO API to enter this user in the SSO database
 *
 */
function vb_reg_new_user() {

    // Verify nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'vb_new_user'))
        die('Ooops, something went wrong, please try again later.');


    // Post values
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $email = $_POST['mail'];
    $name = $_POST['name'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];

    /**
     * IMPORTANT: You should make server side validation here!
     *
     */
    $userdata = array(
        'user_login' => $username,
        'user_pass' => $password,
        'user_email' => $email,
        'first_name' => $first_name,
        'last_name' => $last_name,
    );

    $fields = array(
        'last_name' => $last_name,
        'first_name' => $first_name,
        'username' => $username,
        'password' => $password,
        'email' => $email,
    );

    $fields_string = '';
    foreach ($fields as $key => $value) {
        $fields_string .= $key . '=' . $value . '&';
    }
    rtrim($fields_string, '&');

    //make the API call
    $ch = curl_init();
    //TODO add url to settings page
    curl_setopt($ch, CURLOPT_URL, 'http://sp.zimmermanzimmerman.com/rest-auth/register/');
    curl_setopt($ch, CURLOPT_POST, count($fields));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //execute post
    $result = curl_exec($ch);



    //close connection
    curl_close($ch);
    //we should not create a new user. This is the responsibility of the SSO plugin
    //$user_id = wp_insert_user($userdata);

    // Return
    if (!is_wp_error($user_id)) {
        echo '1';
    } else {
        echo $user_id->get_error_message();
    }
    die();
}

add_action('wp_ajax_register_user', 'vb_reg_new_user');
add_action('wp_ajax_nopriv_register_user', 'vb_reg_new_user');


/*
 * Activate user through our SSO API
 */

function activate_user($activation_key) {
    $ch = curl_init();
    //TODO add url to settings page
    curl_setopt($ch, CURLOPT_URL, 'http://sp.zimmermanzimmerman.com/rest-auth/verify-email/' . $activation_key . '/');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //execute post
    $response = json_decode(curl_exec($ch), true);

    if (isset($response['errors'])) {
        return FALSE;
    } else {
        return TRUE;
    }
    //close connection
    curl_close($ch);
}

/*
 * Adding dasboard_role for SSO users to only view dashboard
 * 
 * This function will be executed on theme activation
 */

function add_roles_on_theme_activation() {
    $result = add_role('dashboard_role', 'Dashboard User', array('read' => true, 'level_0' => true));
}

add_action('after_switch_theme', 'add_roles_on_theme_activation');

/*
 * Redirect users of group dashboard_role to their dashboard
 */
function numbers_login_redirect($redirect_to, $request, $user) {
    if ($user && is_object($user) && is_a($user, 'WP_User')) {
        if (is_array($user->roles)) {

            if (in_array('subscriber', $user->roles)) {
                return get_option('siteurl') . '/my-dashboard/';
            }
        }
        return admin_url();
    }
}

add_filter('login_redirect', 'numbers_login_redirect', 10, 3);

function vb_registration_form() {
    ?>

    <div class="vb-registration-form">
        <form class="form-horizontal registraion-form" role="form">

            <div class="form-group">
                <label for="vb_name" class="sr-only">Your Name</label>
                <input type="text" name="vb_name" id="vb_name" value="" placeholder="Your Name" class="form-control" />
            </div>

            <div class="form-group">
                <label for="vb_email" class="sr-only">Your Email</label>
                <input type="email" name="vb_email" id="vb_email" value="" placeholder="Your Email" class="form-control" />
            </div>

            <div class="form-group">
                <label for="vb_first_name" class="sr-only">Your First name</label>
                <input type="text" name="vb_first_name" id="vb_first_name" value="" placeholder="First name" class="form-control" />
            </div>

            <div class="form-group">
                <label for="vb_last_name" class="sr-only">Your Last name</label>
                <input type="text" name="vb_last_name" id="vb_last_name" value="" placeholder="Last name" class="form-control" />
            </div>

            <div class="form-group">
                <label for="vb_username" class="sr-only">Choose Username</label>
                <input type="text" name="vb_username" id="vb_username" value="" placeholder="Choose Username" class="form-control" />
                <span class="help-block">Please use only a-z,A-Z,0-9,dash and underscores, minimum 5 characters</span>
            </div>

            <div class="form-group">
                <label for="vb_pass" class="sr-only">Choose Password</label>
                <input type="password" name="vb_pass" id="vb_pass" value="" placeholder="Choose Password" class="form-control" />
                <span class="help-block">Minimum 8 characters</span>
            </div>

            <?php wp_nonce_field('vb_new_user', 'vb_new_user_nonce', true, true); ?>

            <input type="submit" class="btn btn-primary" id="btn-new-user" value="Register" />
        </form>

        <div class="indicator">Please wait...</div>
        <div class="alert result-message"></div>
    </div>

    <?php
}

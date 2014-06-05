<?php
include( TEMPLATEPATH .'/constants.php' );

//Staging restrictions
if (file_exists(sys_get_temp_dir().'/staging-restrictions.php')) {
	define('STAGING_RESTRICTIONS', true);
	require_once sys_get_temp_dir().'/staging-restrictions.php';
}

include( get_template_directory() .'/classes.php' );
include( get_template_directory() .'/widgets.php' );

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

add_theme_support( 'automatic-feed-links' );

if ( ! isset( $content_width ) ) $content_width = 900;

remove_action('wp_head', 'wp_generator');

add_action( 'after_setup_theme', 'theme_localization' );
function theme_localization () {
	load_theme_textdomain( 'base', get_template_directory() . '/languages' );
}


/*if ( function_exists('register_sidebar') ) {
	register_sidebar(array(
		'id' => 'default-sidebar',
		'name' => __('Default Sidebar', 'base'),
		'before_widget' => '<div class="widget %2$s" id="%1$s">',
		'after_widget' => '</div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>'
	));
}*/

if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 50, 50, true ); // Normal post thumbnails
	add_image_size( 'gallery1500x500', 1500, 500, true );
	add_image_size( 'block277', 277, 150, true );
	add_image_size( 'dds640x400', 640, 400, true );
	add_image_size( 'dds320x200', 320, 200, true );
	add_image_size( 'post749x288', 749, 288, true );
	add_image_size( 'post1498x576', 1498, 576, true );
	add_image_size( 'post748x288', 748, 288, true );
	add_image_size( 'post76x76', 76, 76, true );
	
	add_image_size( 'page_blocks500x380', 500, 380, true );
}

register_nav_menus( array(
	'navigation' => __( 'Navigation', 'base' ),
) );


//Add [email]...[/email] shortcode
function shortcode_email($atts, $content) {
	$result = '';
	for ($i=0; $i<strlen($content); $i++) {
		$result .= '&#'.ord($content{$i}).';';
	}
	return $result;
}
add_shortcode('email', 'shortcode_email');

//Register tag [template-url]
function filter_template_url($text) {
	return str_replace('[template-url]',get_bloginfo('template_url'), $text);
}
add_filter('the_content', 'filter_template_url');
add_filter('get_the_content', 'filter_template_url');
add_filter('widget_text', 'filter_template_url');

//Register tag [site-url]
function filter_site_url($text) {
	return str_replace('[site-url]',get_bloginfo('url'), $text);
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
foreach ( $filters as $filter ) {
    remove_filter($filter, 'wp_filter_kses');
}


//Make wp admin menu html valid
function wp_admin_bar_valid_search_menu( $wp_admin_bar ) {
	if ( is_admin() )
		return;

	$form  = '<form action="' . esc_url( home_url( '/' ) ) . '" method="get" id="adminbarsearch"><div>';
	$form .= '<input class="adminbar-input" name="s" id="adminbar-search" tabindex="10" type="text" value="" maxlength="150" />';
	$form .= '<input type="submit" class="adminbar-button" value="' . __('Search', 'base') . '"/>';
	$form .= '</div></form>';

	$wp_admin_bar->add_menu( array(
		'parent' => 'top-secondary',
		'id'     => 'search',
		'title'  => $form,
		'meta'   => array(
			'class'    => 'admin-bar-search',
			'tabindex' => -1,
		)
	) );
}

function fix_admin_menu_search() {
	remove_action( 'admin_bar_menu', 'wp_admin_bar_search_menu', 4 );
	add_action( 'admin_bar_menu', 'wp_admin_bar_valid_search_menu', 4 );
}

add_action( 'add_admin_bar_menus', 'fix_admin_menu_search' );

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

/* advanced custom fields settings*/

//theme options tab in appearance
if(function_exists('acf_add_options_sub_page')) {
	acf_add_options_sub_page(array(
		'title' => 'Theme Options',
		'parent' => 'themes.php',
	));
}

//acf theme functions placeholders
if(!class_exists('acf') && !is_admin()) {
	function get_field_reference( $field_name, $post_id ) {return '';}
	function get_field_objects( $post_id = false, $options = array() ) {return false;}
	function get_fields( $post_id = false) {return false;}
	function get_field( $field_key, $post_id = false, $format_value = true )  {return false;}
	function get_field_object( $field_key, $post_id = false, $options = array() ) {return false;}
	function the_field( $field_name, $post_id = false ) {}
	function have_rows( $field_name, $post_id = false ) {return false;}
	function the_row() {}
	function reset_rows( $hard_reset = false ) {}
	function has_sub_field( $field_name, $post_id = false ) {return false;}
	function get_sub_field( $field_name ) {return false;}
	function the_sub_field($field_name) {}
	function get_sub_field_object( $child_name ) {return false;}
	function acf_get_child_field_from_parent_field( $child_name, $parent ) {return false;}
	function register_field_group( $array ) {}
	function get_row_layout() {return false;}
	function acf_form_head() {}
	function acf_form( $options = array() ) {}
	function update_field( $field_key, $value, $post_id = false ) {return false;}
	function delete_field( $field_name, $post_id ) {}
	function create_field( $field ) {}
	function reset_the_repeater_field() {}
	function the_repeater_field($field_name, $post_id = false) {return false;}
	function the_flexible_field($field_name, $post_id = false) {return false;}
	function acf_filter_post_id( $post_id ) {return $post_id;}
}

/* include jQuery library */
function mytheme_enqueue_scripts() {
	if( !is_admin()){
		wp_deregister_script('jquery');
		wp_register_script('jquery', (get_template_directory_uri()."/js/jquery-1.8.3.min.js"), false, '1.8.3');
		wp_enqueue_script('jquery');
	}
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_scripts');

add_action('init', 'add_custom_post_type');
function add_custom_post_type() 
{
  $args = array(
    'labels' => array('name' => __('Gallery')),
	'public' => true,
	'publicly_queryable' => false,
	'exclude_from_search' => true,
	'show_in_nav_menus' => false,
    'supports' => array('title','custom-fields')
  ); 
  register_post_type('gallery',$args);
  $args = array(
    'labels' => array('name' => __('Data driven stories')),
	'public' => true,
	'has_archive' => true,
    'supports' => array('title','editor','custom-fields'),
	'yarpp_support' => true
  ); 
  register_post_type('dds',$args);
}

// Make the metabox appear on the page editing screen
function tags_for_pages() {
	register_taxonomy_for_object_type('post_tag', 'page');
}
add_action('init', 'tags_for_pages');

// When displaying a tag archive, also show pages
function tags_archives($wp_query) {
	if ( $wp_query->get('tag') )
		$wp_query->set('post_type', 'any');
}
add_action('pre_get_posts', 'tags_archives');

function custom_excerpt_length( $length ) {
	return 20;
}
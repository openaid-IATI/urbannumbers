<script>

var search_url = '<?php echo SEARCH_URL; ?>';
var home_url = "<?php echo bloginfo("url"); ?>";
var template_directory = "<?php echo bloginfo("template_url"); ?>";
var site_title = "<?php echo wp_title(''); ?>";
var standard_basemap = "zimmerman2014.hmpkg505";
var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";

var register_url = "http://localhost:18088/rest-auth/register/";
</script>


<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/nouislider.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/d3.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/nv.d3.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/RadarChart.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/Chart.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/share.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.bitly.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa-widgets.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa-indicators.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa-visualisation.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/urbannumbers.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa/in-map-oipa-indicator-filters.js"></script>
<!-- make sure oipa-widgets-bus loaded last -->
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa-widgets-bus.js"></script>

<?php
if (!empty($_GET['action']) && $_GET['action'] == 'login') {
?>
<script type="text/javascript">
$(function() {
    display_login_form();
});
</script>
<?php
}
?>
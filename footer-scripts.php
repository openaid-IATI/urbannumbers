<script>
var site = '<?php echo SITE_URL; ?>';
var search_url = '<?php echo SEARCH_URL; ?>';
var home_url = "<?php echo bloginfo("url"); ?>";
var template_directory = "<?php echo bloginfo("template_url"); ?>";
var site_title = "<?php echo wp_title(''); ?>";
</script>


<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/oipa.js"></script>
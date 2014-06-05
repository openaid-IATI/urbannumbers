<?php $sq = get_search_query() ? get_search_query() : __('Enter search terms&hellip;', 'base'); ?>
<form method="get" class="search-form" action="<?php echo home_url(); ?>" >
	<fieldset>
		<input type="text" name="s" value="<?php echo $sq; ?>" />
		<input type="submit" value="Search" />
	</fieldset>
</form>
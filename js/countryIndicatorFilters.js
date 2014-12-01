function CountryIndicatorFilters() {
}

CountryIndicatorFilters.prototype = new ExploreIndicatorFilters();

CountryIndicatorFilters.prototype.reset_filters = function() {
    Oipa.use_prefill = false;
    this.selection.clean('indicators');
    jQuery("#"+this.filter_wrapper_div+" input[type=checkbox]").attr('checked', false);
    this.save(true);
};

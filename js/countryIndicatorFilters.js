function CountryIndicatorFilters() {
}

CountryIndicatorFilters.prototype = new ExploreIndicatorFilters();

CountryIndicatorFilters.prototype.reset_filters = function() {
    Oipa.use_prefill = false;
    this.selection.clean('indicators');
    this.save(true);
};

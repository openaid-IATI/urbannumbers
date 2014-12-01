function CountryIndicatorFilters() {
    this.adm_division = 'country';
}

CountryIndicatorFilters.prototype = new ExploreIndicatorFilters();

CountryIndicatorFilters.prototype.reset_filters = function() {
    Oipa.use_prefill = false;
    this.selection.clean('indicators');
    jQuery("#"+this.filter_wrapper_div+" input[type=checkbox]").attr('checked', false);
    this.save(true);
};

CountryIndicatorFilters.prototype.get_url = function(selection, parameters_set) {
    // get url from filter selection object
    var cururl = search_url + "indicator-filter-options/?format=json";
    if (parameters_set){
        cururl += parameters_set;
    } else {
        cururl += "&indicators__in=" + get_parameters_from_selection(this.selection.get('indicators', []));
        cururl += "&regions__in=" + get_parameters_from_selection(this.selection.get('regions', []));
        cururl += "&countries__in=" + get_parameters_from_selection(this.selection.get('countries', []));
        cururl += "&cities__in=" + get_parameters_from_selection(this.selection.get('cities', []));
        cururl += "&adm_division__in=" + this.adm_division;
    }
    return cururl;
};

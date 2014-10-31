function UnhabitatOipaCompareFilters() {
    OipaCompareFilters.call(this);
}
UnhabitatOipaCompareFilters.prototype = Object.create(OipaCompareFilters.prototype);


UnhabitatOipaCompareFilters.prototype.get_url = function(selection, parameters_set) {
    // get url from filter selection object
    var cururl = search_url + "indicator-filter-options/?format=json&adm_division__in=city";
    if (parameters_set){
        cururl += parameters_set;
    } else {
        cururl += "&indicators__in=" + get_parameters_from_selection(this.selection.get('indicators', []));
    }

    return cururl;
};

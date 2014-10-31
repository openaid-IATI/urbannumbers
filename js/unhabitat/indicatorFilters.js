function UnhabitatOipaIndicatorFilters() {
    OipaIndicatorFilters.call(this);
    this.get_url = function(selection, parameters_set) {
        var self = this;
        // get url from filter selection object
        if (!parameters_set) {
            var adm_division__in = [];
            var plural = {
                'regions': 'region',
                'countries': 'country',
                'cities': 'city'
            };
            parameters_set = $.map(['regions', 'countries', 'cities'], function(k) {
                var _params = get_parameters_from_selection(self.selection[k]);
                if (_params != '') {
                    adm_division__in.push(plural[k]);
                }
                return k + '__in=' + _params;
            });
            if (adm_division__in.length) {
                parameters_set.push('adm_division__in=' + adm_division__in.join(','));
            }

            parameters_set = parameters_set.join('&');
        }

        return search_url + "indicator-filter-options/?format=json&" + parameters_set;
    };

    this.reset_filters = function(){
        jQuery("#"+this.filter_wrapper_div+" input[type=checkbox]").attr('checked', false);
        filter.selection.search = "";
        filter.selection.query = "";
        filter.selection.country = "";
        filter.selection.region = "";
        filter.selection.regions = [];
        filter.selection.cities = [];
        filter.selection.countries = [];
        filter.selection.indicators = [];
        //filter.selection.indicators.push({"id": "urban_population_countries", "name": "Urban population – Countries", "type": "Slum dwellers"});
        // TO DO: set checkboxes
        filter.save(true);
    }

};
UnhabitatOipaIndicatorFilters.prototype = Object.create(OipaIndicatorFilters.prototype);

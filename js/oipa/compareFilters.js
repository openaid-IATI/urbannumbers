function OipaCompareFilters() {
    this.get_selection_object = function(){
        var new_selection = new OipaCompareSelection();
        new_selection.left.countries = this.get_checked_by_filter("left-countries");
        new_selection.left.cities = this.get_checked_by_filter("left-cities");
        new_selection.right.countries = this.get_checked_by_filter("right-countries");
        new_selection.right.cities = this.get_checked_by_filter("right-cities");
        new_selection.indicators = this.get_checked_by_filter("indicators");
        return new_selection;
    };

    this.get_url = function(selection, parameters_set){
        // get url from filter selection object
        if (parameters_set){
            var cururl = search_url + "indicator-filter-options/?format=json&adm_division__in=city" + parameters_set;
        } else {
            var cururl = search_url + "indicator-filter-options/?format=json" + "&indicators__in=" + get_parameters_from_selection(this.selection.indicators);
        }

        return cururl;
    };

    this.process_filter_options = function(data){
        var columns = 4;
        var filter = this;

        // load filter html and implement it in the page
        this.create_filter_attributes(data.countries, columns, 'left-countries');
        this.create_filter_attributes(data.countries, columns, 'right-countries');

        this.create_filter_attributes(data.cities, columns, 'left-cities');
        this.create_filter_attributes(data.cities, columns, 'right-cities');

        this.create_filter_attributes(data.indicators, 2, 'indicators');
        //this.initialize_filters();
    };

}
OipaCompareFilters.prototype = new OipaIndicatorFilters();


OipaCompareFilters.prototype.get_checked_by_select = function(id) {
    var result = $.map($('#' + id + '-select option:selected'), function(option) {
        if (option.value !== '') {
            return {"id": option.value, "name": option.innerHTML};
        }
    });
    return result;
}

OipaCompareFilters.prototype.update_selection_object = function() {
    this.selection.left.countries = this.get_checked_by_select('left-countries');

    var left_cities = this.get_checked_by_select('left-cities');
    if (left_cities.length > 0) {
        this.selection.left.cities = left_cities;
    }
    this.selection.right.countries = this.get_checked_by_select('right-countries');

    var right_cities = this.get_checked_by_select('right-cities');
    if (right_cities.length > 0) {
        this.selection.right.cities = right_cities;
    }
    this.selection.indicators = this.get_checked_by_filter("indicators");
};

OipaCompareFilters.prototype.get_select_status = function(key) {
    if (key == 'left-countries') {
        // Left countries select is always enabled
        return true;
    }

    if (key == 'left-cities' && this.selection.get_side('left', 'countries', []).length > 0) {
        return true;
    }

    if (key == 'right-countries' && this.selection.get_side('left', 'cities', []).length > 0) {
        return true;
    }

    if (key == 'right-cities' && this.selection.get_side('right', 'countries', []).length > 0) {
        return true;
    }

    return false;
}

OipaCompareFilters.prototype.reload_specific_filter = function(filter_name, data) {
    var self = this;
    if (!data){
        var url = '';

        if (filter_name === "indicators") {
            url = "&regions__in=" + get_parameters_from_selection(self.selection.get('regions'))
                + "&countries__in=" + get_parameters_from_selection(self.selection.get('countries'))
                + "&cities__in=" + get_parameters_from_selection(self.selection.get('cities'));
        } else {
            url = "&indicators__in=" + get_parameters_from_selection(self.selection.get('indicators'));
        }

        if (filter_name === "left-cities") {
            url += "&countries__in=" + get_parameters_from_selection(self.selection.get_side('left', 'countries'));
        }
        if (filter_name === "right-cities") {
            url += "&countries__in=" + get_parameters_from_selection(self.selection.get_side('right', 'countries'));
        }

        if (filter_name === "countries") {
            url += "&regions__in=" + get_parameters_from_selection(self.selection.get('regions'));
        }

        if (filter_name === "cities") {
            url += "&regions__in=" + get_parameters_from_selection(self.selection.get('regions'))
                + "&countries__in=" + get_parameters_from_selection(self.selection.get('countries'));
        }
        url = self.get_url(null, url);

        jQuery.support.cors = true;

        if(window.XDomainRequest) {
            var xdr = new XDomainRequest();
            xdr.open("get", url);
            xdr.onprogress = function () { };
            xdr.ontimeout = function () { };
            xdr.onerror = function () { };
            xdr.onload = function() {
                var jsondata = jQuery.parseJSON(xdr.responseText);
                if (jsondata === null || typeof (jsondata) === 'undefined') {
                    jsondata = jQuery.parseJSON(jsondata.firstChild.textContent);
                }
                self.reload_specific_filter(filter_name, jsondata);
            };
            setTimeout(function () {xdr.send();}, 0);
        } else {
            jQuery.ajax({
                type: 'GET',
                url: url,
                contentType: "application/json",
                dataType: 'json',
                success: function(data){
                    self.reload_specific_filter(filter_name, data);
                }
            });
        }

    } else {
        // reload filters
        columns = 4;

        $('#indicator-filter-wrapper li a').each(function(_, a) {
            $(a).addClass('btn btn-default');
        });

        if (filter_name === "left-cities") {
            self.create_filter_attributes(data.cities, columns, 'left-cities');
        }
        if (filter_name === "right-cities") {
            self.create_filter_attributes(data.cities, columns, 'right-cities');
        }
        if (filter_name === "regions") {
            self.create_filter_attributes(data.regions, 2, 'regions');
        }
        if (filter_name === "countries") {
            self.create_filter_attributes(data.countries, columns, 'countries');
        }
        if (filter_name === "cities") {
            self.create_filter_attributes(data.cities, columns, 'cities');
        }
        if (filter_name === "indicators") {
            self.create_filter_attributes(data.indicators, 2, 'indicators');
            $('#indicator-filter-wrapper li a').each(function(_, a) {
                $(a).addClass('btn btn-success');
                $(a).click(function(e) {
                    $('#indicator-filter-wrapper .slide-content').show();
                })
            });
        }

        self.initialize_filters(self.selection);
    }
};

OipaCompareFilters.prototype.create_filter_attributes = function(objects, columns, key) {
    var self = this;
    if (['left-cities', 'right-cities', 'left-countries', 'right-countries'].indexOf(key) !== -1) {
        if ($('#' + key + '-select').get().length == 0) {
            var _holder = document.createElement('select');
            _holder.id = key + '-select';
            _holder.onchange = function(e) {
                self.save();
                if (key.indexOf('-countries') !== -1) {
                    self.reload_specific_filter(key.replace('-countries', '-cities'));
                }
                if (key == 'left-cities') {
                    $('#right-countries-select').get()[0].disabled = false;
                }
                if (key == 'right-cities') {
                    self.reload_specific_filter('indicators');
                    $('#indicator-filter-wrapper nav').show();
                }
            }

            if (key == 'left-countries') {
                _holder.onclick = function() {
                    $('.left-countries-helper').fadeOut();
                }
            }

        } else {
            var _holder = $('#' + key + '-select').get()[0];

            var _keys = Object.keys(_holder._options);

            for (var option = 0; option <= _keys.length; option++) {
                _holder.removeChild(_holder.childNodes[0]);
            }
        }

        _holder.disabled = !self.get_select_status(key);
        _holder._options = {};
        _holder._default_option = document.createElement('option');
        _holder._default_option.value = '';
        _holder._default_option.innerHTML = "SELECT ME"; // TO DO: Update label
        _holder.appendChild(_holder._default_option);

        $.each(objects, function(code, name) {
            _holder._options[code] = document.createElement('option');
            _holder._options[code].value = code;
            _holder._options[code].innerHTML = name;

            _holder.appendChild(_holder._options[code]);
        });

        $('#' + key + '-filters').html(_holder);


    } else {
        self.create_indicator_filter_attributes(objects, columns);
    }
};

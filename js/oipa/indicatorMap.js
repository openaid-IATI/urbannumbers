function OipaIndicatorMap(use_legend) {
    this.max_circle_size = 1000000;
    this._url_data_cache = {};
    this.bounds = new L.latLngBounds([]);
    this.use_fit_bounds = true;

    this.locations = {};
    this.indicatordata = {};

    this.active_years = {};


    this.get_url = function() {
        var str_region = get_parameters_from_selection(this.selection.regions);
        var str_country = get_parameters_from_selection(this.selection.countries);
        var str_city = get_parameters_from_selection(this.selection.cities);
        var str_indicators = get_parameters_from_selection(this.selection.indicators);

        return search_url + 'indicator-data/?format=json&countries__in=' + str_country + '&regions__in=' + str_region + '&cities__in=' + str_city + '&indicators__in=' + str_indicators;
    };

    this.get_data = function(url) {
        var self = this;
        var _action = function(data) {
            self.refresh(data);
        };

        if (this._url_data_cache[url] === undefined) { // Get data and cache it
            // filters
            $.support.cors = true;

            if(window.XDomainRequest) {
                var xdr = new XDomainRequest();
                xdr.open("get", url);
                xdr.onprogress = function () { };
                xdr.ontimeout = function () { };
                xdr.onerror = function () { };
                xdr.onload = function() {
                    var jsondata = $.parseJSON(xdr.responseText);
                    if (jsondata === null || typeof (jsondata) === 'undefined') {
                        self._url_data_cache[url] = jsondata;
                        jsondata = $.parseJSON(jsondata.firstChild.textContent);
                        _action(jsondata);
                    }
                };
                setTimeout(function () {xdr.send();}, 0);
            } else {
                $.ajax({
                    type: 'GET',
                    url: url,
                    contentType: "application/json",
                    dataType: 'json',
                    success: function(data) {
                        if (data == "No indicator given") {
                            data = {};
                        }
                        self._url_data_cache[url] = data;
                        _action(data);
                    }
                });
            }
        } else {
            _action(self._url_data_cache[url]);
        }
    };

    this.delete_markers = function() {
        for (var i = 0; i < this.markers.length; i++) {
            this.map.removeLayer(this.markers[i]);
        }
    };



    this.draw_available_data_blocks = function(indicator_data) {
        $('.slider-year').removeClass('slider-active');

        $.each(this.active_years, function(yearkey, yearval){
            $("#year-" + yearkey).addClass("slider-active");
        });
    };

    this.move_slider_to_available_year = function() {
        var year = this.selected_year;
        if (year === null) {
            return;
        }

        $( "#map-slider-tooltip" ).val(year);
        $( "#map-slider-tooltip div" ).text(year.toString());
        $( ".slider-year").removeClass("active");
        $( "#year-" + year.toString()).addClass("active");
    };

    this.get_first_available_year = function() {
        var years = this.active_years;
        if (this.selected_year in years) {
            return this.selected_year;
        }
        for (var i = this.selected_year; i > 1949;i--) {
            if (i in years) {
                return i;
            }
        }

        for (var j = this.selected_year; j < 2100; j++) {
            if (j in years){
                return j;
            }
        }

        return null;
    };

    this.zoom_on_country = function() {
    };

}
OipaIndicatorMap.prototype = new OipaMap();

OipaIndicatorMap.prototype.clear_circles = function() {
    var self = this;
    $.each(this.locations, function(_, location) {
        location.clear();
    });
};

OipaIndicatorMap.prototype.get_active_years = function(data) {
    var years = {min: null, max: null};

    $.each(data, function(_, indicator) {
        if (typeof(indicator) == "string") {
            // do not continue if indicator is undefined
            return;
        }

        $.each(indicator.locs, function(_, loc) {
            var _years = Object.keys(loc.years);
            years.max = Math.max(years.max, Math.max.apply(null, _years));
            if (years.min === null) {
                years.min = _years[0];
            }
            years.min = Math.min(years.min, Math.min.apply(null, _years));
        });
    });

    var result = {};
    for (var i = years.min; i<=years.max; i++) {
        result[i] = i;
    }
    return result;
};

OipaIndicatorMap.prototype.get_max_indicator_value = function(indicator_data) {
    var max = null;
    $.each(indicator_data.locs, function(_, loc) {
        var loc_max = Math.max.apply(null, $.map(loc.years, function(value) {
            return value;
        }));

        if (max === null) {
            max = loc_max;
        }
        max = Math.max(max, loc_max);
    });
    return max;
};

OipaIndicatorMap.prototype.show_data_on_map = function(data) {
    var self = this;

    self.active_years = self.get_active_years(data);

    var last_year = Math.max.apply(null, $.map(self.active_years, function(y) {
        return parseInt(y);
    }));

    $.each(data, function(_, indicator_data) {
        var indicator_max = self.get_max_indicator_value(indicator_data);

        $.each(indicator_data.locs, function(_, location_data) {
            var latlng = L.latLng(location_data.latitude, location_data.longitude);
            if (self.locations[latlng] === undefined) {
                self.locations[latlng] = new OipaIndicatorLocation(
                    self,
                    location_data.id,
                    location_data.name,
                    latlng,
                    self.active_years);
                self.bounds.extend(latlng);
            }

            var location_type = 'country';
            if (location_data.country_id !== undefined) {
                location_type = 'city';
            }
            self.locations[latlng].set_type(location_type);

            self.locations[latlng].add_indicator_data(
                indicator_data.indicator,
                indicator_data.indicator_friendly,
                indicator_data.category,
                indicator_data.type_data,
                location_data.years,
                indicator_max
            );

            self.locations[latlng].set_year(last_year);
        });
    });


    if (self.use_fit_bounds) {

        return;
        self.map.fitBounds(self.bounds);
    }


    return;
};

OipaIndicatorMap.prototype.refresh_circles = function(year) {
    $.each(this.locations, function(_, location) {
        location.set_year(year);
    });
};

OipaIndicatorMap.prototype.refresh = function(data) {
    if (!data) {
        this.clear_circles();

        this.get_data(this.get_url());
    } else {
        // put data on map
        this.show_data_on_map(data);

        this.selected_year = this.get_first_available_year();
        // load timeline
        this.draw_available_data_blocks();
        this.move_slider_to_available_year(this.selected_year);

    }
};

OipaIndicatorMap.prototype.init = function() {
    var self = this;
    // set current year
    self.selected_year = 2015;
    $("#map-slider-tooltip div").html(self.selected_year);
    $("#map-slider-tooltip").val(self.selected_year);
    $("#year-" + self.selected_year).addClass("active");
};

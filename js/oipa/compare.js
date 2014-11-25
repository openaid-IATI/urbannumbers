var fav_alert_timeout;

var OipaCompare = {
    item1 : null,
    item2 : null,
    refresh_state : 0,
    refresh_comparison: function () {
        leftmap.map.setView(this.item1.latlng, 10);
        rightmap.map.setView(this.item2.latlng, 10);
        $("#compare-left-title").text(this.item1.name);
        $("#compare-right-title").text(this.item2.name);
    },

    get_from_href: function(key) {
        if (window.location.href.indexOf(key) == -1) {
            // No such key in href
            return;
        }

        var _val;
        $.each(window.location.href.split('?')[1].split('&'), function(_, i) {
            if (i.split('=')[0] == key) {
                if (i.split('=').length > 1) {
                    _val = i.split('=')[1];
                }
            }
        });
        return _val;
    },

    randomize: function(initial, reset) {
        // get cities
        var left_cities = [], right_cities = [];
        var city_id_1, city_id_2;

        if (initial !== undefined) {
            city_id_1 = this.get_from_href('left_cities');
            city_id_2 = this.get_from_href('right_cities');
        }
        if ($('#left-cities-select').get()[0] !== undefined) {
            left_cities = Object.keys($('#left-cities-select').get()[0]._options);
        }

        if ($('#right-cities-select').get()[0] !== undefined) {
            right_cities = Object.keys($('#right-cities-select').get()[0]._options);
        }

        if (city_id_1 == undefined) {
            // choose 2 random ones
            city_id_1 = get_random_city_within_selection(left_cities);
        }
        if (city_id_2 == undefined) {
            city_id_2 = get_random_city_within_selection(right_cities, city_id_1);
        }

        var city_1 = leftmap.set_city(city_id_1, 'left', '#left-countries-select');
        this.item1 = city_1;
        Oipa.mainSelection.left.cities = [{"id": city_1.id, "name": city_1.name}];

        var city_2 = rightmap.set_city(city_id_2, 'right', '#right-countries-select');
        this.item2 = city_2;

        Oipa.mainSelection.right.cities = [{"id": city_2.id, "name": city_2.name}];

        // Remove helper and refresh selects
        $('.left-countries-helper').fadeOut();

        $('#left-cities-select').val(city_1.id);
        $('#left-cities-select').attr('disabled', false);
        $('#left-cities-select').selectric('refresh');

        $('#right-cities-select').val(city_2.id);
        $('#right-cities-select').attr('disabled', false);
        $('#right-cities-select').selectric('refresh');

        $('#right-countries-select').attr('disabled', false);
        $('#right-countries-select').selectric('refresh');


        if (initial !== undefined || reset !== undefined) {
            this.create_visualisations();
        }

        filter.reload_specific_filter("indicators");
        if (initial == undefined) {
            filter.save(true);
        }
    },
    create_visualisations: function() {
        if (Oipa.mainSelection.indicators.length == 0) {
            Oipa.mainSelection.add_indicator("urban_population_cities", "Urban population – Countries", 'indicators');
            Oipa.mainSelection.add_indicator("avg_annual_rate_change_percentage_urban", "Urban population – Countries", 'indicators');
            Oipa.mainSelection.add_indicator("urban_population_share_national", "Urban population – Countries", 'indicators');
        }
        filter.save(true);
    }
}

function OipaCompareBarChart(id, options) {
    var self = this;
    OipaBarChart.call(self, id, options);

    self.get_locations_slice = function(locations, limit) {
        var _years = [];
        var _counter = 0;
        var _cities = self._initial_selection.left.cities.concat(self._initial_selection.right.cities);
        return [_years, $.map(_cities, function(_city) {
            var _default_color = "151,187,205";
            if (_counter == 1) {
                _default_color = "240,240,225";
            }
            _counter += 1;
            if (locations[_city.id] == undefined) {
                return;
            }

            return [{
                label: locations[_city.id].name,
                fillColor: (locations[_city.id].color == undefined) ? "rgba(" + _default_color + ",1)" : locations[_city.id].color,
                strokeColor: (locations[_city.id].stroke_color == undefined) ? "rgba(" + _default_color + ",2)" : locations[_city.id].stroke_color,
                pointColor: (locations[_city.id].color == undefined) ? "rgba(" + _default_color + ",1)" : locations[_city.id].color,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(" + _default_color + ",1)",
                data: $.map(locations[_city.id].years, function(v, y) {
                    if (_years.indexOf(y) == -1) {
                        _years.push(y);
                    }
                    return [v];
                })
            }];
        })];
    }
}
OipaCompareBarChart.prototype = Object.create(OipaBarChart.prototype);



$("#reset-compare-filters").click(function(e) {
    e.preventDefault();
    if ($(this).hasClass('btn-success')) {
        filter.reset_filters();
        $("#map-indicator-filter-wrapper .sort-list").toggle();
    }
});


$('.fav-alert').click(function(e) {
    clearTimeout(fav_alert_timeout);
    $(this).fadeOut();
});

$('.add-to-favorites').click(function(e) {
    e.preventDefault();
    clearTimeout(fav_alert_timeout);

    var _name_left = $('#left-cities-select option:selected').html();
    var _name_right = $('#right-cities-select option:selected').html()
    if (_name_left.indexOf('SELECT CITY') > -1 || _name_right.indexOf('SELECT CITY') > -1) {
        return;
    }

    $.ajax({
        type: "POST",
        url: vb_reg_vars.vb_ajax_url,
            data: {
            action: 'favorite_compare',
            cities: get_parameters_from_selection(filter.selection.get('cities')),
            countries: get_parameters_from_selection(filter.selection.get('countries')),
            indicators: get_parameters_from_selection(filter.selection.get('indicators')),
            names: _name_left + ' & ' + _name_right
        },
        success: function(data) {
            if (data.status == 'log_in_first') {
                display_login_form();
            }
            if (data.status == 'saved') {
                $('.fav-alert')
                    .removeClass('alert-danger')
                    .removeClass('alert-info')
                    .addClass('alert-success');

                $('.fav-alert').html("Saved!");
                $('.fav-alert').fadeIn();
                fav_alert_timeout = setTimeout(function() {
                    $('.fav-alert').fadeOut();
                }, 3000);
            }
            if (data.status == 'already_in_favorites') {
                $('.fav-alert')
                    .removeClass('alert-danger')
                    .removeClass('alert-success')
                    .addClass('alert-info');
                $('.fav-alert').html("Already saved!");
                $('.fav-alert').fadeIn();
                fav_alert_timeout = setTimeout(function() {
                    $('.fav-alert').fadeOut();
                }, 3000);
            }
        },
        error: function(xhr, status, e) {
            $('.fav-alert')
                .removeClass('alert-info')
                .removeClass('alert-success')
                .addClass('alert-danger');
            $('.fav-alert').html("Error occured, please try again later.");
            $('.fav-alert').fadeIn();
            fav_alert_timeout = setTimeout(function() {
                $('.fav-alert').fadeOut();
            }, 3000);
        },
        dataType: 'json'
    });
});

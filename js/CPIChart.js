function OipaCPIChart(id, options) {
    this._base_indicators = [
        "cpi_composite_street_connectivity_index",
        "cpi_environment_index",
        "cpi_equity_index",
        "cpi_infrastructure_index",
        "cpi_productivity_index",
        "cpi_quality_of_live_index"
    ];

    this.refreshed = false;
    this.original_data = undefined;

    OipaRadarChart.call(this, id, options);

    var _original_visualize = this.visualize;
    this.visualize = function(data) {
        var self = this;

        if (this.mutate_to_bar_chart) {
            return _original_visualize.apply(this, [data]);
        }

        if (data.cpi_6_dimensions !== undefined && data.cpi_6_dimensions.locs !== undefined) {
            if (Object.keys(data.cpi_6_dimensions.locs).length > 2) {
                this.mutate_to_bar_chart = true;
                return _original_visualize.apply(this, [data]);
            }
        }


        if (data.cpi_6_dimensions !== undefined && self.refreshed === false) {
            self.refreshed = true;
            self.refresh(undefined, true);
        }

        if (data.cpi_6_dimensions !== undefined) {
            self.original_data = data;
            return;
        }

        if (Object.keys(data).length === 0) {
            return _original_visualize.apply(this, [data]);
        }

        $("div.widget[data-indicator='" + self.indicator + "'] div.no_data").hide();
        $("div.widget[data-indicator='" + self.indicator + "'] canvas").show();

        var _colors = [
            '151,187,205',
            '240,240,225',
            '73, 99, 144',
            '163, 158, 146',
            '134, 84, 149',
            '86, 125, 130'
        ];

        var _get_datasets = function(cities, indicators) {
            var _indicator_slices = {};

            return $.map(cities, function(city) {

                var _default_color = _colors[cities.indexOf(city)];
                return {
                    label: "My First dataset",
                    fillColor: "rgba(" + _default_color + ",0)",
                    strokeColor: "rgba(" + _default_color + ",2)",
                    pointColor: "rgba(" + _default_color + ",1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(" + _default_color + ",1)",
                    data: $.map(indicators, function(indicator) {
                        if (_indicator_slices[indicator.id] === undefined) {
                            _indicator_slices[indicator.id] = self.get_year_slice(indicator.locs, self.selected_year, 10, true);
                        }

                        return $.map(_indicator_slices[indicator.id], function(a) {
                            if (a.id === parseInt(city)) {
                                return a.value;
                            }
                        });
                    })
                };
            });
        };

        var chart_data = {
            labels: $.map(data, function(indicator) {
                return indicator.indicator_friendly;
            }),
            datasets: _get_datasets(Object.keys(self.original_data[self.indicator].locs), data)
        };

        if (!self.chart) {
            var ctx = $("div.widget[data-indicator='" + self.indicator + "'] canvas").get(0);
            if (ctx === undefined) {
                return;
            }

            $(".heading-holder[data-indicator='" + self.indicator + "']").find('h3').each(function(_, node) {
                node.innerHTML = self.original_data[self.indicator].indicator_friendly;
            });

            self.chart_obj = new Chart(ctx.getContext("2d"));
            self.chart = self.init_chart(chart_data, {scaleShowLabels: true});
        }
    };



    return this;
}

OipaCPIChart.prototype = Object.create(OipaRadarChart.prototype);

OipaCPIChart.prototype.get_url = function() {
    if (this.selection === undefined) {
        return;
    }

    var str_city = get_parameters_from_selection(Oipa.mainSelection.get('cities', []));

    var _params = [
        'indicator-data/?format=json',
        'cities__in=' + str_city,
        'indicators__in=' + this._base_indicators.join(',')
    ];

    return search_url + _params.join('&');
};

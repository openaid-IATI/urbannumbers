function OipaNumChart(id, options) {
    this.type = 'OipaRadarChart';
    this.id = id;
    this.options = options;

    var _original_visualize = this.visualize;
    this.visualize = function(data) {
        var self = this;

        if (!data) {
            data = self.data;
        }

        if (!data || data[self.indicator] === undefined) {
            $("div.widget[data-indicator='" + self.indicator + "'] canvas").hide();
            $("div.widget[data-indicator='" + self.indicator + "'] div.no_data").show();
            return;
        }

        $("div.widget[data-indicator='" + self.indicator + "'] canvas").show();
        $("div.widget[data-indicator='" + self.indicator + "'] div.num").hide();

        self.type_data = data[self.indicator].type_data;

        chart_data = self.format_year_data(data[self.indicator], self.selected_year, 10);

        if (self.mutate_to_bar_chart) {
            return _original_visualize.apply(self, [data]);
        }

        $("div.widget[data-indicator='" + self.indicator + "'] div.no_data").hide();
        $("div.widget[data-indicator='" + self.indicator + "'] canvas").hide();

        $("div.widget[data-indicator='" + self.indicator + "'] div.num").show();
        var _div;
        if ($("div.widget[data-indicator='" + this.indicator + "'] div.num").get().length === 0) {
            _div = document.createElement('div');
            _div.className = 'num';
            $("div.widget[data-indicator='" + this.indicator + "']").get()[0].appendChild(_div);
        } else {
            _div = $("div.widget[data-indicator='" + this.indicator + "'] div.num").get()[0];
        }

        $(".heading-holder[data-indicator='" + self.indicator + "']").find('h3').each(function(_, node) {
            node.innerHTML = data[self.indicator].indicator_friendly;
        });


        _div.innerHTML = $.map(chart_data, function(_data) {
            if (_data.label !== 'Rest') {
                return "<b>" + self.format_static_num(_data.value) + '</b><br />' + _data.label;
            }
        });
        //_div.innerHTML = this.format_static_num(chart_data[0].value);
    };

    this.format_static_num = function(value) {
        var self = this;
        var tooltip = humanReadableSize(value, undefined, true);
        if (self.type_data === 'p') {
            tooltip = humanReadableSize(value);
        }
        if (self.type_data == '1000' || this.type_data == 'n') {
            tooltip = humanReadableSize(value, undefined, true, true);
        }
        if (self.indicator.substring(0, 4) == 'cpi_') {
            tooltip = humanReadableSize(value, undefined, true);
        }
        return tooltip;
    };

    var _original_format_year_data = this.format_year_data;
    this.basic_format_year_data = function(data, year, limit){
        var self = this;

        if (Object.keys(data.locs).length > 1) {
            self.mutate_to_bar_chart = true;
            return _original_format_year_data.apply(self, [data, year, limit]);
        }

        if (year === null) {
            year = self.get_last_data_year(data);
        }

        if (self.opt('all_years') && !self.opt('disable_all_years', true)) {
            return self.get_locations_slice(data.locs, year, limit);
        } else {
            var _chart_data =  $.map(self.get_year_slice(data.locs, year, limit), function(i, _) {
                var _color = (i.color === undefined ? self.getRandomColor() : i.color);
                var _stroke_color = (i.stroke_color === undefined ? _color : i.stroke_color);
                return {
                    value: i.value,
                    label: i.name,
                    color: _color,
                    stroke_color: _stroke_color,
                    highlight: _stroke_color
                };
            });

            if (_chart_data.length == 1) {
                var _value = _chart_data[0].value;
                var _multiply = 1;
                while (_value > 1) {
                    _value = _value / 10;
                    _multiply = _multiply * 10;
                }

                _chart_data.push({
                    value: (1 - _value) * _multiply,
                    label: "Rest",
                    color: "#e2e2e2",
                    stroke_color: "#e2e2e2",
                    highlight: "#e2e2e2"
                });
            }

            return _chart_data;
        }
    };

    this.format_year_data = function(data, year, limit) {
        var self = this;
        var chart_data;

        if (!self.mutate_to_bar_chart) {
            var _div;
            chart_data = self.basic_format_year_data(data, year, limit);
            if ($("div.widget[data-indicator='" + self.indicator + "'] div.num").get().length === 0) {
                _div = document.createElement('div');
                _div.className = 'num';
                $("div.widget[data-indicator='" + self.indicator + "']").get()[0].appendChild(_div);
            } else {
                _div = $("div.widget[data-indicator='" + this.indicator + "'] div.num").get()[0];
            }

            _div.innerHTML = $.map(chart_data, function(_data) {
                if (_data.label !== 'Rest') {
                    return "<b>" + self.format_static_num(_data.value) + '</b><br />' + _data.label;
                }
            });
        } else {
            chart_data = _original_format_year_data.apply(this, [data, year, limit]);
        }

        return chart_data;
    };

    return this;
}
//OipaNumChart.prototype = new OipaActiveRoundChart();


function numChartMutator(baseClass) {
    baseClass = (typeof baseClass === 'undefined') ? OipaBarChart : baseClass;

    OipaNumChart.prototype = new baseClass();
    return OipaNumChart;
}
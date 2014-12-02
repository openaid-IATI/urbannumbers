function OipaNumChart(id, options) {
    OipaActiveRoundChart.call(this, id, options);
    this.type = 'OipaRadarChart';

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
    this.format_year_data = function(data, year, limit) {
        var self = this;
        var chart_data = _original_format_year_data.apply(this, [data, year, limit]);

        if (!self.mutate_to_bar_chart) {
            var _div;
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
        }

        return chart_data;
    };

    return this;
}
OipaNumChart.prototype = Object.create(OipaActiveRoundChart.prototype);

function OipaNumChart(id, options) {
    OipaActiveRoundChart.call(this, id, options);
    this.type = "OipaRadarChart";

    var _original_init_chart = this.init_chart;
    this.init_chart = function(chart_data) {
        if (this.mutate_to_bar_chart) {
            return _original_init_chart.apply(this, [chart_data]);
        }

        var _div;
        if ($("div.widget[data-indicator='" + this.indicator + "'] div.num").get().length === 0) {
            _div = document.createElement('div');
            _div.className = 'num';
            $("div.widget[data-indicator='" + this.indicator + "']").get()[0].appendChild(_div);
        } else {
            _div = $("div.widget[data-indicator='" + this.indicator + "'] div.num").get()[0];
        }

        _div.innerHTML = chart_data[0].value;
        $("div.widget[data-indicator='" + this.indicator + "'] canvas").hide();

        var _human_readable = "<%= humanReadableSize(value) %>";
        if (this.indicator.substring(0, 4) == 'cpi_') {
            _human_readable = "<%= humanReadableSize(value, undefined, true) %>";
        }

        return this.chart_obj.Pie(chart_data, this.get_chart_options({
                tooltipTemplate: "<%=label%>: " + _human_readable,
                multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%>" + _human_readable
            }));
    };

    var _original_format_year_data = this.format_year_data;
    this.format_year_data = function(data, year, limit) {
        var chart_data = _original_format_year_data.apply(this, [data, year, limit]);

        if (!this.mutate_to_bar_chart) {
            var _div;
            if ($("div.widget[data-indicator='" + this.indicator + "'] div.num").get().length === 0) {
                _div = document.createElement('div');
                _div.className = 'num';
                $("div.widget[data-indicator='" + this.indicator + "']").get()[0].appendChild(_div);
            } else {
                _div = $("div.widget[data-indicator='" + this.indicator + "'] div.num").get()[0];
            }

            _div.innerHTML = chart_data[0].value;
        }

        return chart_data;
    };

    return this;
}
OipaNumChart.prototype = Object.create(OipaActiveRoundChart.prototype);

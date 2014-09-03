function OipaIndicatorWidget(indicator, callback) {
    this.country = null;
    this.year_changed = function(year) {
        var value = 0;
        if (this.country == null) {
            $.each(map.circles.locations, function(key, indicators) {
                if (indicators[indicator] !== undefined && indicators[indicator].years[year] !== NaN) {
                    value += indicators[indicator].years[year];
                }
            });
        }
        callback(value);
    }
}

function OipaTopIndicatorWidget(selector, indicator, limit) {
    var self = this;
    self.indicator = indicator;
    self.limit = limit;
    self.chart;

    self.top_locations = function(locations, year, limit) {
        var _mapped = $.map(locations, function(i, _) {
            if (i[self.indicator]) {
                return [{
                    value: i[self.indicator].years[year],
                    id: i.countryname
                }];
            }
            return [];
        });
        _mapped.sort(function(a, b) {
            return a.value < b.value ? -1 : (a.value > b.value ? 1 : 0);
        });
        _mapped.reverse();
        return _mapped.slice(0, limit);
    }
    
    self.display = function(data) {
        if (data[0].value !== undefined) {
            if (self.chart == undefined) {
                var cdata = {
                    labels: $.map(data, function(i, v) { return i.id;}),
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: $.map(data, function(i, v) { return Intl.NumberFormat().format(i.value.toFixed(3));})
                        }
                    ]
                };

                // init chart
                var ctx = $(selector + "_chart").get(0).getContext("2d");
                self.chart = new Chart(ctx).Bar(cdata);
            } else {
                // Update chart
                $.each(self.chart.datasets[0].bars, function(id, v) {
                    self.chart.scale.xLabels[id] = data[id].id;
                    self.chart.datasets[0].bars[id].value = data[id].value;
                });
                self.chart.update()
            }
        }
    }
    
    self.year_changed = function(year) {
        // set widget title
        $(selector).find('.heading-holder > h3').html(map.circles.indicators[self.indicator].description);

        var _top = this.top_locations(map.circles.locations, year, self.limit);
        self.display(_top);
    }
}
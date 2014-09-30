
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
                _default_color = "220,220,220";
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
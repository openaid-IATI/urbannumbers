function OipaWheelChart(id, options) {
    var self = this;
    self.year = 2012;
    OipaRadarChart.call(self, id, options);

    self.get_url = function() {
        var _url = search_url + 'indicator-data/?format=json';
        var _url_data = {
            cities__in: self._initial_selection.left.cities.concat(self._initial_selection.right.cities),
            indicators__in: self._initial_selection.indicators
        }

        return _url + '&' + $.map(_url_data, function(value, key) {
            return key + '=' + $.map(value, function(a, _) { return a.id; }).join(',');
        }).join('&');
    }

    self.create_html_skeleton = function() {
        // Register event in event bus
        OipaWidgetsBus.add_listener(self);

        // create html
        var html = '<li id="visualization_' + self.indicator + '">';
        html += '<section class="container-box" data-vis-type="'+self.type+'" data-indicator="'+self.indicator+'">';
        html += '<div class="box-content">';
        html +=  '<div id="legend"></div>'
        html +=  '<div class="widget" data-indicator="'+self.indicator+'">';
        html +=    '<canvas height="900" width="900"></canvas>';
        html +=  '</div>';

        html += '</div></section></li>';

        $(self.chartwrapper).append(html);
    }

    this.get_last_data_year = function(data, city) {
        if (data.locs[city] == undefined) {
            return '';
        }
        return Math.max.apply(null, $.map(
            Object.keys(data.locs[city].years),
            function(i) {
                return parseInt(i);
            }
        ));
    }

    self.visualize = function(data) {
        var _keys = Object.keys(data);
        var _cities = self._initial_selection.left.cities.concat(self._initial_selection.right.cities);

        if (_keys.length == 0) {
            return;
        }

        var chart_data = {
            labels: $.map(_keys, function(key) {
                return data[key].indicator_friendly;
            }),
            datasets: $.map(_cities, function(city, num) {
                var _color = num ? "220,220,220" : "151,187,205";
                var _label = data[_keys[0]].locs[city.id].name;
                if (self.get_last_data_year(data[_keys[0]], city.id) !== '') {
                    _label += ' (' + self.get_last_data_year(data[_keys[0]], city.id) + ')';
                }
                return {
                    label: _label,
                    fillColor: "rgba(" + _color + ",0.2)",
                    strokeColor: "rgba(" + _color + ",1)",
                    pointColor: "rgba(" + _color + ",1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(" + _color + ",1)",
                    data: $.map(_keys, function(key) {
                        var _year = self.get_last_data_year(data[key], city.id);
                        if (_year == '') {
                            _year = self.year;
                        }
                        if (data[key].locs[city.id] == undefined || data[key].locs[city.id].years[_year] == undefined) {
                            return 0;
                        }
                        return data[key].locs[city.id].years[_year];
                    })
                };
            })
        };

        var ctx = $("div.widget[data-indicator='" + self.indicator + "'] canvas").get(0);
        //
        // $(".heading-holder[data-indicator='" + self.indicator + "']").find('h3').each(function(_, node) {
        //     node.innerHTML = data.indicator_friendly;
        // });

        self.chart_obj = new Chart(ctx.getContext("2d"));
        self.chart = self.init_chart(chart_data);
        $("#legend").append(self.chart.generateLegend());
    }

    this.init_chart = function(chart_data) {
        return this.chart_obj.Radar(chart_data, {
            tooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>",
            multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>"
        });
    }

    
    return self;
}
OipaWheelChart.prototype = Object.create(OipaRadarChart.prototype);


function OipaCitiesWheelChart(id, options) {
    OipaWheelChart.call(this, id, options);
}
OipaCitiesWheelChart.prototype = Object.create(OipaWheelChart.prototype);


function patch_oipa(oipa, chart_class) {
    chart_class = chart_class == undefined ? OipaCitiesWheelChart : chart_class;
    var _old_create_visualisations = oipa.create_visualisations;

    oipa.create_visualisations = function(forced_chart_class) {
        var thisoipa = this;
        data = this.mainSelection.indicators;
        //data = this.clean_blank_visualisations(data);

        var chart_id = 'wheel';

        if (thisoipa.visualisations[chart_id] == undefined) {
            thisoipa.visualisations[chart_id] = new chart_class(chart_id);
            thisoipa.visualisations[chart_id]._initial_selection = thisoipa.mainSelection;
            thisoipa.visualisations[chart_id].selection = new OipaIndicatorSelection();
            thisoipa.visualisations[chart_id].selection.cities = thisoipa.mainSelection.cities;
            thisoipa.visualisations[chart_id].selection.countries = thisoipa.mainSelection.countries;
            thisoipa.visualisations[chart_id].selection.regions = thisoipa.mainSelection.regions;
            thisoipa.visualisations[chart_id].selection.indicators.push({"id": chart_id, "name": chart_id, "type": chart_id});
            thisoipa.visualisations[chart_id].indicator = chart_id;
            thisoipa.visualisations[chart_id].name = chart_id;
            thisoipa.visualisations[chart_id].y_name = chart_id;
            thisoipa.visualisations[chart_id].y_format = d3.format(',r');
            thisoipa.visualisations[chart_id].x_name = 'Time (Years)';
            thisoipa.visualisations[chart_id].x_format = d3.format('r');
            thisoipa.visualisations[chart_id].init();
        } else {
            thisoipa.visualisations[chart_id].selection.cities = thisoipa.mainSelection.cities;
            thisoipa.visualisations[chart_id].selection.countries = thisoipa.mainSelection.countries;
            thisoipa.visualisations[chart_id].selection.regions = thisoipa.mainSelection.regions;
            thisoipa.visualisations[chart_id].refresh();
        }
        return;
    }
}

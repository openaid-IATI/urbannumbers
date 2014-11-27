function OipaCountry() {
    this.id = null;
    this.name = null;
    this.latlng = null;
    this.cities = null;
    this.capital_city = null;
    this.region_id = null;
    this.polygon = null;
    this.center_longlat = null;
    var thiscountry = this;

    this.get_data = function(data, map_left_right){

        this.name = data.objects[0].name;
        this.latlng = geo_point_to_latlng(data.objects[0].location);

        if(map_left_right == "left"){
            OipaCompare.item1 = this;
            get_wiki_city_data(this.name, "left");
        } else if (map_left_right == "right"){
            OipaCompare.item2 = this;
            get_wiki_city_data(this.name, "right");
        }

        OipaCompare.refresh_state++;

        if (OipaCompare.refresh_state > 1){
            OipaCompare.refresh_state = 0;
            // refresh map
            OipaCompare.refresh_comparison();
        }
    };

    this.set_data = function() {

        url = search_url + "countries/"+this.id+"/?format=json";

        jQuery.support.cors = true;

        jQuery.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                thiscountry.name = data.name;
                thiscountry.capital_city = data.capital_city;
                thiscountry.cities = data.cities;
                thiscountry.region_id = data.region_id;
                if (data.polygon !== "") {
                    thiscountry.polygon = JSON.parse(data.polygon);
                }
                thiscountry.center_longlat = geo_point_to_latlng(data.center_longlat);

                thiscountry.init_country_page();
            }
        });
    };


    this.get_cities_within_country = function() {
        //return;
        // This might get really slow when we add more data (it loads all indicator data from the country)
        // TO DO: add functionality to only get Urbnrs data from the indicator-data call -> &categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity
        // this func is in indicator-filter-options already.
        url = search_url + "indicator-data/?format=json&countries__in=" + thiscountry.id;
        //url += '&indicators__in=cpi_4_dimensions,total_length_road'

        jQuery.support.cors = true;

        jQuery.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                thiscountry.cities = {};
                thiscountry.locations = {};
                map.show_data_on_map(data);
                // //
                // // // loop through indicators and get city id, name, latitude, longitude
                // // var years = {min: null, max: null};
                // // $.each(data, function(_, indicator) {
                // //     if (typeof(indicator) == "string") {
                // //         // do not continue if indicator is undefined
                // //         return;
                // //     }
                // //
                // //     var indicator_max = map.get_max_indicator_value(indicator);
                // //
                // //     $.each(indicator.locs, function(_, location_data) {
                // //         var latlng = L.latLng(location_data.latitude, location_data.longitude);
                // //
                // //         if (thiscountry.locations[latlng] === undefined) {
                // //             thiscountry.locations[latlng] = new OipaIndicatorLocation(
                // //                 map,
                // //                 location_data.id,
                // //                 location_data.name,
                // //                 latlng,
                // //                 map.active_years);
                // //             map.bounds.extend(latlng);
                // //         }
                // //
                // //         var location_type = 'country';
                // //         if (location_data.country_id !== undefined) {
                // //             location_type = 'city';
                // //         }
                // //         thiscountry.locations[latlng].set_type(location_type);
                // //
                // //         thiscountry.locations[latlng].add_indicator_data(
                // //             indicator.indicator,
                // //             indicator.indicator_friendly,
                // //             indicator.category,
                //         //     indicator.type_data,
                //         //     location_data.years,
                //         //     indicator_max
                //         // );
                //
                //         //thiscountry.locations[latlng].set_year(last_year);
                //         //
                //         /*if (!(loc.id in thiscountry.cities) && !(isNaN(loc.id))) {
                //             thiscountry.cities[loc.id] = {"id": loc.id, "name": loc.name, "latitude": loc.latitude, "longitude": loc.longitude};
                //
                //             // show cities in country as circle with orange color, capital city as green color
                //             color = "#008b85";
                //             radius = 30000;
                //             opacity = 0.7;
                //             if (thiscountry.capital_city !== null && loc.name == thiscountry.capital_city.name){
                //                 color = "#f06002";
                //                 radius = 50000;
                //                 opacity = 0.9;
                //             }
                //
                //             var circle = L.circle([loc.latitude, loc.longitude], radius, {
                //                     color: "#666",
                //                     weight: '0.5',
                //                     fillColor: color,
                //                     fillOpacity: opacity
                //             }).bindPopup('<a href="/compare-cities/city-pages/?cities='+loc.id+'"><h4>'+loc.name+'</h4></a>').addTo(map.map);
                //
                //         }*/
                //
                //     });
                // });
            }
        });
    };

    this.get_markers_bounds = function() {
        var minlat,
            maxlat,
            minlng,
            maxlng,
            first = true;

        if (this.polygon == undefined) {
            return [];
        }

        var _get_max_min = function(coordinate, min, max) {
            min = min !== undefined ? min : coordinate;
            max = max !== undefined ? max : coordinate;
            return [Math.min(coordinate, min), Math.max(coordinate, max)];
        }

        for (var i = 0; i < this.polygon.coordinates.length; i++) {
            for (var y = 0; y < this.polygon.coordinates[i].length; y++) {
                if (this.polygon.coordinates[i][y].length == 0) {
                    continue;
                }
                if (typeof(this.polygon.coordinates[i][y][0]) == 'number') {
                    var _tmp = _get_max_min(this.polygon.coordinates[i][y][1], minlat, maxlat);
                    minlat = _tmp[0], maxlat = _tmp[1];
                    var _tmp = _get_max_min(this.polygon.coordinates[i][y][0], minlng, maxlng);
                    minlng = _tmp[0], maxlng = _tmp[1];
                } else {
                    for (var x  =0; x < this.polygon.coordinates[i][y].length; x++) {
                        var _tmp = _get_max_min(this.polygon.coordinates[i][y][x][1], minlat, maxlat);
                        minlat = _tmp[0], maxlat = _tmp[1];
                        var _tmp = _get_max_min(this.polygon.coordinates[i][y][x][0], minlng, maxlng);
                        minlng = _tmp[0], maxlng = _tmp[1];
                    }
                }
            }
        }
        return [[minlat, minlng],[maxlat, maxlng]];
    }

    this.init_country_page = function() {
        // use polygon to get outter bounds -> to zoom in
        map.map.setView(this.center_longlat);
        var bounds = this.get_markers_bounds();
        if (bounds.length !== 0) {
            setTimeout(function() {map.map.fitBounds(bounds);}, 500);
        } else {
            map.map.setZoom(6);
        }
        // set country name
        jQuery("#horizontal_vis_block_name").text(this.name);


        // cities
        this.get_cities_within_country();
    }

    this.refresh_data = function(data) {
        this.update_population(map.selected_year, 'urban_population_countries', '#horizontal_vis_block_year_ind_3_value');
        this.update_population(map.selected_year, 'urban_slum_population_countries', '#horizontal_vis_block_year_ind_4_value');
        this.update_population(map.selected_year, 'rural_population', '#horizontal_vis_block_year_ind_5_value');
        this.update_population(map.selected_year, 'population', '#horizontal_vis_block_year_ind_6_value');

        this.update_population(map.selected_year, 'total_length_road', '#horizontal_vis_block_chart_road');
        this.update_population(map.selected_year, 'income_gini_coefficient_countries', '#horizontal_vis_block_gini');
    }

    this.year_changed = function(year) {
        $("#horizontal_vis_block_year").html(year);

        this.update_population(year, 'urban_population_countries', '#horizontal_vis_block_year_ind_3_value');
        this.update_population(year, 'urban_slum_population_countries', '#horizontal_vis_block_year_ind_4_value');
        this.update_population(year, 'rural_population', '#horizontal_vis_block_year_ind_5_value');
        this.update_population(year, 'population', '#horizontal_vis_block_year_ind_6_value');

        this.update_population(year, 'total_length_road', '#horizontal_vis_block_chart_road');
        this.update_population(year, 'income_gini_coefficient_countries', '#horizontal_vis_block_gini');
    }

    this.update_population = function(year, type, selector, data) {
        var self = this;

        $(selector).html("N/A");

        if (data === undefined) {
            $.each(map.locations, function(_, location) {
                if (location.id == self.id && location.circles[type] !== undefined) {
                    var _value = location.circles[type].get_value() * 1000;
                    $(selector).html(humanReadableSize(_value));
                }
            });
        } else {
            console.log(data);
        }
    };
}



OipaCountryPieInfographicsVis = function(indicator, options) {
    var self = this;

    OipaPieInfographicsVis.call(self, indicator, 1, options);

    this.create_html_skeleton = function() {
        // Register event in event bus
        OipaWidgetsBus.add_listener(this);
        return;
    };


    self.normalize_data_for_pie = function(chart_data, chart_id) {
        var _data = [jQuery.extend({}, chart_data[chart_id])];
        _data[0].value = parseFloat(chart_data[chart_id].value) / self.opt('divide_by', 1000);

        _data.push({
            value: 1 - _data[0].value,
            label: "empty",
            color: self.opt('color', '#00AAB0'),
            stroke_color: "#767D91",
            highlight: "#767D91"
        });

        return _data;
    }

    self.get_year_slice = function(locations, year, limit) {
        // Get last year slice if year is null
        year = (year == null ? 2014 : year);

        return $.map(locations, function(i) {
            return [{
                value: i.years[year],
                color: i.color,
                stroke_color: i.stroke_color,
                name: i.name
            }];
        });
    }

    self.visualize_chart = function(chart_data, chart_id) {
        var _transform_func = self.opt("overlay_transform", function(chart_id_data) {
            return chart_id_data.value;
        });

        if (self.charts[chart_id] == undefined) {
            var holder = document.createElement("div");
            holder.className = "column";

            holder.ctx = $(self.chartwrapper + " #" + self.indicator + "_canvas").get()[0];
            holder.overlay = $(self.chartwrapper + " .info-overlay").get()[0];
            holder.overlay.innerHTML = _transform_func(chart_data[chart_id]);

            self.charts[chart_id] = {
                obj: new Chart(holder.ctx.getContext("2d")),
                holder: holder,
                chart: null
            }
            self.charts[chart_id].chart = self.init_chart(chart_data, chart_id);
        } else {
            if (chart_data.labels == undefined && chart_data[0].value !== undefined) {
                self.charts[chart_id].chart.destroy();
                self.charts[chart_id].chart = self.init_chart(chart_data, chart_id);

                //self.charts[chart_id].holder.label.innerHTML = chart_data[chart_id].label;
                self.charts[chart_id].holder.overlay.innerHTML = _transform_func(chart_data[chart_id]);
            }
        }
    }

    return self;
}
OipaCountryPieInfographicsVis.prototype = Object.create(OipaPieInfographicsVis.prototype);


function OipaCountryPieChart(id, options) {
    var self = this;
    OipaBarChart.call(self, id, options);

    /*self.format_year_data = function(data, year, limit) {
        if (year == null) {
            year = self.get_last_data_year(data);
        }

        if (self.opt('all_years')) {
            return self.get_locations_slice(data.locs, year, limit);
        } else {
            var data_slice = self.get_year_slice(data.locs, year, limit);
            return $.map(data_slice, function(i, _) {
                var _color = (i.color==undefined ? self.getRandomColor() : i.color);
                var _stroke_color = (i.stroke_color==undefined?_color:i.stroke_color);
                return {
                    value: i.value,
                    label: i.name,
                    color: _color,
                    stroke_color: _stroke_color,
                    highlight: _stroke_color
                };
            });
        }
    }*/
}
OipaCountryPieChart.prototype = Object.create(OipaBarChart.prototype);

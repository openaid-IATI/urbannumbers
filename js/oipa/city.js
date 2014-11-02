function OipaCity(city_id, map, side) {
    var self = this;
    self.map = map;
    self.side = side;
    self.id = city_id;
    self.name = '';
    self.city_id = city_id;
    self.country_id = null;
    self.data = undefined;
    self.city_data = undefined;
    self.year = 2014;

    self.init = function() {
        self.set_city_data();
    }

    self.set_city_data = function() {

        url = search_url + "cities/" + self.city_id + "/?format=json";

        jQuery.support.cors = true;
        jQuery.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                $('.horizontal_vis_block_name').html(data.ascii_name);

                self.country_id = data.country;
                get_wiki_city_data(data.ascii_name, self.side);
                self.name = data.ascii_name;
                $('#compare-' + self.side + '-map-border .text-box').show();

                self.location = geo_point_to_latlng(data.location);

                /*var circle = L.circle(self.location, 3000, {
                        color: "#666",
                        weight: '0.5',
                        fillColor: "#008b85",
                        fillOpacity: 0.7
                }).addTo(map.map);*/
                self.map.map.setZoomAround(self.location, 8);
            }
        });
    };

    self.year_changed = function(year) {
        self.year = year;
        $('.horizontal_vis_block_year').html(self.year);
    }

    self.update_indicator = function(data, id) {
        var _data = "No data available";
        if (data[id] !== undefined
            && data[id].locs[self.city_id] !== undefined 
            && data[id].locs[self.city_id].years[self.year] !== undefined
        ) {
            _data = data[id].locs[self.city_id].years[self.year];
        }
        $("#" + id + "_data").html(_data);
    }

    self.refresh_data = function(data) {
        if (data == undefined) {
            data = self.data;
        }

        if (data == undefined) {
            return;
        }

        $.each(['cpi_4_dimensions', 'slum_proportion_living_urban', 'land_allocated_to_street_index_city_core'], function(_, id) {
            self.update_indicator(data, id);
        });


        console.log(data);
        if (data.urban_population_cities !== undefined
            && data.urban_population_cities.locs[self.city_id] !== undefined
            && data.urban_population_cities.locs[self.city_id].years[self.year] !== undefined) {
            var _number = data.urban_population_cities.locs[self.city_id].years[self.year];
            if (data.urban_population_cities.type_data == '1000') {
                _number = _number * 1000;
            }
            $('.horizontal_vis_block_population').html(humanReadableSize(_number));
        } else {
            $('.horizontal_vis_block_population').html("Not available");
        }
    }


    self.init();
}

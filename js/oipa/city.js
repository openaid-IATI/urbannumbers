function OipaCity(city_id) {
    var self = this;
    self.city_id = city_id;
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

                self.location = geo_point_to_latlng(data.location);

                var circle = L.circle(self.location, 3000, {
                        color: "#666",
                        weight: '0.5',
                        fillColor: "#008b85",
                        fillOpacity: 0.7
                }).addTo(map.map);
                map.map.setZoomAround(self.location, 8);
            }
        });
    };

    self.year_changed = function(year) {
        self.year = year;
        $('.horizontal_vis_block_year').html(self.year);
    }
    self.refresh_data = function(data) {
        if (data == undefined) {
            data = self.data;
        }

        if (data == undefined) {
            return;
        }

        console.log(data);
        if (data.urban_population_cities.locs[self.city_id] !== undefined
            && data.urban_population_cities.locs[self.city_id].years[self.year] !== undefined) {
            $('.horizontal_vis_block_population').html(humanReadableSize(data.urban_population_cities.locs[self.city_id].years[self.year]));
        } else {
            $('.horizontal_vis_block_population').html("Not available");
        }
    }


    self.init();
}



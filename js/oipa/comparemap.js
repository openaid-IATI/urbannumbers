function OipaCompareMap(use_legend) {
    OipaMap.call(this, use_legend);

    this.refresh = function(data) {
        if (!data) {
            if (this.compare_left_right == "left" && (filter.selection.left.cities.length > 0)) {
                this.set_city(filter.selection.left.cities[0].id, this.compare_left_right);
            }
            if (this.compare_left_right == "right") {

                if (filter.selection.right.cities.length > 0) {
                    this.set_city(filter.selection.right.cities[0].id, this.compare_left_right);
                }

                if (filter.selection.left.cities.length > 0 && filter.selection.right.cities.length > 0) {
                    //Oipa.refresh();
                    //filter.save();
                }
            }
        } else {
            this.show_data_on_map(data);
        }
    }

    this.set_city = function(city_id, side) {
        return new OipaCity(city_id, this, side);
    }

}
OipaCompareMap.prototype = Object.create(OipaMap.prototype);

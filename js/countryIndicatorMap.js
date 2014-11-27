function CountryIndicatorMap(use_legend) {
}
CountryIndicatorMap.prototype = new OipaIndicatorMap();

CountryIndicatorMap.prototype.refresh = function(data) {
    if (!data) {
        //this.clear_circles();

        this.get_data(this.get_url());
    } else {
        // put data on map
        //this.show_data_on_map(data);

        this.selected_year = this.get_first_available_year();

        // load timeline
        this.draw_available_data_blocks();
        this.move_slider_to_available_year(this.selected_year);

    }
};

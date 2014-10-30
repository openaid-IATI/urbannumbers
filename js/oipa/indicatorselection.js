function OipaIndicatorSelection(main){
    var self = this;
    self.cities = [];
    self.countries = [];
    self.regions = [];
    self.indicators = [];
    self.indicator_options = {};
    self.url = null;

    if (main){
        self.url = new OipaUrl(self);
    }

    self.update_selection = function(type, id, i_name, i_type, options) {
        var _found = false;
        $.each(self[type], function(i, indicator) {
            if (indicator.id == id) {
                _found = true;
            }
        });
        options = options !== undefined ? options : self.indicator_options;

        if (!_found) {
            self[type].push({
                id: id,
                name: i_name,
                type: i_type,
                options: options
            });
        }
    }

    self.clean = function(type) {
        self[type] = [];
    }

    self.remove_from_selection = function(type, id) {
        var _tmp = self[type].slice(0);

        var _found = -1;
        $.each(self[type], function(i, indicator) {
            if (indicator.id == id) {
                _found = i;
            }
        });

        if (_found !== -1) {
            _tmp.splice(_found, 1);
        }
        return _tmp;
    }

    self.add_indicator = function(id, i_name, i_type, options) {
        self.update_selection('indicators', id, i_name, i_type, options);
    }
}

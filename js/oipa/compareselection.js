function OipaCompareSelection(main){
    var self = this;
    self.left = [];
    self.left.cities = [];
    self.left.countries = [];
    self.left.regions = [];
    self.left.indicators = [];

    self.right = [];
    self.right.cities = [];
    self.right.countries = [];
    self.right.regions = [];
    self.right.indicators = [];

    self.indicators = [];
    self.indicator_options = {};
    self.url = new OipaUrl(self);

    var _original_update_selection = self.update_selection;
    self.update_selection = function(type, id, i_name, i_type, options) {
        var _found = false;
        if (type == 'indicators') {
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
        } else {
            var _type = type.split('_');
            var side = 'left';
            if (_type.length > 1) {
                side = _type[0];
                type = _type[1];
            }

            $.each(self[side][type], function(i, indicator) {
                if (indicator.id == id) {
                    _found = true;
                }
            });

            options = options !== undefined ? options : self.indicator_options;

            if (!_found) {
                self[side][type].push({
                    id: id,
                    name: i_name,
                    type: i_type,
                    options: options
                });
            }
        }
    }

    self.get_side = function(side, option, default_value) {
        default_value = (default_value == undefined) ? [] : default_value;
        if (self[side] == undefined || self[side][option] == undefined) {
            return default_value;
        }
        return self[side][option];
    }

    self.get = function(option, default_value) {
        default_value = (default_value == undefined) ? [] : default_value;
        if (['regions', 'countries', 'cities'].indexOf(option) !== -1) {
            return self.get_side('left', option, []).concat(self.get_side('right', option, []));
        }
        return (self[option] == undefined) ? default_value : self[option];
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

    self.add_indicator = function(id, name, itype, options) {
        self.update_selection('indicators', id, name, itype, options);
    }
}
OipaCompareSelection.prototype = new OipaIndicatorSelection();

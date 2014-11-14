OipaIndicatorLocation = function(map, id, name, latlng, active_years) {
    this.map = map;
    this.id = id;
    this.name = name;
    this.latlng = latlng;
    this.active_years = active_years;
    this.type = undefined;

    this.circles = {};
}

OipaIndicatorLocation.prototype.add_indicator_data = function(id, name, category, type_data, years, max_value) {
    if (this.circles[id] == undefined) {
        var color = 'rgb(' + oipa_get_color(category) + ')';
        this.circles[id] = new OipaIndicatorCircle(this, id, name, type_data, color, 0.6);
    }
    this.circles[id].set_data(this.mutate_years(years), max_value);
}

OipaIndicatorLocation.prototype.set_type = function(type) {
    this.type = type;
}

OipaIndicatorLocation.prototype.set_year = function(year) {
    $.each(this.circles, function(id, circle) {
        circle.set_year(year);
    });

    this.update_popup_content();
}

OipaIndicatorLocation.prototype.refresh = function() {
    $.each(this.circles, function(_, circle) {
        circle.refresh();
    });
}

OipaIndicatorLocation.prototype.update_popup_content = function () {
    var base_url = '/compare-cities/country-pages/?countries=' + this.id;
    if (this.type == 'city') {
        base_url = '/compare-cities/city-pages/?cities=' + this.id;
    }
    var content = [
        "<div class='title'><a href='" + base_url + "'>" + this.name + "</a></div>",
    ];
    var _even_odd = '';
    var count = 0;
    $.each(this.circles, function(_, circle) {
        if (count > 10) {
            return;
        }
        content.push('<div class="line ' + _even_odd + '">' + circle.name + ': ' + circle.get_human_friendly_value() + '</div>');
        if (_even_odd == '') {
            _even_odd = 'odd';
        } else {
            _even_odd = '';
        }
        count++;
    });

    content.push('<div class="line last"><a href="' + base_url + '">Visit ' + this.type + ' page <i class="glyphicon glyphicon-play"></i></a></div>');
    content = content.join('');
    $.each(this.circles, function(_, circle) {
        circle.set_popup(content);
    });
}

OipaIndicatorLocation.prototype.clear = function() {
    $.each(this.circles, function(_, circle) {
        circle.destroy();
    });
    this.circles = {};
}

OipaIndicatorLocation.prototype.mutate_years = function(years) {
    var year_keys = Object.keys(years);

    // Fill gaps in between years
    if (year_keys.length > 1) {
        for (var i = 0; i < year_keys.length - 1; i++) {
            var this_year = parseInt(year_keys[i]);
            var next_year = parseInt(year_keys[i + 1]);

            if ((next_year - this_year) > 1) {
                var yearly_trend = (years[next_year] - years[this_year]) / (next_year - this_year);

                var year_value = years[this_year];
                for (var year = this_year + 1; year < next_year; year++) {
                    year_value = year_value + yearly_trend;
                    years[year] = year_value;
                }
            }
        }
    }

    // Prefill missing years from other indicators
    var _ = {
        min_years:  Math.min.apply(null, Object.keys(years)),
        max_years:  Math.max.apply(null, Object.keys(years)),
        min_active: Math.min.apply(null, Object.keys(this.active_years)),
        max_active: Math.max.apply(null, Object.keys(this.active_years)),
    };

    if (_.min_years > _.min_active) {
        for (i = _.min_active; i < _.min_years; i++) {
            years[i] = years[_.min_years];
        }
    }

    if (_.max_years < _.max_active) {
        for (i = _.max_years + 1; i <= _.max_active; i++) {
            years[i] = years[_.max_years];
        }
    }

    return years;
}

OipaIndicatorCircle = function(location, id, name, type_data, color, opacity) {
    this.location = location;
    this.data = {};
    this.id = id;
    this.name = name;
    this.type_data = type_data;
    this.color = color;
    this.opacity = opacity;

    this.max_radius = 100000;

    this.year = undefined;
    this.max_value = undefined;
    this.circle = undefined;
}

OipaIndicatorCircle.prototype.set_data = function(data, max_value) {
    this.data = data;
    this.max_value = max_value;
};

OipaIndicatorCircle.prototype.set_year = function(year) {
    this.year = year;
    this.refresh();
}

OipaIndicatorCircle.prototype.set_popup = function(content) {
    this.circle.bindPopup(content);
}

OipaIndicatorCircle.prototype.get_human_friendly_value = function() {
    var value = this.get_value();
    if (value === undefined){
        value = "Not available for " + self.year;
    } else {
        value = parseFloat(value, 1);
        if (this.type_data == "1000") {
            value = humanReadableSize(value * 1000);
        }

        if (this.type_data == "p") {
            value = humanReadableSize(value, []);
        }
    }
    return value;
}

OipaIndicatorCircle.prototype.get_value = function() {
    return this.data[this.year];
}

OipaIndicatorCircle.prototype.refresh = function() {
    if (this.circle == undefined) {
        this.circle = L.circle(this.location.latlng, 1, {
            color: this.color,
            weight: '2',
            fillColor: this.color,
            fillOpacity: this.opacity
        })
        .setRadius(1000)
        .addTo(this.location.map.map);
    }

    var radius = (Math.round(this.max_radius / this.max_value) * this.get_value()) * (10 / this.location.map.map.getZoom());
    if (!isNaN(radius)) {
        this.circle.setRadius(radius);
    }
}

OipaIndicatorCircle.prototype.destroy = function() {
    this.location.map.map.removeLayer(this.circle);
}

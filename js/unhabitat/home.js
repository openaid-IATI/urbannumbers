var _animation_timeout;

function animate_home_page(map, timeout) {
    clearTimeout(_animation_timeout);
    var _locations = Object.keys(map.locations);
    if (_locations.length) {
        var selected = _locations[Math.floor(Math.random() * (_locations.length - 1))];
        if (map.locations[selected] !== undefined) {
            map.locations[selected].open_popup();
        }
    } else {
        _animation_timeout = setTimeout(function() {
            animate_home_page(map, timeout);
        }, 100);
    }

    _animation_timeout = setTimeout(function() {
        animate_home_page(map, timeout);
    }, timeout);
}

function WidgetsBus(map) {
    var self = this;

    // Monkey patch map.refresh_circles function to 
    var _original_refresh_circles = map.refresh_circles;
    map.refresh_circles = function(year) {
        var _ = _original_refresh_circles.apply(this, [year]);
        self.trigger_event('year_changed', year);
        return _;
    }

    this.listeners = [];

    this.add_listener = function(listener) {
        this.listeners.push(listener);
    }
    this.trigger_event = function(event_name, value) {
        $.each(this.listeners, function(_, listener) {
            if (listener[event_name]) {
                listener[event_name](value);
            }
        });
    }
}
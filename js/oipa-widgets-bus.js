var OipaWidgetsBus = {
    // Base listeners container
    listeners: [],

    patch_map: function(map) {
        // Monkey patch map.refresh_circles function to trigger year_changed event
        var _original_refresh_circles = map.refresh_circles;
        map.refresh_circles = function(year) {
            var _ = _original_refresh_circles.apply(this, [year]);
            OipaWidgetsBus.trigger_event('year_changed', year);
            return _;
        }
    },

    add_listener: function(listener) {
        this.listeners.push(listener);
    },

    remove_listener: function(listener) {
        if (this.listeners.indexOf(listener) > -1) {
            this.listeners.splice(this.listeners.indexOf(listener), 1);
        }
    },

    trigger_event: function(event_name, value) {
        $.each(this.listeners, function(_, listener) {
            if (listener[event_name]) {
                listener[event_name](value);
            }
        });
    }
}

$(function() {
    // Apply patches
    if (typeof(map) !== "undefined") {
        OipaWidgetsBus.patch_map(map);
    }
});
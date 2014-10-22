var OipaWidgetsBus = {
    // Base listeners container
    listeners: [],
    use_force_refresh: false,

    patch_map: function(map) {
        // Monkey patch map.refresh_circles function to trigger year_changed event
        var _original_refresh_circles = map.refresh_circles;
        map.refresh_circles = function(year) {
            var _ = _original_refresh_circles.apply(this, [year]);
            OipaWidgetsBus.trigger_event('year_changed', [year]);
            return _;
        }
        this.patch_refresh(map);
    },

    patch_refresh: function(map) {
        var _original_refresh = map.refresh;
        map.refresh = function(data) {
            var _ = _original_refresh.apply(this, [data]);
            var _params = [data];
            if (OipaWidgetsBus.use_force_refresh) {
                _params = [data, true];
            }
            OipaWidgetsBus.trigger_event('refresh_data', _params);
            return _;
        }
    },

    patch_filter: function(filter) {
        var _old_save = filter.save;
        filter.save = function(data) {
            var _ = _old_save.apply(this, [data]);
            var _params = [null];
            if (OipaWidgetsBus.use_force_refresh) {
                _params = [null, true];
            }
            OipaWidgetsBus.trigger_event('refresh', _params);

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
                listener[event_name].apply(listener, value);
            }
        });
    }
}

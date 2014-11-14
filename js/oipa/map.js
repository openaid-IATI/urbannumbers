function OipaMap(use_legend) {
    this.map = null;
    this.selection = null;
    this.slider = null;
    this.basemap = "zimmerman2014.ie8dpbpp";
    this.tl = null;
    this.compare_left_right = null;
    this.circles = {};
    this.markers = [];
    this.vistype = "circles";
    this.selected_year = null;
    this.use_legend = (use_legend == undefined) ? false : use_legend;

    if (typeof standard_basemap !== 'undefined') {
        this.basemap = standard_basemap;
    }

    this.set_map = function(div_id, zoomposition, minZoom, maxZoom) {
        var mapoptions = {
            attributionControl: false,
            scrollWheelZoom: false,
            zoom: 3,
            minZoom: 2,
            maxZoom:12,
            continuousWorld: 'false'
        }

        if(minZoom){ mapoptions.minZoom = minZoom; }
        if(maxZoom){ mapoptions.maxZoom = maxZoom; }

        if (zoomposition) {
            mapoptions.zoomControl = false;
        }

        jQuery("#"+div_id).css("min-height", "300px");
        this.map = L.map(div_id, mapoptions).setView([10.505, 25.09], 2);

        if (zoomposition) {
            new L.Control.Zoom({
                position: zoomposition
            }).addTo(this.map);
        }

        this.tl = L.tileLayer('https://{s}.tiles.mapbox.com/v3/'+this.basemap+'/{z}/{x}/{y}.png', {
            maxZoom: 12
        }).addTo(this.map);
    };

    this.refresh = function(data) {
        if (!data) {
            this.get_data(this.get_url());
        } else {
            // show data
            this.show_data_on_map(data);
        }

    };

    this.get_url = function() {
        var parameters = get_activity_based_parameters_from_selection(this.selection);
        var api_call = "activities";

        if (this.selection.group_by == "activity") {
            api_call = "activities";
        } else if(this.selection.group_by == "country"){
            api_call = "country-activities";
        } else if(this.selection.group_by == "region"){
            api_call = "region-activities";
        } else if(this.selection.group_by == "global"){
            api_call = "global-activities";
        }

        return search_url + api_call + '/?format=json' + parameters;
    };

    this.get_data = function(url) {
        if (url === null) {
            this.refresh(1);
        }

        perform_cors_ajax_call_with_refresh_callback(url, this);
    };

    this.delete_markers = function() {
        for (var i = 0; i < this.markers.length; i++) {
            this.map.removeLayer(this.markers[i]);
        }
    };

    this.add_marker = function(marker) {
        this.markers.push(marker);
    }

    this.show_data_on_map = function(data) {
        this.delete_markers();

        if (this.selection.group_by == "activity") {

        } else if(this.selection.group_by == "country") {
            // For 0 -> 9, create markers in a circle
            for (var i = 0; i < data.objects.length; i++) {
                if (data.objects[i].id === null){ continue; }
                // Use a little math to position markers.
                // Replace this with your own code.
                if (data.objects[i].latitude !== null || data.objects[i].longitude !== null){
                    curmarker = L.marker([
                        data.objects[i].latitude,
                        data.objects[i].longitude
                    ], {
                        icon: L.divIcon({
                            // Specify a class name we can refer to in CSS.
                            className: 'country-marker-icon',
                            // Define what HTML goes in each marker.
                            html: data.objects[i].total_projects,
                            // Set a markers width and height.
                            iconSize: [36, 44],
                            iconAnchor: [18, 34],
                        })
                    })
                    .bindPopup(
                        '<div class="country-marker-popup-header">' +
                            '<a href="' + site_url + '/country/?country_id=' + data.objects[i].id + '">' +
                            data.objects[i].name + '</a>' +
                        '</div>' +
                        '<table>' +
                            '<tr><td>YEAR:</td><td>ALL</td></tr>' +
                            '<tr><td>PROJECTS:</td><td>' +
                                '<a href="' + site_url + '/country/?country_id=' + data.objects[i].id + '">' + data.objects[i].total_projects + '</a>' +
                            '</td></tr>' +
                            '<tr><td>BUDGET:</td><td>US$' + comma_formatted(data.objects[i].total_budget) + '</td></tr>' +
                        '</table>' +
                        '<a class="country-marker-popup-zoom" name="' + data.objects[i].id + '" country_name="' + data.objects[i].name + '" latitude="' + data.objects[i].latitude + '" longitude="' + data.objects[i].longitude + '" onclick="map.zoom_on_dom(this);">+ ZOOM IN</a>',
                        { minWidth: 300, maxWidth: 300, offset: L.point(173, 69), closeButton: false, className: "country-popup"})
                    .addTo(this.map);

                    this.add_marker(curmarker);
                }
            }
        } else if (this.selection.group_by == "region") {
            this.map.setView([10.505, 25.09], 2);
            for (var i = 0; i < data.objects.length; i++) {
                curmarker = L.marker([
                    data.objects[i].latitude,
                    data.objects[i].longitude
                ], {
                    icon: L.divIcon({
                        // Specify a class name we can refer to in CSS.
                        className: 'global-marker-icon',
                        // Define what HTML goes in each marker.
                        html: '<div class="region-map-item-wrapper"><div class="region-map-activity-count">'+data.objects[i].total_projects+'</div><div class="region-map-name">'+data.objects[i].name+'</div></div>',
                        // Set a markers width and height.
                        iconSize: [150, 44],
                        iconAnchor: [18, 34],
                    })
                })
                .bindPopup(
                    '<table><tr><td>YEAR:</td><td>ALL</td></tr><tr><td>PROJECTS:</td><td><a href="'+site_url+'/region/?region_id='+data.objects[i].id+'">'+data.objects[i].total_projects+'</a></td></tr><tr><td>BUDGET:</td><td>US$'+comma_formatted(data.objects[i].total_budget)+'</td></tr></table>',
                    {
                        minWidth: 300,
                        maxWidth: 300,
                        offset: L.point(215, 134),
                        closeButton: false,
                        className: "region-popup"
                    })
                .on('mouseover', function(e) {
                    this.openPopup();
                })
                .addTo(this.map);
                this.add_marker(curmarker);
            }
        } else if (this.selection.group_by == "global") {
            this.map.setView([10.505, 25.09], 2);
            curmarker = L.marker([
                25, -90
            ], {
                icon: L.divIcon({
                    // Specify a class name we can refer to in CSS.
                    className: 'region-marker-icon',
                    // Define what HTML goes in each marker.
                    html: '<div class="global-map-item-wrapper"><div class="global-map-activity-count">'+data.objects[0].total_projects+'</div><div class="global-map-name">Global projects</div></div>',
                    // Set a markers width and height.
                    iconSize: [150, 44],
                    iconAnchor: [18, 34],
                })
            })
            .addTo(this.map);

            this.add_marker(curmarker);
        } else if (this.selection.group_by == "other") {
            this.map.setView([10.505, 25.09], 2);
            curmarker = L.marker([
                60, -41.31
            ], {
                icon: L.divIcon({
                    // Specify a class name we can refer to in CSS.
                    className: 'other-projects-marker-icon',
                    // Define what HTML goes in each marker.
                    html: '<div class="other-projects-map-inner">OTHER PROJECTS<br>US$ </div>',
                    // Set a markers width and height.
                    iconSize: [150, 44],
                    iconAnchor: [18, 34],
                })
            })
            .addTo(this.map);

            this.add_marker(curmarker);
        }

        this.load_map_listeners();
    };

    this.load_map_listeners = function(){
        // no default listeners, this function should be overriden.
    };

    this.update_indicator_timeline = function() {
        jQuery('.slider-year').removeClass('slider-active');

        for (var i=1950;i<2051;i++) {
            var curyear = "y" + i;
            // TO DO
            jQuery.each(indicator_data, function(key, value){
                if (value.years){
                    if (curyear in value.years){
                        jQuery("#year-" + i).addClass("slider-active");
                        return false;
                    }
                }
            });
        }
    };

    this.change_basemap = function(basemap_id) {
        this.tl._url = "https://{s}.tiles.mapbox.com/v3/" + basemap_id + "/{z}/{x}/{y}.png";
        this.tl.redraw();
    };

    this.zoom_on_dom = function(curelem){
        var latitude = curelem.getAttribute("latitude");
        var longitude = curelem.getAttribute("longitude");
        var country_id = curelem.getAttribute("name");
        var country_name = curelem.getAttribute("country_name");

        this.map.setView([latitude, longitude], 6);
        Oipa.mainSelection.countries.push({"id": country_id, "name": country_name});
        Oipa.refresh_maps();
        Oipa.refresh_lists();
    };
}

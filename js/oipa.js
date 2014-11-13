var Oipa = {
    default_organisation_id: null,
    default_organisation_name: null,
    pageType: null,
    mainSelection: new OipaSelection(1),
    maps : [],
    filter: null,
    visualisations : {},
    visualisations_with_no_data: [],
    use_prefill: true,
    max_prefill: 3,
    blank_visualizations_count: 3,

    visualisation_size: 340,

    invisible_visualizations: [],
    recreate_timeout: null,

    _blank_visualization_key: 'blank_visualization_',

    // Functions
    refresh: function(data) {

        if (data == undefined) {
            return this.get_data(this.get_url());
        }

        // reload maps
        this.refresh_maps(data);

        // reload lists
        this.refresh_lists(data);

        // reload visualisations
        this.refresh_visualisations(data);
        this.mainSelection.url.set_current_url();
    },

    get_url: function() {
        var str_region = get_parameters_from_selection(this.mainSelection.get('regions', []));
        var str_country = get_parameters_from_selection(this.mainSelection.get('countries', []));
        var str_city = get_parameters_from_selection(this.mainSelection.get('cities', []));
        var str_indicators = get_parameters_from_selection(this.mainSelection.get('indicators', []));

        return search_url + 'indicator-data/?format=json&countries__in=' + str_country + '&regions__in=' + str_region + '&cities__in=' + str_city + '&indicators__in=' + str_indicators;
    },

    get_data: function(url) {
        if (url === null) {
            this.refresh(1);
        }

        perform_cors_ajax_call_with_refresh_callback(url, this);
    },

    refresh_maps : function(data){
        for (var i = 0; i < this.maps.length; i++){
            this.maps[i].refresh();
        }
    },
    refresh_visualisations : function(data) {
        // remove old visualisation blocks
        //this.visualisations = [];
        //jQuery("#visualisation-block-wrapper").empty();

        // add new visualisation blocks
        Oipa.create_visualisations(data);
    },

    is_blank_visualization: function(visualization) {
        return this._blank_visualization_key == visualization.id.substring(0, this._blank_visualization_key.length);
    },

    clean_blank_visualisations: function(data) {
        var self = this;
        // Cleanup old ones
        return $.map(data, function(vis, _) {
            if (self.is_blank_visualization(vis)) {
                return;
            }
            return vis;
        });
    },

    prefill_blank_visualisations: function(data) {
        var new_data = data;
        // Add new blanks
        if (data.length < this.blank_visualizations_count) {
            for (var i = data.length; i < this.blank_visualizations_count; i++) {
                new_data.push({
                    id: this._blank_visualization_key + i,
                    name: "REPLACEME",
                    type: "Slum dwellers"
                });
            }
        }
        return new_data;
    },

    replace_visualisation: function(visualisation) {
        return;
        var self = this;
        clearTimeout(self.recreate_timeout);
        var used_indicators = Object.keys(self.visualisations);

        // Remove this indicator from used indicators
        used_indicators.splice(used_indicators.indexOf(visualisation.indicator), 1);

        // Update visualisations_with_no_data
        self.visualisations_with_no_data.push(visualisation.indicator);

        var combined_exclude = used_indicators.concat(self.visualisations_with_no_data);
        var available_indicators = Object.keys(self.filter.data.indicators).filter(function(x) {
            return combined_exclude.indexOf(x) < 0;
        });

        var random_suggested_indicator = available_indicators[Math.floor((Math.random() * available_indicators.length))];

        /*self.visualisations[random_suggested_indicator] = visualisation;
        visualisation.set_indicator(random_suggested_indicator);

        delete self.visualisations[visualisation.indicator];*/
        self.mainSelection.indicators = $.map(self.mainSelection.indicators, function(ind) {
            if (ind.id == visualisation.indicator) {
                ind.id = visualisation.indicator;
            }
            return ind;
        });

        self.recreate_timeout = setTimeout(function() {

            //self.create_visualisations();
        }, 1000);
    },

    get_chart_class: function(indicator) {
        var chart_class =  OipaBarChart;

        var chart_map = {
            'land_area': OipaPieChart,
            'street_density': OipaPieChart,
            'slum_proportion_living_urban': OipaPieChart,
            'urban_agglomeration_density': OipaPieChart,
            'urban_agglomeration_land_area': OipaPieChart,
            'urban_population_share_national': OipaPieChart,
            'cpi_environment_index': OipaPieChart,
            'cpi_equity_index': OipaPieChart,
            'cpi_infrastructure_index': OipaPieChart,
            'cpi_productivity_index': OipaPieChart,
            'cpi_quality_of_live_index': OipaPieChart,
            'intersection_density_index_city_core': OipaPieChart,
            'intersection_density_index_sub_urban_area': OipaPieChart,
            'land_allocated_to_street_index_city_core': OipaPieChart,
            'land_allocated_to_street_index_sub_urban_area': OipaPieChart,
            'street_density_index_city_core': OipaPieChart,
            'street_density_index_sub_urban_area': OipaPieChart,
            'total_length_road': OipaPieChart,
            'road_density': OipaPieChart,
            'paved_road': OipaPieChart,
            'owner_bicycle_rural': OipaPieChart,
            'owner_bicycle_total': OipaPieChart,
            'owner_bicycle_urban_area': OipaPieChart,
            'owner_motorcycle_rural_area': OipaPieChart,
            'owner_motorcycle_total': OipaPieChart,
            'owner_motorcycle_urban_area': OipaPieChart,
            'share_public_transport': OipaPieChart,
            'share_cycling': OipaPieChart,
            'share_walking': OipaPieChart,
            'paved_street': OipaPieChart,
            'intersection_density_city_core': OipaPieChart,
            'intersection_density_sub_urban_area': OipaPieChart,
            'intersection_density_total': OipaPieChart,
            'proportion_land_allocated_to_street_city_core': OipaPieChart,
            'street_density_city_core': OipaPieChart,
            'street_density_sub_urban_area': OipaPieChart,
            'street_density_total': OipaPieChart,
            'proportion_land_allocated_to_street_city_core': OipaPieChart,
            'proportion_land_allocated_to_street_sub_urban_area': OipaPieChart,
            'proportion_land_allocated_to_street_total': OipaPieChart,
            'cpi_6_dimensions': OipaRadarChart,
            'cpi_composite_street_connectivity_index': OipaRadarChart,
        }

        if (chart_map[indicator.id] !== undefined) {
            chart_class = chart_map[indicator.id];
        }

        if (indicator.all_years !== undefined ? indicator.all_years : false) {
            var _all_years_charts = {
                'urban_population_countries': OipaLineChart,
                'urban_slum_population': OipaLineChart,
                'land_allocated_to_street_index_city_core': OipaLineChart,
                'land_allocated_to_street_index_sub_urban_area': OipaLineChart,
                'street_density_index_city_core': OipaLineChart,
                'street_density_index_sub_urban_area': OipaLineChart,
                'total_length_road': OipaLineChart,
                'road_density': OipaLineChart,
                'paved_road': OipaLineChart,
                'owner_bicycle_rural': OipaLineChart,
                'owner_bicycle_total': OipaLineChart,
                'owner_bicycle_urban_area': OipaLineChart,
                'owner_motorcycle_rural_area': OipaLineChart,
                'owner_motorcycle_total': OipaLineChart,
                'owner_motorcycle_urban_area': OipaLineChart,
                'share_public_transport': OipaLineChart,
                'share_cycling': OipaLineChart,
                'share_walking': OipaLineChart,
                'paved_street': OipaLineChart,
                'intersection_density_city_core': OipaLineChart,
                'intersection_density_sub_urban_area': OipaLineChart,
                'intersection_density_total': OipaLineChart,
                'proportion_land_allocated_to_street_city_core': OipaLineChart,
                'street_density_city_core': OipaLineChart,
                'street_density_sub_urban_area': OipaLineChart,
                'street_density_total': OipaLineChart,
                'proportion_land_allocated_to_street_city_core': OipaLineChart,
                'proportion_land_allocated_to_street_sub_urban_area': OipaLineChart,
                'proportion_land_allocated_to_street_total': OipaLineChart,
            }

            if (_all_years_charts[indicator.id] !== undefined) {
                chart_class = _all_years_charts[indicator.id];
            }
        }

        return chart_class;
    },

    create_visualisations : function(indicator_data, forced_chart_class) {
        var thisoipa = this;

        if (this.use_prefill && this.mainSelection.indicators.length == 0 && indicator_data !== undefined) {
            // Add 3 indicators if nothing selected yet
            var _prefill_count = 0;
            $.each(indicator_data, function(key, i) {
                if (_prefill_count == thisoipa.max_prefill) {
                    return;
                }
                thisoipa.mainSelection.add_indicator(key, i.indicator_friendly, "indicators");
                _prefill_count++;
            });
        }

        var data = this.clean_blank_visualisations(this.mainSelection.indicators);

        // cleanup unused charts
        var _new_visualizations = $.map(data, function(val, _) {
            return val.id;
        });

        $.each($.extend({}, thisoipa.visualisations), function(id, vis) {
            if (_new_visualizations.indexOf(id) == -1) {
                // Remove unused visualisation
                vis.destroy();
                delete thisoipa.visualisations[id];
            }
        });

        var _old_visualizations = $.map(thisoipa.visualisations, function(vis, _) {
            return vis.id;
        });

        data = this.prefill_blank_visualisations(data);

        // for each indicator
        jQuery.each(data, function(key, value) {
            if (thisoipa.invisible_visualizations.indexOf(value.id) !== -1 ||
                (indicator_data && !thisoipa.is_blank_visualization(value) && indicator_data[value.id] == undefined)) {
                return;
            }

            if (thisoipa.visualisations[value.id] == undefined) {
                var _chart_class = OipaBarChart;
                if (forced_chart_class == undefined) {
                    _chart_class = thisoipa.get_chart_class(value);

                    if (thisoipa.is_blank_visualization(value)) {
                        _chart_class = OipaBlankChart;
                    }

                    if (value.options !== undefined && value.options.chart_class !== undefined) {
                        _chart_class = value.options.chart_class;
                    }
                } else {
                    _chart_class = forced_chart_class;
                }

                thisoipa.visualisations[value.id] = new _chart_class(value.id, value.options);
                thisoipa.visualisations[value.id]._initial_selection = thisoipa.mainSelection;
                thisoipa.visualisations[value.id].selection = new OipaIndicatorSelection();
                thisoipa.visualisations[value.id].selection.cities = thisoipa.mainSelection.cities;
                thisoipa.visualisations[value.id].selection.countries = thisoipa.mainSelection.countries;
                thisoipa.visualisations[value.id].selection.regions = thisoipa.mainSelection.regions;
                thisoipa.visualisations[value.id].selection.indicators.push({"id": value.id, "name": value.name, "type": value.type});
                thisoipa.visualisations[value.id].indicator = value.id;
                thisoipa.visualisations[value.id].name = value.name;
                thisoipa.visualisations[value.id].y_name = value.name;
                thisoipa.visualisations[value.id].y_format = d3.format(',r');
                thisoipa.visualisations[value.id].x_name = 'Time (Years)';
                thisoipa.visualisations[value.id].x_format = d3.format('r');
                thisoipa.visualisations[value.id].init();

                if (indicator_data && indicator_data[value.id] !== undefined) {
                    thisoipa.visualisations[value.id].refresh_data(indicator_data);
                }

            } else {
                thisoipa.visualisations[value.id].selection.cities = thisoipa.mainSelection.cities;
                thisoipa.visualisations[value.id].selection.countries = thisoipa.mainSelection.countries;
                thisoipa.visualisations[value.id].selection.regions = thisoipa.mainSelection.regions;
                if (indicator_data && indicator_data[value.id] !== undefined) {
                    thisoipa.visualisations[value.id].refresh_data(indicator_data);
                } else {
                    thisoipa.visualisations[value.id].refresh();
                }
            }
        });
        },
        lists: [],
        refresh_lists : function(){
                for (var i = 0; i < this.lists.length; i++){
                        this.lists[i].refresh();
                }
        }
};

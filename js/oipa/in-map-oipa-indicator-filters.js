function UnhabitatInMapOipaIndicatorFilters() {
    var self = this;
    UnhabitatOipaIndicatorFilters.call(self);

    self.make_option_element = function(id, value, sortablename, type, category) {
        return [
            "<li>",
                "<div>",
                    "<label>",
                        '<input type="checkbox" class="map-filter-checkbox ' + type + '" value="'+ value + '" id="' + self.string_to_id(id.toString()) + '" name="' + id+'" />',
                        sortablename,
                    "</label>",
                "</div>",
            "</li>"
        ].join("");
    }

    self.make_option_with_subs_element = function(id, value, sortablename, subs, category) {
        id = self.string_to_id(id.toString());
        var _html = [
            '<li class="' + id + '-li">',
                '<div>',
                    '<a name="' + id + '" class="opener filter-open" href="#"><label>' + sortablename + '</label><span class="glyphicon glyphicon-chevron-down"></span></a>',
                '</div>',
                '<ul class="' + id + '-list subul">',
        ];

        $.each(subs, function(e, v) {
            _html.push(self.make_option_element(id, v.id, v.name, 'indicators', category));
        });

        _html.push("</ul>", "</li>");
        return _html.join('');
    }

    self.update_selection_after_filter_load = function(selection, nosave) {
        filter.initialize_filters(selection);
        $.each(selection, function(key, value) {
            if (Array.isArray(value)) {
                if (key == 'indicators') {
                    var _data = filter.get_raw_data();
                    if (_data !== null) {
                        var _category_counts = {
                            'Publicspaces': 0,
                            'Cityprosperity': 0,
                            'Slumdwellers': 0
                        };
                        $.each(value, function(_k, _v) {
                            if (_data['indicators'][_v.id] !== undefined) {
                                var _cat_id = self.string_to_id(_data['indicators'][_v.id].category);
                                if (_category_counts[_cat_id] == undefined) {
                                    _category_counts[_cat_id] = 0;
                                }
                                _category_counts[_cat_id] += 1;
                            }
                        });
                        $.each(_category_counts, function(_k, _v) {
                            if (_v > 0) {
                                $("#" + self.filter_wrapper_div + " ." + _k + "-li").find('span.counts').html(_v);
                            } else {
                                $("#" + self.filter_wrapper_div + " ." + _k + "-li").find('span.counts').html('');
                            }
                        });
                    }
                } else {
                    if (value.length > 0) {
                        $("#" + self.filter_wrapper_div + " ." + key + "-li").find('span.counts').html(value.length);
                    } else {
                        $("#" + self.filter_wrapper_div + " ." + key + "-li").find('span.counts').html('');
                    }
                }
            }
        });

        if (nosave == undefined) {
            filter.save(true);
        }
    }
    self.after_filter_load = function() {
        self.update_selection_after_filter_load(filter.selection, 1);
    }

    self.create_filter_attributes = function(objects, columns, attribute_type) {
        if (attribute_type === "indicators"){
            self.create_indicator_filter_attributes(objects, columns);
            return true;
        }

        var html = '';
        var per_col = 6;

        var sortable = $.map(objects, function(val, key) {
            return [[key, val]];
        }).sort(function(a, b) {
            var nameA=a[1].toString().toLowerCase(), nameB=b[1].toString().toLowerCase();
            if (nameA < nameB) { //sort string ascending
                    return -1; 
            }
            if (nameA > nameB) {
                    return 1;
            }
            return 0; //default return value (no sorting)
        });

        var html = {items: []};

        $.each(sortable, function(_, v) {
            var sortablename = v[1];
            if (columns == 4 && sortablename.length > 32){
                sortablename = sortablename.substr(0,28) + "...";
            } else if (columns == 3 && sortablename.length > 40){
                sortablename = sortablename.substr(0,36) + "...";
            }
            html.items.push(self.make_option_element(v[1], v[0], sortablename, attribute_type, attribute_type, attribute_type + '[]'));
        });

        var _res = {};
        _res[attribute_type] = html;
        self.create_categories(_res);
        //$("#" + self.filter_wrapper_div + " ." + attribute_type + "-list").html(html);
        
        var _changes_map = {
            regions: ['countries', 'cities'],
            countries: ['cities']
        };
        

        $("#" + self.filter_wrapper_div + " ." + attribute_type + "-list .map-filter-checkbox").each(function(_, item) {
            if (item.has_change_listener == undefined) {
                $(item).change(function(e) {
                    if (this.checked) {
                        filter.selection.clean(attribute_type);
                        filter.selection.update_selection(attribute_type, this.value, this.name, attribute_type);
                    } else {
                        filter.selection[attribute_type] = filter.selection.remove_from_selection(attribute_type, this.value);
                    }

                    self.update_selection_after_filter_load(filter.selection);

                    if (_changes_map[attribute_type] !== undefined) {
                        $.each(_changes_map[attribute_type], function(_, atype) {
                            self.reload_specific_filter(atype);
                        });
                    }
                });
                item.has_change_listener = true;
            }
        })
    }

    self.create_indicator_filter_attributes = function(objects, columns) {
        var html = '';
        var paginatehtml = '';
        var per_col = 6;

        var with_subs = {};
        var categories = {};

        var without_subs = $.map(objects, function(val, l) {
            var splitted_name = val.name.split(" – ");
            var key = splitted_name[0].trim();
            val.id = l;
            if (splitted_name.length > 1) {
                if (with_subs[key] == undefined ) {
                    with_subs[key] = {
                        id: l,
                        name: key,
                        category: val.category,
                        subs: []
                    };
                };

                val.name = splitted_name[1];
                with_subs[key].subs.push(val);
            } else {
                return [[l, val]];
            }
        });
        $.each(with_subs, function(_, v) {
            without_subs.push([v.id, v]);
        });

        //var sortable = $.map($(without_subs).extend(with_subs), function(val, key) {
        var sortable = without_subs.sort(function(a, b) {
            var nameA=a[1].name.toString().toLowerCase(), nameB=b[1].name.toString().toLowerCase();
            if (nameA < nameB) { //sort string ascending
                return -1; 
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0; //default return value (no sorting)
        });

        var ivaluetranslation = {
            rural: 'Rural area',
            city_core: 'City core',
            urban_area:'Urban area',
            "City core": "city core",
            sub_urban_area: 'Sub-urban area',
            sub_urban:'Sub-urban area',
            total:'Total'
        }; 

        $.each(sortable, function(_id, v) {
            var sortablename = v[1].name;
            var categoryname = v[1].category;
            var indicatoroptionhtml = '';

            if (categories[categoryname] == undefined) {//!(categoryname in categories)){
                categories[categoryname] = {items: [], counts: 0};
            }

            var splitted_name = v[1].name.split(" – ");

            if (v[1].subs !== undefined && v[1].subs.length) {
                categories[categoryname].counts += v[1].subs.length;
                indicatoroptionhtml = self.make_option_with_subs_element(v[0], v[0], sortablename, v[1].subs, categoryname);
            } else {
                categories[categoryname].counts += 1;
                indicatoroptionhtml = self.make_option_element(v[0], v[0], sortablename, 'indicators', categoryname);
            }
            categories[categoryname].items.push(indicatoroptionhtml);
        });
        
        self.create_categories(categories);
        
        $("#" + self.filter_wrapper_div + " .filter-open").click(function(e) {

            e.preventDefault();
            if (this.has_listener) {
                return;
            }
            $(this.parentNode.parentNode).find('ul').each(function(i,v) {
                $(v).toggle();
            });

            var filtername = $(this).attr("name");
            filter.reload_specific_filter(filtername);
        });

        $(".map-filter-checkbox").each(function(_, item) {
            if (item.has_change_listener == undefined) {
                $(item).change(function(e) {
                    if (this.checked) {
                        filter.selection.update_selection('indicators', this.value, this.name, 1);
                    } else {
                        filter.selection['indicators'] = filter.selection.remove_from_selection('indicators', this.value);
                    }
                    self.update_selection_after_filter_load(filter.selection);
                    $.each(['regions', 'countries', 'cities'], function(_, atype) {
                        self.reload_specific_filter(atype);
                    });
                    filter.save(true);
                });
                item.has_change_listener = true;
            }
        });
    }
    
    self.create_categories = function(categories) {
        $.each(categories, function(category_name, value) {
            if (category_name == "") {
                return;
            }

            var category_id = self.string_to_id(category_name);
            $("#" + self.filter_wrapper_div + " ." + category_id + "-list").html(value.items.join(''));
        });
    }

};
UnhabitatInMapOipaIndicatorFilters.prototype = Object.create(UnhabitatOipaIndicatorFilters.prototype);

function Pages(holder_id, controls_holder_id, options) {
    var self = this;
    self.pages_count = 0;
    self.page_id = 0;
    self.holder = $(holder_id).get()[0];
    self.controls_holder = $(controls_holder_id).get()[0];

    self.opts = $.extend({
        page_prefix: '#page_',
        page_selector: '.page',
        nav_conditions: {},
        nav_options: {},
        nav_selector: '.step_',
        nav_selected: 'nav-selected',
        nav_enabled: 'nav-enabled',
        nav_disabled: 'nav-disabled',
    },
    options !== undefined ? options : {});

    self.init = function() {
        self.pages_count = $(self.holder).find(self.opts.page_selector).length;

        // Done, show page
        self.show(self.page_id);
    }

    self.next = function() {
        var _valid = true;
        if (self.opts.nav_conditions && self.opts.nav_conditions[self.page_id + 1] !== undefined) {
            _valid = self.opts.nav_conditions[self.page_id + 1]();
        }
        if (_valid) {
            self.show(self.page_id + 1);
        }
    }

    self.update_nav_status = function() {
        if (self.opts.nav_conditions) {
            $.each(self.opts.nav_conditions, function(id, cond) {
                var _enabled = cond();
                $(self.controls_holder)
                    .find(self.opts.nav_selector + id)
                    .parent()
                    .removeClass(self.opts.nav_selected);
                if (_enabled) {
                    $(self.controls_holder)
                        .find(self.opts.nav_selector + id)
                        .parent()
                        .removeClass(self.opts.nav_disabled)
                        .addClass(self.opts.nav_enabled);
                } else {
                    $(self.controls_holder)
                        .find(self.opts.nav_selector + id)
                        .parent()
                        .removeClass(self.opts.nav_enabled)
                        .addClass(self.opts.nav_disabled);
                }
            });
        }

        $(self.controls_holder)
            .find(self.opts.nav_selector + self.page_id)
            .parent()
            .removeClass(self.opts.nav_disabled)
            .removeClass(self.opts.nav_enabled)
            .addClass(self.opts.nav_selected);

        if (self.opts.nav_options !== undefined && self.opts.nav_options[self.page_id] !== undefined) {
            self.opts.nav_options[self.page_id]();
        }
    }

    self.show = function(page_id) {
        if (page_id >= self.pages_count) {
            return;
        }

        // Hide old page
        $(self.holder).find(self.opts.page_prefix + self.page_id).fadeOut();

        // Update current page id and show it
        self.page_id = page_id;
        $(self.holder).find(self.opts.page_prefix + self.page_id).fadeIn();
        self.update_nav_status();
    }

    self.init();
}


function CreateInfographicFilters() {
    var self = this;
    UnhabitatInMapOipaIndicatorFilters.call(self);

    var _oldupdate_selection_after_filter_load = self.update_selection_after_filter_load;
    self.update_selection_after_filter_load = function(selection, nosave) {
        _oldupdate_selection_after_filter_load.apply(self, [selection, nosave]);

        $('#ci-pages').find('input').each(function(_, item) {
            if (item.has_ci_change_listener == undefined) {
                $(item).change(function(e) {
                    CI.update_nav_status();
                });
                item.has_ci_change_listener = true;
            }
        });
        //self.reload_specific_filter('indicators')
    }

    self.make_option_element = function(id, value, sortablename, type, category, ename) {
        var _append = '';
        ename = ename == undefined ? id : ename;

        if (category !== undefined) {
            var _split = type;
            if (type == 'indicators') {
                _split = self.string_to_id(category);
            }

            if (self.option_element_num == undefined) {
                self.option_element_num = {};
            }
            if (self.option_element_num[_split] == undefined) {
                self.option_element_num[_split] = 1;
            };
            if (self.option_element_num[_split] % 40 == 0) {
                _append = '</div><div class="col">';
            }

            self.option_element_num[_split] += 1;
            //console.log(_split, self.option_element_num[_split]);
        }

        var _input_type = type == 'indicators' ? 'checkbox' : 'radio';
        var _parts = [
            "<div class='line'>",
                "<label>",
                    '<input type="' + _input_type + '" class="map-filter-checkbox ' + type + '" value="'+ value + '" id="' + self.string_to_id(id.toString()) + '" name="' + ename +'" />',
                    sortablename,
                "</label>",
            "</div>",
        ]
        return _parts.join("") + _append;
    }

    self.make_option_with_subs_element = function(id, value, sortablename, subs, category) {
        var _append = '';

        id = self.string_to_id(id.toString());

        if (category !== undefined) {
            category = self.string_to_id(category);
            if (self.option_element_num == undefined) {
                self.option_element_num = {};
            }
            if (self.option_element_num[category] == undefined) {
                self.option_element_num[category] = 1;
            };
            if (self.option_element_num[category] % 40 == 0) {
                _append = '</div><div class="col">';
            }

            self.option_element_num[category] += 1;
        }

        var _html = [
            '<div class="' + id + '-li">',
                '<div>',
                    '<a name="' + id + '" class="opener filter-open" href="#"><span class="glyphicon glyphicon-plus"></span><label>' + sortablename + '</label></a>',
                '</div>',
                '<div class="' + id + '-list subul">',
        ];

        $.each(subs, function(e, v) {
            _html.push(self.make_option_element(id, v.id, v.name, 'indicators', undefined));
        });

        _html.push("</div>", "</div>");
        return _html.join('') + _append;
    }

    self.create_categories = function(categories) {
        $.each(categories, function(category_name, value) {
            category_name = category_name == "" ? "Other" : category_name;

            var category_id = self.string_to_id(category_name);
            
            $("#" + self.filter_wrapper_div + " ." + category_id + "-list").html('<div class="col">' + value.items.join('') + '</div>');
        });
    }

    var _original_reload_specific_filter = self.reload_specific_filter;
    self.reload_specific_filter = function(filtername, data) {
        if ($('#page_' + CI.page_id + ' .tabs-body').find('div.' + filtername + '-list').get().length &&
            $('#page_' + CI.page_id + ' .tabs-body').find('div.' + filtername + '-list').get()[0].parentNode.className == 'tabs-body') {
            // Close all only when tab is changed
            $('#page_' + CI.page_id + ' .tabs-body').find('div.subul').removeClass('open');
            $('#page_' + CI.page_id + ' .tabs-header').find('li').removeClass('open');
        }
        $('#page_' + CI.page_id + ' .tabs-body').find('div.' + filtername + '-list').addClass('open');
        $('#page_' + CI.page_id + ' .tabs-header').find('li.' + filtername + '-li').addClass('open');

        _original_reload_specific_filter.apply(self, [filtername, data]);
    }

}
CreateInfographicFilters.prototype = Object.create(UnhabitatInMapOipaIndicatorFilters.prototype);

window.filter = null;
window.CI = null;

(function() {
    Oipa.pageType = "indicators";
    Oipa.mainSelection = new OipaIndicatorSelection(1);

    filter = new CreateInfographicFilters();
    filter.filter_wrapper_div = "ci-pages";
    filter.selection = Oipa.mainSelection;
    filter.init();
    filter.update_selection_after_filter_load(filter.selection);
    filter.save(true);

    var _validate_first_step = function() {
        if ($('#page_0').find('input[name="title"]').get()[0].value.trim() !== "") {
            return true;
        }
        return false;
    }
    var _validate_second_step = function() {
        if (!_validate_first_step()) {
            return false;
        }

        if ($("#page_1").find('input[type="checkbox"]:checked').get().length > 0) {
            return true;
        }
        return false;
    }

    CI = new Pages('#ci-pages', '.ci-controls', {
        nav_conditions: {
            0: function() { return true; },
            1: _validate_first_step,
            2: _validate_second_step,
            3: _validate_second_step,
            4: _validate_second_step
        },
        nav_options: {
            4: function() {
                $(".save_btn").show();
                $(".next_step").hide();
            }
        }
    });
    $('.next_step').click(function(e) {
        CI.next();
    })
    
    $('#ci-pages').find('input').change(function(e) {
        CI.update_nav_status();
    });
    
    $('.steps-nav .btn').click(function(e) {
        if (this.className.indexOf(CI.opts.nav_disabled) == -1) {
            var _page = 0;
            $.each(this.className.split(' '), function(_, _class) {
                if (_class.indexOf('step_') !== -1) {
                    CI.show(parseInt(_class.substr(5)));
                }
            });
        }
    });

})();

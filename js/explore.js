var fav_alert_timeout;

function ExploreIndicatorFilters() {
    this.filter_opener_class = 'glyphicon glyphicon-plus';
}

ExploreIndicatorFilters.prototype = new OipaIndicatorFilters();

var _old_create_filter_attributes = ExploreIndicatorFilters.prototype.create_filter_attributes;
ExploreIndicatorFilters.prototype.create_filter_attributes = function(objects, columns, attribute_type) {
    var self = this;

    if (attribute_type === "indicators"){
        self.create_indicator_filter_attributes(objects, columns);
        return true;
    }

    var html = '';
    var per_col = 6;

    var sortable = [];
    for (var key in objects) {
        sortable.push([key, objects[key]]);
    }

    sortable.sort(function(a, b){
        var nameA=a[1].toString().toLowerCase();
        var nameB=b[1].toString().toLowerCase();
        if (nameA < nameB) { //sort string ascending
                return -1;
        }
        if (nameA > nameB) {
                return 1;
        }
        return 0; //default return value (no sorting)
    });

    var page_counter = 1;

    for (var i = 0; i < sortable.length; i++) {
        var sortablename = sortable[i][1];
        if (columns == 4 && sortablename.length > 32){
                sortablename = sortablename.substr(0,28) + "...";
        } else if (columns == 3 && sortablename.length > 40){
                sortablename = sortablename.substr(0,36) + "...";
        }
        var _id = self.string_to_id(sortable[i][1]);

        html += '<label class="checkbox_label">';
        html += '<input type="checkbox" value="'+ sortable[i][0] +'" id="'+ _id +'" name="'+sortable[i][1]+'" />';
        html += sortablename;
        html += '</label>';
    }

    // if no elements found
    if (sortable.length == 0){
        html += '<div class="row filter-page filter-page-1">';
        html += '<div class="col-md-6 col-sm-6 col-xs-12" style="margin-left: 20px;">';
        html += 'No ' + attribute_type + ' available in the current selection.';
        html += '</div></div>';
    }

    // get pagination attributes and add both pagination + filter options to div
    jQuery("#"+attribute_type+"-pagination").html(self.paginate(1, page_counter));
    jQuery("#"+attribute_type+"-filters").html(html);
    $('#' + attribute_type + '-filters input').change(function(e) {
        self.save();

        var _changes_map = {
            regions:   ['indicators', 'countries', 'cities'],
            countries: ['indicators', 'cities'],
            cities:    ['indicators'],
        };
        if (_changes_map[attribute_type] !== undefined) {
            $.each(_changes_map[attribute_type], function(_, atype) {
                self.reload_specific_filter(atype);
            });
        }
    });
    self.load_paginate_listeners(attribute_type, page_counter);
    self.update_selection_after_filter_load();
};

ExploreIndicatorFilters.prototype.load_indicator_paginate_listeners = function() {
    $("#indicators-pagination li a").addClass('btn btn-default');

    $("#indicators-pagination li a").click(function(e){
        e.preventDefault();

        var is_active = $(this).hasClass('btn-success');
        $("#indicators-pagination li a").removeClass("btn-success").addClass("btn-default");
        $("#indicators-filters .filter-page").hide();

        if (is_active) {
            $('#indicator-filter-wrapper .slide-content').hide();
        } else {
            $('#indicator-filter-wrapper .slide-content').show();
            $(this).removeClass("btn-default").addClass("btn-success");

            var name = $(this).attr("name");
            $(".filter-page-"+name).show();
        }
    });

    //$("#indicators-pagination li a:first").click();

    $(".filter-indicator-type-text").click(function(e){
        e.preventDefault();
        $(this).find("span.urbnnrs-arrow").toggleClass("urbnnrs-arrow-active");
        $(this).closest(".filter-indicator-type-dropdown").children(".filter-indicator-type-inner").toggle(500);
    });
};

ExploreIndicatorFilters.prototype.reset_filters = function() {
    jQuery("#indicator-filter-wrapper input[type=checkbox]").attr('checked', false);
    this.selection.clean('indicators');
    this.selection.clean('countries');
    this.selection.clean('cities');
    this.selection.clean('regions');
    this.save(true);
};

ExploreIndicatorFilters.prototype.randomize = function(max_indicators) {
    var self = this;
    max_indicators = (max_indicators == undefined) ? 6 : max_indicators;

    if (self.data !== undefined && self.data.indicators !== undefined) {
        var _indicators = self.data.indicators;
        var _keys = Object.keys(_indicators);

        var _get_ids = function(keys, _count, result) {
            if (_count == result.length) {
                return result;
            }
            var _id =  Math.floor(Math.random() * (keys.length));
            if (result.indexOf(_id) == -1) {
                result.push(_id);
            }
            return _get_ids(keys, _count, result);
        }

        $.each(_get_ids(_keys, max_indicators, []), function(_, id) {
            var _indicator = _indicators[_keys[id]];
            self.selection.add_indicator(_keys[id], _indicator.name, 'indicators');
        });

        self.save(true);
    }
}



/** EXTRAS **/

$(".explore-filters-save-button").click(function(e){
    e.preventDefault();
    filter.save();
    $('.explore-filters-close-button').click();
});

$('.explore-filters-close-button').click(function(e) {
    e.preventDefault();

    $("#indicators-pagination li a").removeClass("btn-success").addClass("btn-default");
    $('#indicator-filter-wrapper .slide-content').hide();
});

$('#explore-randomize').click(function(e) {
    e.preventDefault();
    filter.reset_filters();
    filter.randomize();
});



$('.add-to-favorites').click(function(e) {
    e.preventDefault();
    clearTimeout(fav_alert_timeout);
    $.ajax({
        type: "POST",
        url: vb_reg_vars.vb_ajax_url,
            data: {
            action: 'favorite_explore',
            cities: get_parameters_from_selection(filter.selection.get('cities')),
            countries: get_parameters_from_selection(filter.selection.get('countries')),
            indicators: get_parameters_from_selection(filter.selection.get('indicators'))
        },
        success: function(data) {
            if (data.status == 'log_in_first') {
                display_login_form();
            }
            if (data.status == 'saved') {
                $('.fav-alert')
                    .removeClass('alert-danger')
                    .removeClass('alert-info')
                    .addClass('alert-success');

                $('.fav-alert').html("Saved!");
                $('.fav-alert').fadeIn();
                fav_alert_timeout = setTimeout(function() {
                    $('.fav-alert').fadeOut();
                }, 3000);
            }
            if (data.status == 'already_in_favorites') {
                $('.fav-alert')
                    .removeClass('alert-danger')
                    .removeClass('alert-success')
                    .addClass('alert-info');
                $('.fav-alert').html("Already saved!");
                $('.fav-alert').fadeIn();
                fav_alert_timeout = setTimeout(function() {
                    $('.fav-alert').fadeOut();
                }, 3000);
            }
        },
        error: function(xhr, status, e) {
            $('.fav-alert')
                .removeClass('alert-info')
                .removeClass('alert-success')
                .addClass('alert-danger');
            $('.fav-alert').html("Error occured, please try again later.");
            $('.fav-alert').fadeIn();
            fav_alert_timeout = setTimeout(function() {
                $('.fav-alert').fadeOut();
            }, 3000);
        },
        dataType: 'json'
    });
});

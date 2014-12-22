function OipaCompareFilters() {
    this.filter_opener_class = 'glyphicon glyphicon-plus';
    this.update_only_filters =
    this.get_url = function(selection, parameters_set) {
        // get url from filter selection object
        var cururl = search_url + "indicator-filter-options/?format=json&adm_division__in=city";
        if (parameters_set){
            cururl += parameters_set;
        }

        return cururl;
    };
}
OipaCompareFilters.prototype = new OipaIndicatorFilters();

OipaCompareFilters.prototype.get_selection_object = function(){
    var new_selection = new OipaCompareSelection();
    new_selection.left.countries = this.get_checked_by_filter("left-countries");
    new_selection.left.cities = this.get_checked_by_filter("left-cities");
    new_selection.right.countries = this.get_checked_by_filter("right-countries");
    new_selection.right.cities = this.get_checked_by_filter("right-cities");
    new_selection.indicators = this.get_checked_by_filter("indicators");
    return new_selection;
};

OipaCompareFilters.prototype.process_filter_options = function(data) {
    var columns = 4;
    var filter = this;

    // load filter html and implement it in the page
    this.create_filter_attributes(data.countries, columns, 'left-countries');
    this.create_filter_attributes(data.countries, columns, 'right-countries');

    this.create_filter_attributes(data.cities, columns, 'left-cities');
    this.create_filter_attributes(data.cities, columns, 'right-cities');

    this.create_filter_attributes(data.indicators, 2, 'indicators');

    if (this.selection.get('countries', []).length > 0 || this.selection.get('cities', []).length > 0) {
        this.reload_specific_filter('indicators');
    }
};

OipaCompareFilters.prototype.get_checked_by_select = function(id) {
    var result = $.map($('#' + id + '-select option:selected'), function(option) {
        if (option.value !== '') {
            return {"id": option.value, "name": option.innerHTML};
        }
    });
    return result;
};

OipaCompareFilters.prototype.update_selection_object = function() {
    this.selection.left.countries = this.get_checked_by_select('left-countries');

    var left_cities = this.get_checked_by_select('left-cities');
    if (left_cities.length > 0) {
        this.selection.left.cities = left_cities;
    }
    this.selection.right.countries = this.get_checked_by_select('right-countries');

    var right_cities = this.get_checked_by_select('right-cities');
    if (right_cities.length > 0) {
        this.selection.right.cities = right_cities;
    }
    this.selection.indicators = this.get_checked_by_filter("indicators");
};

OipaCompareFilters.prototype.get_select_status = function(key) {
    if (key == 'left-countries') {
        // Left countries select is always enabled
        return true;
    }

    if (key == 'left-cities' && this.selection.get_side('left', 'countries', []).length > 0) {
        return true;
    }

    if (key == 'right-countries' && this.selection.get_side('left', 'cities', []).length > 0) {
        return true;
    }

    if (key == 'right-cities' && this.selection.get_side('right', 'countries', []).length > 0) {
        return true;
    }

    if (key == 'indicators' && this.selection.get_side('right', 'cities', []).length > 0) {
        return true;
    }

    return false;
};

OipaCompareFilters.prototype.reload_specific_filter = function(filter_name, data, extra_callback) {
    var self = this;
    if (!data) {
        var url = '';

        if (filter_name === "indicators") {
            url = "&regions__in=" + get_parameters_from_selection(self.selection.get('regions'))
                + "&countries__in=" + get_parameters_from_selection(self.selection.get('countries'))
                + "&cities__in=" + get_parameters_from_selection(self.selection.get('cities'));
        } else {
            url = "&indicators__in=" + get_parameters_from_selection(self.selection.get('indicators'));
        }

        if (filter_name === "left-cities") {
            url += "&countries__in=" + get_parameters_from_selection(self.selection.get_side('left', 'countries'));
        }
        if (filter_name === "right-cities") {
            url += "&countries__in=" + get_parameters_from_selection(self.selection.get_side('right', 'countries'));
        }

        if (filter_name === "countries") {
            url += "&regions__in=" + get_parameters_from_selection(self.selection.get('regions'));
        }

        if (filter_name === "cities") {
            url += "&regions__in=" + get_parameters_from_selection(self.selection.get('regions'))
                + "&countries__in=" + get_parameters_from_selection(self.selection.get('countries'));
        }
        url = self.get_url(null, url);

        jQuery.support.cors = true;

        if(window.XDomainRequest) {
            var xdr = new XDomainRequest();
            xdr.open("get", url);
            xdr.onprogress = function () { };
            xdr.ontimeout = function () { };
            xdr.onerror = function () { };
            xdr.onload = function() {
                var jsondata = jQuery.parseJSON(xdr.responseText);
                if (jsondata === null || typeof (jsondata) === 'undefined') {
                    jsondata = jQuery.parseJSON(jsondata.firstChild.textContent);
                }
                self.reload_specific_filter(filter_name, jsondata, extra_callback);
            };
            setTimeout(function () {xdr.send();}, 0);
        } else {
            jQuery.ajax({
                type: 'GET',
                url: url,
                contentType: "application/json",
                dataType: 'json',
                success: function(data){
                    self.reload_specific_filter(filter_name, data, extra_callback);
                }
            });
        }

    } else {
        // reload filters
        columns = 4;

        $('#indicator-filter-wrapper li a').each(function(_, a) {
            $(a).addClass('btn btn-default');
        });

        if (filter_name === "left-cities") {
            self.create_filter_attributes(data.cities, columns, 'left-cities');
        }
        if (filter_name === "right-cities") {
            self.create_filter_attributes(data.cities, columns, 'right-cities');
        }
        if (filter_name === "regions") {
            self.create_filter_attributes(data.regions, 2, 'regions');
        }
        if (filter_name === "countries") {
            self.create_filter_attributes(data.countries, columns, 'countries');
        }
        if (filter_name === "cities") {
            self.create_filter_attributes(data.cities, columns, 'cities');
        }
        if (filter_name === "indicators") {
            self.create_filter_attributes(data.indicators, 2, 'indicators');
        }

        if (typeof extra_callback !== 'undefined') {
            extra_callback(data);
        }

        self.initialize_filters(self.selection);
    }
};


OipaCompareFilters.prototype.init_holder =  function(key) {
    var self = this;
    var _holder = document.createElement('select');
    _holder.id = key + '-select';
    _holder.onchange = function(e) {
        self.save();
        if (key.indexOf('-countries') !== -1) {
            self.reload_specific_filter(key.replace('-countries', '-cities'));

            $('#' + key.replace('-countries', '-cities') + '-select').get()[0].disabled = false;
            $('#' + key.replace('-countries', '-cities') + '-select').selectric('refresh');
            self.show_helper(key.replace('-countries', '-cities'));
        }

        if (key == 'left-cities') {
            $('#right-countries-select').get()[0].disabled = false;
            $('#right-countries-select').selectric('refresh');
            self.show_helper('right-countries');
        }

        if (key == 'right-cities') {
            self.reload_specific_filter('indicators');
            $('#indicator-filter-wrapper nav').show();
            $('.indicators-helper').css({'display': 'inline'});
        }
        self.activate_reset_and_favorites();
    }

    if (key == 'left-countries') {
        _holder.onclick = function() {
            $('.left-countries-helper').fadeOut();
        }
    }
    return _holder;
}

OipaCompareFilters.prototype.init_option = function(key, name, value, selected) {
    var _option = document.createElement('option');
    _option.value = value;
    _option.innerHTML = name;

    var _selected = false;
    if (selected.length) {
        value = isNaN(value) ? value : parseInt(value);
        _selected = $.inArray(value, selected) > -1;
    }

    if (!_selected && value == '') {
        _selected = true;
    }

    _option.selected = _selected;

    return _option;
}

OipaCompareFilters.prototype.create_filter_attributes = function(objects, columns, key) {
    var self = this;
    //console.log(objects);

    if (['left-cities', 'right-cities', 'left-countries', 'right-countries'].indexOf(key) !== -1) {
        //console.log(self.selection.get("cities"));


        if ($('#' + key + '-select').get().length == 0) {
            var _holder = self.init_holder(key);
        } else {
            var _holder = $('#' + key + '-select').get()[0];

            var _keys = Object.keys(_holder._options);

            for (var option = 0; option <= _keys.length; option++) {
                _holder.removeChild(_holder.childNodes[0]);
            }
        }

        var _ = key.split('-');
        var selected = $(this.selection.get_side(_[0], _[1], [])).map(
            function(__, option) {
                return option.id;
            });

        _holder.disabled = !self.get_select_status(key);
        _holder._options = {};
        _holder._default_option = self.init_option(
            key,
            {
                'left-cities': "SELECT CITY 1",
                'right-cities': "SELECT CITY 2",
                'left-countries': "SELECT COUNTRY 1",
                'right-countries': "SELECT COUNTRY 2"
            }[key],
            '',
            selected);
        _holder.appendChild(_holder._default_option);

        var mapped_keys = Object.keys(objects).sort(function(a, b) {
            var _name_1 = objects[a];
            var _name_2 = objects[b];
            if (_name_1 < _name_2) {
                return -1;
            }
            if (_name_1 > _name_2) {
                return 1;
            }
            return 0;
        });

        $.each(mapped_keys, function(_, code) {
            _holder._options[code] = self.init_option(
                key,
                objects[code],
                code,
                selected);
            _holder.appendChild(_holder._options[code]);
        });

        $('#' + key + '-filters').html(_holder);

        var onInit = function() {
            if (key == 'left-countries') {
                if ($('#left-cities-filters select').val() == undefined
                    && $(_holder).val() == '') {
                    $('.left-countries-helper').fadeIn();
                }
            }
        };

        $('#' + key + '-filters select').selectric({
            responsive: true,
            onInit: onInit,
            onOpen: function() {
                $('.helper-popup').fadeOut();
            }
        });


    } else {
        self.create_indicator_filter_attributes(objects, columns);
    }

    self.activate_reset_and_favorites();
};

OipaCompareFilters.prototype.load_indicator_paginate_listeners = function(){
    var self = this;
    var _status = self.get_select_status('indicators');
    $('#indicator-filter-wrapper li a').each(function(_, a) {
        if (_status) {
            $(a).addClass('btn btn-success');
        } else {
            $(a).addClass('btn btn-default');
        }
    });

    $("#indicators-pagination li a").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass('btn-success')) {
            // btn-success determinates whether button is active or not.

            var is_active = $(this).parent().hasClass('active');
            $("#indicators-pagination li").removeClass("active");
            $("#indicators-filters .filter-page").hide();

            if (is_active) {
                $('#indicator-filter-wrapper .slide-content').hide();
            } else {
                $('#indicator-filter-wrapper .slide-content').show();
                $(this).parent().addClass("active");

                var name = $(this).attr("name");
                $(".filter-page-"+name).show();
        }
        }
    });

    $(".filter-indicator-type-text").click(function(e){
        e.preventDefault();
        $(this).find("span.urbnnrs-arrow").toggleClass("urbnnrs-arrow-active");
        $(this).closest(".filter-indicator-type-dropdown").children(".filter-indicator-type-inner").toggle(500);
    });
}

OipaCompareFilters.prototype.show_helper = function(selector) {
    if ($('#' + selector + '-select').val() == '') {
        $('.' + selector + '-helper').fadeIn();
    }
}

OipaCompareFilters.prototype.reset_filters = function(){

    $("#"+this.filter_wrapper_div+" input[type=checkbox]").attr('checked', false);
    $("#location-filter-wrapper select option[value='']").attr('selected', true);
    $("#location-filter-wrapper select").each(function(_, b) {
        if (b.id !== 'left-countries-select') {
            b.disabled = true;
        }
        $(b).selectric('refresh')
    });
    $('#indicator-filter-wrapper .slide-content').hide();

    $('#indicator-filter-wrapper .indicator-category-button').removeClass('btn-success').addClass('btn-default');

    $('.helper-popup').fadeOut();
    $('.left-countries-helper').fadeIn();

    this.selection.clean('indicators');
    this.selection.search = "";
    this.selection.query = "";
    this.selection.clean('country');
    this.selection.clean('city');
    this.selection.region = "";
    this.save(true);
    this.activate_reset_and_favorites();
}

OipaCompareFilters.prototype.activate_reset_and_favorites = function() {
    var _ = $('.sort-location select option:selected').map(function(a, b) {
        if (b.value !== '') {
            return b;
        }
    });

    if (_.length > 0) {
        $("#reset-compare-filters").removeClass('btn-default').addClass('btn-success');
        $(".add-to-favorites").removeClass('btn-default').addClass('btn-success');
    } else {
        $("#reset-compare-filters").removeClass('btn-success').addClass('btn-default');
        $(".add-to-favorites").removeClass('btn-success').addClass('btn-default');
    }
}

OipaCompareFilters.prototype.change_selection = function(key, value, callback) {
    if ($('#' + key + '-select').get().length !== 0) {
        $('#' + key + '-select').val(value);
        $('#' + key + '-select').get()[0].disabled = false;
        $('#' + key + '-select').selectric('refresh');
    } else {
        console.log('neh');
    }
}

$('.indicators-pagination a').click(function(e) {
    $('.indicators-helper').hide();
})

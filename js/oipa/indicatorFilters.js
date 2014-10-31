function OipaIndicatorFilters(){
    this.validate_selection = function () {
        if (Oipa.pageType == "indicators") {
            if (this.selection.indicators.length == 0){
                // set error message and break
                $(".filter-error-msg").text("Please select at least one indicator.");
                return false;
            } else {
                // empty the error msg div
                $(".filter-error-msg").text("");
                return true;
            }
        } else {
            return true;
        }
    }

    this.get_url = function(selection, parameters_set) {
        // get url from filter selection object
        if (parameters_set){
            var cururl = search_url + "indicator-filter-options/?format=json" + parameters_set;
        } else {
            var cururl = search_url + "indicator-filter-options/?format=json" + "&indicators__in=" + get_parameters_from_selection(this.selection.indicators) + "&regions__in=" + get_parameters_from_selection(this.selection.regions) + "&countries__in=" + get_parameters_from_selection(this.selection.countries) + "&cities__in=" + get_parameters_from_selection(this.selection.cities);
        }
        return cururl;
    };

        this.process_filter_options = function(data) {
            var columns = 4;
            // load filter html and implement it in the page
            $.each(data, function(key, value) {
                if (!$.isEmptyObject(value)) {
                    if ($.inArray(key, ["indicators", "regions"]) > -1) {
                        columns = 2;
                    } else {
                        columns = 4;
                    }
                    filter.create_filter_attributes(value, columns, key);
                }
            });

            // reload aangevinkte vakjes
            this.initialize_filters();
        };


        this.create_indicator_filter_attributes = function(objects, columns) {
                var html = '';
                var paginatehtml = '';
                var per_col = 6;

                var sortable = $.map(objects, function(val, key) {
                    return [[key, val]];
                }).sort(function(a, b){
                        var nameA=a[1].name.toString().toLowerCase(), nameB=b[1].name.toString().toLowerCase();
                        if (nameA < nameB) { //sort string ascending
                                return -1;
                        }
                        if (nameA > nameB) {
                                return 1;
                        }
                        return 0; //default return value (no sorting)
                });

                var categories = {};
                var ivaluetranslation = {
                    rural: 'Rural area',
                    city_core: 'City core',
                    urban_area:'Urban area',
                    "City core": "city core",
                    sub_urban_area: 'Sub-urban area',
                    sub_urban:'Sub-urban area',
                    total:'Total'
                };

                for (var i = 0;i < sortable.length;i++){
                        var sortablename = sortable[i][1].name;
                        var categoryname = sortable[i][1].category;

                        if (columns == 4 && sortablename.length > 32){
                                sortablename = sortablename.substr(0,28) + "...";
                        } else if (columns == 3 && sortablename.length > 40){
                                sortablename = sortablename.substr(0,36) + "...";
                        }

                        if (!(categoryname in categories)){
                                categories[categoryname] = [];
                        }
                        var splitted_name = sortable[i][1].name.split(" – ");

                        if(splitted_name.length > 1){
                                // indicator with subdivision name example: Urban population - City core
                                // group by indicator name before -
                                var indicator_id = sortable[i][0];
                                var indicator_name = splitted_name[0];
                                var subindicators = new Object();
                                subindicators[indicator_id] = splitted_name[1];

                                for (var y = i;y < sortable.length;y++){
                                        var next_splitted_name = sortable[y][1].name.split(" – ");
                                        if(next_splitted_name.length > 1){
                                                if (next_splitted_name[0] == indicator_name){
                                                        subindicators[sortable[y][0]] = {"filter_name": next_splitted_name[1], "display_name": sortable[y][1].name};
                                                        i = y;
                                                }
                                        }
                                }

                                var indicatoroptionhtml = '<div class="filter-indicator-type-dropdown"><a href="#" class="filter-indicator-type-text"><span class="urbnnrs-arrow"></span>'+indicator_name+'</a><div class="filter-indicator-type-inner">';
                                $.each(subindicators, function( ikey, ivalue ) {
                                        indicatoroptionhtml += '<div class="checkbox"><label><input type="checkbox" selection_type="'+ivalue.filter_name+'" value="'+ikey+'" id="'+ikey+'" name="'+ivalue.display_name+'" />'+ivalue.filter_name+'</label></div>';
                                });
                                indicatoroptionhtml += "</div></div>";
                        } else {
                                var indicatoroptionhtml = '<div class="checkbox"><label><input type="checkbox" value="'+ sortable[i][0] +'" id="'+sortable[i][1].name.toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'" name="'+sortable[i][1].name+'" />'+sortablename+' </label></div>';
                        }
                        categories[categoryname].push(indicatoroptionhtml);
                }

                paginatehtml += '<ul>';
                $.each(categories, function( key, value ) {

                        var items_per_col = Math.ceil(value.length / 2);
                        var ugly_category_name = key.toString().toLowerCase().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc');

                        html += '<div class="row filter-page filter-page-'+ugly_category_name+'">';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        $.each(value, function( ikey, ivalue ) {
                                if (ikey == items_per_col){
                                        html += '</div><div class="col-md-6 col-sm-6 col-xs-12">';
                                }
                                html += ivalue;

                        });

                        html += '</div></div>';

                        paginatehtml += '<li><a href="#" class="indicator-category-button" name="'+ugly_category_name+'">'+key+'</a></li>';

                });

                paginatehtml += '</ul>';

                // get pagination attributes and add both pagination + filter options to div
                $("#indicators-pagination").html(paginatehtml);
                $("#indicators-filters").html(html);
                this.load_indicator_paginate_listeners();
                this.update_selection_after_filter_load();
        };

        this.load_indicator_paginate_listeners = function(){
                $("#indicators-pagination li a").click(function(e){
                        e.preventDefault();
                        $("#indicators-pagination li").removeClass("active");
                        $(this).parent().addClass("active");
                        var name = $(this).attr("name");
                        $("#indicators-filters .filter-page").hide();
                        $(".filter-page-"+name).show();
                });

                $("#indicators-pagination li a:first").click();

                $(".filter-indicator-type-text").click(function(e){
                        e.preventDefault();
                        $(this).find("span.urbnnrs-arrow").toggleClass("urbnnrs-arrow-active");
                        $(this).closest(".filter-indicator-type-dropdown").children(".filter-indicator-type-inner").toggle(500);
                });
        }
}
OipaIndicatorFilters.prototype = new OipaFilters();

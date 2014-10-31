function OipaFilters() {
    this.data = null;
    this.selection = null;
    this.firstLoad = true;
    this.perspective = null;
    this.filter_wrapper_div = "my-tab-content";

    this.init = function(){
        // check url parameters -> selection
        this.get_selection_from_url();

        // get url
        var url = this.get_url();

        // get data, this will trigger process filters etc.
        this.get_data(url);
    };

    this.string_to_id = function(name) {
        return string_to_id(name);
    }

    this.get_raw_data = function() {
        return this.data;
    }

    this.save = function(dont_update_selection) {
        if(!dont_update_selection){
            // update OipaSelection object
            this.update_selection_object();
            var validated = this.validate_selection();
            if (!validated){
                return false;
            }
        }

        Oipa.refresh();
        return true;
    };

    this.get_selection_from_url = function(){
        var url_pars = window.location.search.substring(1);
        var selection = [];

        if (url_pars !== '') {
            var vars = url_pars.split("&");

            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                var vals = pair[1].split(",");
                for(var y=0;y<vals.length;y++){
                    // To do when selection box is in place -> update name / type when filters are loaded
                    //this.selection.update_selection(pair[0], vals[y], "Loading...", "Slum dwellers");
                }
            }
        }
    };

    this.validate_selection = function (){
        // override
        return true;
    };

    this.update_selection_object = function(){
        // set selection as filter and load results
        this.selection.sectors = this.get_checked_by_filter("sectors");
        this.selection.countries = this.get_checked_by_filter("countries");
        this.selection.budgets = this.get_checked_by_filter("budgets");
        this.selection.regions = this.get_checked_by_filter("regions");
        this.selection.indicators = this.get_checked_by_filter("indicators");
        this.selection.cities = this.get_checked_by_filter("cities");
        this.selection.start_planned_years = this.get_checked_by_filter("start_planned_years");
        this.selection.donors = this.get_checked_by_filter("donors");

        if (!Oipa.default_organisation_id) {
            this.selection.reporting_organisations = this.get_checked_by_filter("reporting_organisations");
        }

    };

    this.get_selection_object = function() {
        // set selection as filter and load results
        var current_selection = new OipaSelection();

        current_selection.sectors = this.get_checked_by_filter("sectors");
        current_selection.countries = this.get_checked_by_filter("countries");
        current_selection.budgets = this.get_checked_by_filter("budgets");
        current_selection.regions = this.get_checked_by_filter("regions");
        current_selection.indicators = this.get_checked_by_filter("indicators");
        current_selection.cities = this.get_checked_by_filter("cities");
        current_selection.start_planned_years = this.get_checked_by_filter("start_planned_years");
        current_selection.donors = this.get_checked_by_filter("donors");

        if (!Oipa.default_organisation_id) {
            current_selection.reporting_organisations = this.get_checked_by_filter("reporting_organisations");
        }
        return current_selection;
    };

    this.get_checked_by_filter = function(filtername) {
        var arr = [];
        // on indicators save selection type (city core, sub urban area etc.)
        if (filtername === "indicators") {
            jQuery('#' + filtername + '-filters input:checked').each(function(index, value){
                var selection_type = jQuery(this).attr("selection_type");

                if (selection_type === undefined){
                    selection_type = null;
                }

                arr.push({"id":value.value, "name":value.name, 'type':selection_type});
            });
            return arr;
        }

        jQuery('#' + filtername + '-filters input:checked').each(function(index, value){
            arr.push({"id":value.value, "name":value.name});
        });
        return arr;
    };

    this.get_url = function(selection, parameters_set){
        // override
    };

    this.get_data = function(url) {
        var self = this;

        jQuery.support.cors = true;

        if (window.XDomainRequest) {
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
                self.data = jsondata;
                self.process_filter_options(jsondata);
            };
            setTimeout(function () {
                xdr.send();
            }, 0);
        } else {
            jQuery.ajax({
                type: 'GET',
                url: url,
                contentType: "application/json",
                dataType: 'json',
                success: function(data) {
                    self.data = data;
                    self.process_filter_options(data);
                    self.after_filter_load();
                    self.save(true);
                }
            });
        }
    };

    this.after_filter_load = function(){
        // overload
    }

    this.process_filter_options = function(data) {
        var columns = 4;
        var filter = this;

        // projects page etc.

        // load filter html and implement it in the page
        jQuery.each(data, function( key, value ) {
            if (!jQuery.isEmptyObject(value)){
                if (jQuery.inArray(key, ["sectors"])){ columns = 2; }
                filter.create_filter_attributes(value, columns, key);
            }
        });

        var budgetfilters = this.get_budget_filter_options();

        // reload checked boxes
        this.initialize_filters();
    };

        this.get_budget_filter_options = function(){

                var budgetfilters = [];
                budgetfilters.push(["0-20000", { "name": "&lt;US$20K" }]);
                budgetfilters.push(["20000-100000", { "name": "US$20K-US$100K" }]);
                budgetfilters.push(["100000-1000000", { "name": "US$100K-US$1M" }]);
                budgetfilters.push(["1000000-5000000", { "name": "US$1M-US$5M" }]);
                budgetfilters.push(["5000000", { "name": ">US$5M" }]);

                return budgetfilters;
        }

    this.initialize_filters = function(selection){
        if (!selection){
            selection = this.selection;
        }

        jQuery('#map-filter-overlay input:checked').prop('checked', false);
        if (typeof selection.sectors !== "undefined") { this.init_filters_loop(selection.get('sectors')) };
        if (typeof selection.countries !== "undefined") { this.init_filters_loop(selection.get('countries')) };
        if (typeof selection.budgets !== "undefined") { this.init_filters_loop(selection.get('budgets')) };
        if (typeof selection.regions !== "undefined") { this.init_filters_loop(selection.get('regions')) };
        if (typeof selection.indicators !== "undefined") { this.init_filters_loop(selection.get('indicators')) };
        if (typeof selection.cities !== "undefined") { this.init_filters_loop(selection.get('cities')) };
        if (typeof selection.reporting_organisations !== "undefined") {
            this.init_filters_loop(selection.get('reporting_organisations'));
        };

        this.after_initialize_filters();
    };

        this.after_initialize_filters = function(){
                // override
        }

        this.init_filters_loop = function(arr){
                for(var i = 0; i < arr.length;i++){
                        jQuery(':checkbox[value=' + arr[i].id + ']').prop('checked', true);
                }
        };

        this.create_filter_attributes = function(objects, columns, attribute_type){
                if (attribute_type === "indicators"){
                        this.create_indicator_filter_attributes(objects, columns);
                        return true;
                }

                var html = '';
                var per_col = 6;

                var sortable = [];
                for (var key in objects){
                        sortable.push([key, objects[key]]);
                }
                sortable.sort(function(a, b){
                        var nameA=a[1].toString().toLowerCase(), nameB=b[1].toString().toLowerCase();
                        if (nameA < nameB) { //sort string ascending
                                return -1; 
                        }
                        if (nameA > nameB) {
                                return 1;
                        }
                        return 0; //default return value (no sorting)
                });

                var page_counter = 1;
                html += '<div class="row filter-page filter-page-1">';
        
                for (var i = 0;i < sortable.length;i++){

                        if (i%per_col == 0){
                                if (columns == 2){
                                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                                } else {
                                        html += '<div class="col-md-3 col-sm-3 col-xs-6">';
                                }
                        }

                        var sortablename = sortable[i][1];
                        if (columns == 4 && sortablename.length > 32){
                                sortablename = sortablename.substr(0,28) + "...";
                        } else if (columns == 3 && sortablename.length > 40){
                                sortablename = sortablename.substr(0,36) + "...";
                        }

                        html += '<div class="checkbox">';
                        html += '<label><input type="checkbox" value="'+ sortable[i][0] +'" id="'+sortable[i][1].toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'" name="'+sortable[i][1]+'" />'+sortablename+'</label></div>';
        
                        if (i%per_col == (per_col - 1)){
                                html += '</div>';
                        }
                        if ((i + 1) > ((page_counter * (per_col * columns))) - 1) { 
                
                                html += '</div>';
                                page_counter = page_counter + 1;
                                html += '<div class="row filter-page filter-page-' + page_counter + '">';
                        }
                }

                /// if paginated, close the pagination.
                if (page_counter > 1){
                        html += '</div>';
                }

                // if no elements found
                if(sortable.length == 0){
                        html += '<div class="row filter-page filter-page-1">';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12" style="margin-left: 20px;">';
                        html += 'No ' + attribute_type + ' available in the current selection.';
                        html += '</div></div>';
                }

                // get pagination attributes and add both pagination + filter options to div
                jQuery("#"+attribute_type+"-pagination").html(this.paginate(1, page_counter));
                jQuery("#"+attribute_type+"-filters").html(html);
                this.load_paginate_listeners(attribute_type, page_counter);
                this.update_selection_after_filter_load();
        };



        this.update_selection_after_filter_load = function(){
                // TO DO
                // we know the selection
                // we know the filters
                // set checked if selection option still exists
                // remove from filters if not
        };

        this.paginate = function(cur_page, total_pages){

                // range of num links to show
                var range = 2;
                var paging_block = "";

                if (cur_page == 1){ paging_block += '<a href="#" class="pagination-btn-previous btn-prev"></a>'; } 
                else { paging_block += '<a href="#" class="pagination-btn-previous btn-prev">&lt; previous</a>'; }
                paging_block += "<ul>";

                if (cur_page > (1 + range)){ paging_block += "<li><a href='#'>1</a></li>"; }
                if (cur_page > (2 + range)){ paging_block += "<li>...</li>"; }

                // loop to show links to range of pages around current page
                for (var x = (cur_page - range); x < ((cur_page + range) + 1); x++) { 
                   // if it's a valid page number...
                   if ((x > 0) && (x <= total_pages)) {
                          if (x == cur_page) { paging_block += "<li class='active'><a>"+x+"</a></li>"; } 
                          else { paging_block += "<li><a href='#'>"+x+"</a></li>"; } // end else
                   } // end if 
                } // end for

                if(cur_page < (total_pages - (1 + range))){ paging_block += "<li>...</li>"; }
                if(cur_page < (total_pages - range)){ paging_block += "<li><a href='#' class='page'><span>"+total_pages+"</span></a></li>"; }      
                paging_block += "</ul>";

                // if not on last page, show forward and last page links                
                if (cur_page != total_pages) { paging_block += '<a href="#" class="pagination-btn-next btn-next">next &gt;</a>'; } 
                else { paging_block += '<a href="#" class="pagination-btn-next btn-next"></a>'; } // end if
                /****** end build pagination links ******/
                
                return paging_block;
        };

        this.load_paginate_listeners = function(attribute_type, total_pages){

                // load pagination filters
                jQuery("#"+attribute_type+"-pagination ul a").click(function(e){
                        e.preventDefault();
                        var page_number = jQuery(this).text();
                        jQuery("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
                        filter.load_paginate_page(attribute_type, page_number);
                        filter.load_paginate_listeners(attribute_type, total_pages);
                });

                jQuery("#"+attribute_type+"-pagination .pagination-btn-next").click(function(e){
                        e.preventDefault();
                        var page_number = jQuery("#"+attribute_type+"-pagination .active a").text();
                        page_number = parseInt(page_number) + 1;
                        jQuery("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
                        filter.load_paginate_page(attribute_type, page_number);
                        filter.load_paginate_listeners(attribute_type, total_pages);
                });

                jQuery("#"+attribute_type+"-pagination .pagination-btn-previous").click(function(e){
                        e.preventDefault();
                        var page_number = jQuery("#"+attribute_type+"-pagination .active a").text();
                        page_number = parseInt(page_number) - 1;
                        jQuery("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
                        filter.load_paginate_page(attribute_type, page_number);
                        filter.load_paginate_listeners(attribute_type, total_pages);
                });
                
        };

        this.load_paginate_page = function(attribute_type, page_number){
                // hide all pages
                jQuery("#"+attribute_type+"-filters .filter-page").hide();
                jQuery("#"+attribute_type+"-filters .filter-page-"+page_number).show();
        };

        this.reload_specific_filter = function(filter_name, data){
                if (!data){
                        filters = this;

                        // get selection
                        selection = this.selection;//this.get_selection_object();

                        // get data
            var url;
                        if (filter_name === "left-cities") { url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) + "&countries__in=" + get_parameters_from_selection(selection.left.countries) ); }
                        if (filter_name === "right-cities") { url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) + "&countries__in=" + get_parameters_from_selection(selection.right.countries) ); }
                        if (filter_name === "indicators") { url = this.get_url(null, "&regions__in=" + get_parameters_from_selection(selection.regions) + "&countries__in=" + get_parameters_from_selection(selection.countries) + "&cities__in=" + get_parameters_from_selection(selection.cities) ); }
            if (filter_name === "compare-indicators") {
                var _cities = get_parameters_from_selection(selection.get('cities', []));
                url = this.get_url(
                    null,
                    "&regions__in=" + get_parameters_from_selection(selection.get('regions', []))
                    + "&countries__in=" + get_parameters_from_selection(selection.get('countries', []))
                    + "&cities__in=" + _cities
                );
                filter_name = 'indicators';
            }
                        if (filter_name === "regions") { url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) ); }
                        if (filter_name === "countries") { url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) + "&regions__in=" + get_parameters_from_selection(selection.regions) ); }
                        if (filter_name === "cities") { url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) + "&regions__in=" + get_parameters_from_selection(selection.regions) + "&countries__in=" + get_parameters_from_selection(selection.countries) ); }

                        jQuery.support.cors = true;

                        if(window.XDomainRequest){
                                var xdr = new XDomainRequest();
                                xdr.open("get", url);
                                xdr.onprogress = function () { };
                                xdr.ontimeout = function () { };
                                xdr.onerror = function () { };
                                xdr.onload = function() {
                                        var jsondata = jQuery.parseJSON(xdr.responseText);
                                        if (jsondata === null || typeof (jsondata) === 'undefined')
                                        {
                                                jsondata = jQuery.parseJSON(jsondata.firstChild.textContent);
                                        }
                                        filters.reload_specific_filter(filter_name, jsondata);
                                };
                                setTimeout(function () {xdr.send();}, 0);
                        } else {
                                jQuery.ajax({
                                        type: 'GET',
                                        url: url,
                                        contentType: "application/json",
                                        dataType: 'json',
                                        success: function(data){
                                                filters.reload_specific_filter(filter_name, data);
                                        }
                                });
                        }

                } else {
                        // reload filters
                        columns = 4;
                        if (filter_name === "left-cities") { this.create_filter_attributes(data.cities, columns, 'left-cities'); }
                        if (filter_name === "right-cities") { this.create_filter_attributes(data.cities, columns, 'right-cities'); }
                        if (filter_name === "indicators" && Oipa.pageType == "compare") { 
                                this.create_filter_attributes(data.countries, columns, 'left-countries');
                                this.create_filter_attributes(data.countries, columns, 'right-countries');
                                this.create_filter_attributes(data.cities, columns, 'left-cities');
                                this.create_filter_attributes(data.cities, columns, 'left-cities');
                        }
                        if (filter_name === "regions") { this.create_filter_attributes(data.regions, 2, 'regions'); }
                        if (filter_name === "countries") { this.create_filter_attributes(data.countries, columns, 'countries'); }
                        if (filter_name === "cities") { this.create_filter_attributes(data.cities, columns, 'cities'); }
                        if (filter_name === "indicators" && Oipa.pageType == "indicators") { this.create_filter_attributes(data.indicators, 2, 'indicators'); }

                        this.initialize_filters(selection);
                }
        };


        this.reset_filters = function(){
                jQuery("#"+this.filter_wrapper_div+" input[type=checkbox]").attr('checked', false);
                filter.selection.search = "";
                filter.selection.query = "";
                filter.selection.country = "";
                filter.selection.region = "";
                filter.save();
        }

}

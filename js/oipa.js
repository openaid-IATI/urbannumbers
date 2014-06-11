
function OipaSelection(main){
	this.cities = [];
	this.countries = [];
	this.regions = [];
	this.sectors = [];
	this.budgets = [];
	this.query = [];
	this.indicators = [];
	this.reporting_organisation = [];
	this.url = null;

	if (main){
		this.url = new OipaUrl();
	}
}

var Oipa = {
	pageType: null,
	mainSelection: new OipaSelection(1),
	maps : [],
	refresh_maps : function(){
		for (var i = 0; i < this.maps.length; i++){
			this.maps[i].refresh();
		}
	},
	visualisations : [],
	refresh_visualisations : function(){
		for (var i = 0; i < this.visualisations.length; i++){
			this.visualisations[i].refresh();
		}
	}
};

function OipaIndicatorSelection(main){
	this.cities = [];
	this.countries = [];
	this.regions = [];
	this.indicators = [];
	this.url = null;

	if (main){
		this.url = new OipaUrl();
	}
}

function OipaCompareSelection(main){
	this.left = [];
	this.left.cities = [];
	this.left.countries = [];
	this.left.regions = [];

	this.right = [];
	this.right.cities = [];
	this.right.countries = [];
	this.right.regions = [];

	this.indicators = [];

	if (main){
		this.url = new OipaUrl();
	}
}

function OipaProjectList(){
	this.offset = 0;
	this.per_page = 25;
	this.order_by = null;
}

function OipaMap(){
	this.map = null;
	this.selection = null;
	this.slider = null;
	this.basemap = "zimmerman2014.hmj09g6h";
	this.tl = null;
	this.compare_left_right = null;

	this.set_map = function(div_id){

		$("#"+div_id).css("min-height", "300px");
		this.map = L.map(div_id, {
			attributionControl: false,
			scrollWheelZoom: false,
			zoom: 3,
			minZoom: 2,
			maxZoom:12,
			continuousWorld: 'false'
		}).setView([10.505, 25.09], 3);

		this.tl = L.tileLayer('https://{s}.tiles.mapbox.com/v3/'+this.basemap+'/{z}/{x}/{y}.png', {
			maxZoom: 12
		}).addTo(this.map);
	};

	this.refresh = function(){
		if (Oipa.pageType == "compare"){
			if (this.compare_left_right == "left"){
				// load map on left selection city
				if (filter.selection.left.cities.length > 1){
					console.log(filter.selection);
					this.set_map(filter.selection.left.cities[0].id);
				}
			}
			if (this.compare_left_right == "right"){
				// load map on right selection city
				if (filter.selection.right.cities.length > 1){
					this.set_map(filter.selection.right.cities[0].id);
				}
			}
		}


	};

	this.change_basemap = function(basemap_id){
		this.tl._url = "https://{s}.tiles.mapbox.com/v3/"+basemap_id+"/{z}/{x}/{y}.png";
		this.tl.redraw();
	};

	this.set_city = function(city_id) {
		var city = new OipaCity();
		city.id = city_id;

		url = search_url + "cities/?format=json&id=" + city_id;

		$.support.cors = true;
	
		if(window.XDomainRequest){
		var xdr = new XDomainRequest();
		xdr.open("get", url);
		xdr.onprogress = function () { };
		xdr.ontimeout = function () { };
		xdr.onerror = function () { };
		xdr.onload = function() {
			var jsondata = $.parseJSON(xdr.responseText);
			if (jsondata == null || typeof (jsondata) == 'undefined')
			{
				jsondata = $.parseJSON(data.firstChild.textContent);
				city.set_compare_data(jsondata);
			}
			
		}
		setTimeout(function () {xdr.send();}, 0);
		} else {

			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'json',
				success: function(data){
					city.set_compare_data(data);
				}
			});
		}

		return city;
	}
}

var OipaCompare = {
	item1 : null,
	item2 : null,
	refresh_state : 0,
	refresh_comparison: function(){
		leftmap.map.setView(this.item1.latlng, 10);
		rightmap.map.setView(this.item2.latlng, 10);
		$("#compare-left-title").text(this.item1.name);
		$("#compare-right-title").text(this.item2.name);
	},
	randomize: function(){
		// get cities
		var left_cities = [];
		$("#left-cities-filters input").each(function(){
			left_cities.push($(this).val());
		});

		var right_cities = [];
		$("#right-cities-filters input").each(function(){
			right_cities.push($(this).val());
		});


		// choose 2 random ones
		var city_id_1 = get_random_city_within_selection(left_cities);
		var city_id_2 = get_random_city_within_selection(right_cities, city_id_1);
		console.log(caller);
		console.log(left_cities);
		console.log(right_cities);

		var city_1 = leftmap.set_city(city_id_1);
		this.item1 = city_1;
		var city_2 = rightmap.set_city(city_id_2);
		this.item2 = city_2;
	}
}

function OipaCity(){
	this.id = null;
	this.name = null;
	this.latlng = null;

	this.set_compare_data = function(data){
		this.name = data.objects[0].name;
		this.latlng = geo_point_to_latlng(data.objects[0].location);
		OipaCompare.refresh_state++;
		if (OipaCompare.refresh_state > 1){
			
			OipaCompare.refresh_state = 0;
			// refresh map
			OipaCompare.refresh_comparison();
		}
		
	}
}


function OipaFilters(){

	this.data = null;
	this.selection = null;
	this.firstLoad = true;

	this.update_selection_object = function(){

		// set selection as filter and load results
		this.selection.sectors = this.get_checked_by_filter("sectors");
		this.selection.countries = this.get_checked_by_filter("countries");
		this.selection.budgets = this.get_checked_by_filter("budgets");
		this.selection.regions = this.get_checked_by_filter("regions");
		this.selection.indicators = this.get_checked_by_filter("indicators");
		this.selection.cities = this.get_checked_by_filter("cities");
		this.selection.reporting_organisations = this.get_checked_by_filter("reporting_organisations");

		// reload visualisations / maps --> should be call to Oipa object?
	};

	this.update_compare_selection_object = function(){
		this.selection.left.countries = this.get_checked_by_filter("left-countries");
		this.selection.left.cities = this.get_checked_by_filter("left-cities");
		this.selection.right.countries = this.get_checked_by_filter("right-countries");
		this.selection.right.cities = this.get_checked_by_filter("right-cities");
		this.selection.indicators = this.get_checked_by_filter("indicators");

		// reload visualisations / maps --> should be call to Oipa object?


	};

	this.get_compare_selection = function(){
		var new_selection = new OipaCompareSelection();
		new_selection.left.countries = this.get_checked_by_filter("left-countries");
		new_selection.left.cities = this.get_checked_by_filter("left-cities");
		new_selection.right.countries = this.get_checked_by_filter("right-countries");
		new_selection.right.cities = this.get_checked_by_filter("right-cities");
		new_selection.indicators = this.get_checked_by_filter("indicators");
		return new_selection;
	}

	this.get_checked_by_filter = function(filtername){
		var arr = [];
		$('#' + filtername + '-filters input:checked').each(function(index, value){
			arr.push({"id":value.value, "name":value.name});
		});
		return arr;
	};

	this.init = function(){

		// check url parameters -> selection


		// get url
		var url = this.get_url();

		// get data, this will trigger process filters etc.
		this.get_data(url);
	};

	this.save = function(){
		
		// update OipaSelection object
		this.update_compare_selection_object();

		// reload maps
		Oipa.refresh_maps();

		// reload visualisations
		Oipa.refresh_visualisations();

	};

	this.save_compare = function(){

		this.update_compare_selection_object();

	};

	this.get_url = function(selection, parameters_set){
		// get url from filter selection object
		if (Oipa.pageType === "compare"){
			if (parameters_set){
				return search_url + "indicator-city-filter-options/?format=json" + parameters_set;
			}
			var cururl = search_url + "indicator-city-filter-options/?format=json" + "&indicators__in=" + get_parameters_from_selection(this.selection.indicators);
		}

		if (Oipa.pageType === "indicators"){
			var cururl = search_url + "indicator-filter-options/?format=json" + "&indicators__in=" + get_parameters_from_selection(this.selection.indicators) + "&regions__in=" + get_parameters_from_selection(this.selection.regions) + "&countries__in=" + get_parameters_from_selection(this.selection.countries) + "&cities__in=" + get_parameters_from_selection(this.selection.cities);
		}

		return cururl;
	};

	this.get_data = function(url){

		// filters
		var filters = this;
		
		$.support.cors = true;

		if(window.XDomainRequest){
		var xdr = new XDomainRequest();
		xdr.open("get", url);
		xdr.onprogress = function () { };
		xdr.ontimeout = function () { };
		xdr.onerror = function () { };
		xdr.onload = function() {
			var jsondata = $.parseJSON(xdr.responseText);
			if (jsondata === null || typeof (jsondata) === 'undefined')
			{
				jsondata = $.parseJSON(jsondata.firstChild.textContent);
				filters.process_filter_options(jsondata);
				filters.data = jsondata;
			}
		};
		setTimeout(function () {xdr.send();}, 0);
		} else {
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'json',
				success: function(data){
					filters.process_filter_options(data);
					filters.data = data;
				}
			});
		}
	};

	this.process_filter_options = function(data){

		var columns = 4;
		var filter = this;


		if (Oipa.pageType === "compare"){

			this.create_filter_attributes(data.countries, columns, 'left-countries');
			this.create_filter_attributes(data.countries, columns, 'right-countries');

			this.create_filter_attributes(data.cities, columns, 'left-cities');
			this.create_filter_attributes(data.cities, columns, 'right-cities');

			this.create_filter_attributes(data.indicators, 2, 'indicators');

			if (this.firstLoad === true) { firstLoad = false; OipaCompare.randomize(); }

		} else if (Oipa.pageType === "indicators") {

			// load filter html and implement it in the page
			$.each(data, function( key, value ) {
				
				if (!$.isEmptyObject(value)){
					if ($.inArray(key, ["indicators", "regions"]) > -1){ columns = 2; } else { columns = 4; }
					filter.create_filter_attributes(value, columns, key);
				}
			});
		} else {
			// projects page etc.

			// load filter html and implement it in the page
			$.each(data, function( key, value ) {
				if (!$.isEmptyObject(value)){
					if ($.inArray(key, ["sectors"])){ columns = 2; }
					filter.create_filter_attributes(value, columns, key);
				}
			});
		}

		// reload aangevinkte vakjes
		this.initialize_filters();
	};

	this.initialize_filters = function(){

		$('#map-filter-overlay input:checked').prop('checked', false);
		if (typeof this.selection.sectors !== "undefined") { this.init_filters_loop(this.selection.sectors) };
		if (typeof this.selection.countries !== "undefined") { this.init_filters_loop(this.selection.countries) };
		if (typeof this.selection.budgets !== "undefined") { this.init_filters_loop(this.selection.budgets) };
		if (typeof this.selection.regions !== "undefined") { this.init_filters_loop(this.selection.regions) };
		if (typeof this.selection.indicators !== "undefined") { this.init_filters_loop(this.selection.indicators) };
		if (typeof this.selection.cities !== "undefined") { this.init_filters_loop(this.selection.cities) };
		if (typeof this.selection.reporting_organisations !== "undefined") { this.init_filters_loop(this.selection.reporting_organisations) };
	
		//fill_selection_box();
	};

	this.init_filters_loop = function(arr){
		for(var i = 0; i < arr.length;i++){
			$(':checkbox[value=' + arr[i].id + ']').prop('checked', true);
		}
	};

	this.create_filter_attributes = function(objects, columns, attribute_type){

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

		// get pagination attributes and add both pagination + filter options to div
		$("#"+attribute_type+"-pagination").html(this.paginate(1, page_counter));
		$("#"+attribute_type+"-filters").html(html);
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
		$("#"+attribute_type+"-pagination ul a").click(function(e){
			e.preventDefault();
			var page_number = $(this).text();
			$("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
			filter.load_paginate_page(attribute_type, page_number);
			filter.load_paginate_listeners(attribute_type, total_pages);
		});

		$("#"+attribute_type+"-pagination .pagination-btn-next").click(function(e){
			e.preventDefault();
			var page_number = $("#"+attribute_type+"-pagination .active a").text();
			page_number = parseInt(page_number) + 1;
			$("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
			filter.load_paginate_page(attribute_type, page_number);
			filter.load_paginate_listeners(attribute_type, total_pages);
		});

		$("#"+attribute_type+"-pagination .pagination-btn-previous").click(function(e){
			e.preventDefault();
			var page_number = $("#"+attribute_type+"-pagination .active a").text();
			page_number = parseInt(page_number) - 1;
			$("#"+attribute_type+"-pagination").html(filter.paginate(page_number, total_pages));
			filter.load_paginate_page(attribute_type, page_number);
			filter.load_paginate_listeners(attribute_type, total_pages);
		});
		
	};

	this.load_paginate_page = function(attribute_type, page_number){
		// hide all pages
		$("#"+attribute_type+"-filters .filter-page").hide();
		$("#"+attribute_type+"-filters .filter-page-"+page_number).show();
	};

	this.load_compare_filter_listeners = function(){
		// on select of regions, reload cities

		// on country select, update cities

		// on indicator select, update countries / cities

	};

	this.reload_specific_filter = function(filter_name, data){

		if (!data){

			filters = this;

			// get selection
			selection = this.get_compare_selection();

			// get data
			if (filter_name === "left-cities") { var url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) + "&countries__in=" + get_parameters_from_selection(selection.left.countries) ); }
			if (filter_name === "right-cities") { var url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) + "&countries__in=" + get_parameters_from_selection(selection.right.countries) ); }
			if (filter_name === "indicators") { var url = this.get_url(null, "&indicators__in=" + get_parameters_from_selection(selection.indicators) ); }

			$.support.cors = true;

			if(window.XDomainRequest){
				var xdr = new XDomainRequest();
				xdr.open("get", url);
				xdr.onprogress = function () { };
				xdr.ontimeout = function () { };
				xdr.onerror = function () { };
				xdr.onload = function() {
					var jsondata = $.parseJSON(xdr.responseText);
					if (jsondata === null || typeof (jsondata) === 'undefined')
					{
						jsondata = $.parseJSON(jsondata.firstChild.textContent);
						filters.reload_specific_filter(filter_name, jsondata);
					}
				};
				setTimeout(function () {xdr.send();}, 0);
			} else {
				$.ajax({
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
			if (filter_name === "indicators") { 
				this.create_filter_attributes(data.countries, columns, 'left-countries');
				this.create_filter_attributes(data.countries, columns, 'right-countries');
				this.create_filter_attributes(data.cities, columns, 'left-cities');
				this.create_filter_attributes(data.cities, columns, 'left-cities');
			}
		}
	};

	this.get_specific_filter_data = function(){

	};

}

function ProjectFilters(){
	ProjectFilters.prototype = Object.create(OipaFilters.prototype);

	// create filter options of one particular filter type, objects = the options, columns = amount of columns per filter page
	function create_project_filter_attributes(objects, columns){
		var html = '';
		var per_col = 20;


		var sortable = [];
		for (var key in objects){
			if (objects[key].name === null){
				objects[key].name = "Unknown";
			}
			sortable.push([key, objects[key]]);
		}
	
		sortable.sort(function(a, b){
			var nameA=a[1].name.toString().toLowerCase(), nameB=b[1].name.toString().toLowerCase();
			if (nameA < nameB) { //sort string ascending
				return -1; 
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0; //default return value (no sorting)
		});

		var page_counter = 1;
		html += '<div class="filter-page filter-page-1">';
		
		for (var i = 0;i < sortable.length;i++){

			if (i%per_col == 0){
				html += '<div class="span' + (12 / columns) + '">';
			}
			var sortablename = sortable[i][1].name;
			if (columns === 4 && sortablename.length > 32){
				sortablename = sortablename.substr(0,28) + "...";
			} else if (columns === 3 && sortablename.length > 46){
				sortablename = sortablename.substr(0,42) + "...";
			}
			var sortableamount = sortable[i][1].total.toString();

			html += '<div class="squaredThree"><div>';
			html += '<input type="checkbox" value="'+ sortable[i][0] +'" id="'+sortable[i][0]+sortable[i][1].name.toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'" name="'+sortable[i][1].name+'" />';
			html += '<label class="map-filter-cb-value" for="'+sortable[i][0]+sortable[i][1].name.toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc')+'"></label>';
			html += '</div><div class="squaredThree-fname"><span>'+sortablename+' (' + sortableamount + ')</span></div></div>';
			if (i%per_col === (per_col - 1)){
				html += '</div>';
			}
			if ((i + 1) > ((page_counter * (per_col * columns))) - 1) {
			
			
				html += '</div>';
				page_counter = page_counter + 1;
				html += '<div class="filter-page filter-page-' + page_counter + '">';
			}

		}

		html += '<div class="filter-total-pages" name="' + page_counter + '"></div>';

		/// if paginated, close the pagination.
		if (page_counter > 1){
			html += '</div>';
		}
		
		return html;
	}
}

function OipaUrl(){

	this.get_selection_from_url = function(){
		var query = window.location.search.substring(1);
			if(query !== ''){
				var vars = query.split("&");
				for (var i=0;i<vars.length;i++) {
					var pair = vars[i].split("=");
				var vals = pair[1].split(",");
				current_selection[pair[0]] = [];

				for(var y=0;y<vals.length;y++){
					if (pair[0] !== "query"){
						this[pair[0]].push({"id":vals[y], "name":"unknown"});
					} else{
						this[pair[0]].push({"id":vals[y], "name":vals[y]});
					}
				}
			}
		}
	};

	this.set_current_url = function(){
		var link = document.URL.toString().split("?")[0] + build_parameters();
		if (history.pushState) {
			history.pushState(null, null, link);
		}
	};

	this.build_parameters = function (api_call){

		// switch

		// build current url based on selection made
		var url = '?p=';
		if (typeof oipaSelection.sectors !== "undefined") { url += this.build_current_url_add_par("sectors", oipaSelection.sectors); }
		if (!exclude_countries){
			if (typeof oipaSelection.countries !== "undefined") { url += this.build_current_url_add_par("countries", oipaSelection.countries); }
		}
		if (typeof oipaSelection.budgets !== "undefined") { url += this.build_current_url_add_par("budgets", oipaSelection.budgets); }
		if (typeof oipaSelection.regions !== "undefined") { url += this.build_current_url_add_par("regions", oipaSelection.regions); }
		if (typeof oipaSelection.indicators !== "undefined") { url += this.build_current_url_add_par("indicators", oipaSelection.indicators); }
		if (typeof oipaSelection.cities !== "undefined") { url += this.build_current_url_add_par("cities", oipaSelection.cities); }
		if (typeof oipaSelection.reporting_organisations !== "undefined") { url += this.build_current_url_add_par("reporting_organisations", oipaSelection.reporting_organisations); }
		if (typeof oipaSelection.offset !== "undefined") { url += this.build_current_url_add_par("offset", oipaSelection.offset); }
		if (typeof oipaProjectList.per_page !== "undefined") { url += this.build_current_url_add_par("per_page", oipaProjectList.per_page); }
		if (typeof oipaProjectList.order_by !== "undefined") { url += this.build_current_url_add_par("order_by", oipaProjectList.order_by); }
		if (typeof oipaProjectList.query !== "undefined") { url += this.build_current_url_add_par("query", oipaProjectList.query); }
		if (url === '?p='){return '';}
		url = url.replace("?p=&", "?");

		return url;
	};

	this.build_current_url_add_par = function(name, arr, dlmtr){

		if(dlmtr === undefined){
			dlmtr = ",";
		}

		if(arr.length === 0){return '';}
		var par = '&' + name + '=';
		for(var i = 0; i < arr.length;i++){
			par += arr[i].id.toString() + dlmtr;
		}
		par = par.substr(0, par.length - 1);

		return par;
	};
}


function OipaVis(){
	this.type = null;
	this.data_url = null;
	this.parameters = [];

	this.export = function(filetype){
		new OipaExport(this, filetype);
	};

	this.embed = function(){
		var embed = new OipaEmbed(this);
	};

	this.get_url = function(){

	};

	this.refresh = function(){

	};

}


function OipaTableChart(){
	OipaTableChart.prototype = Object.create(OipaVis.prototype);

}

function OipaLineChart(){
	OipaLineChart.prototype = Object.create(OipaVis.prototype);

}

function OipaBubbleChart(){
	OipaBubbleChart.prototype = Object.create(OipaVis.prototype);

}

function OipaExport(vis, filetype){
	this.visualisation = vis;
	this.filetype = filetype;
	
	function render(){

	}

}

function OipaEmbed(vis){
	this.visualisation = vis;


}





var OipaSelectionBox = {
	fill_selection_box: function(){

		var html = '';
		var indicatorhtml = '';
		if ((typeof current_selection.sectors !== "undefined") && (current_selection.sectors.length > 0)) { html += fill_selection_box_single_filter("SECTORS", current_selection.sectors); }
		if ((typeof current_selection.countries !== "undefined") && (current_selection.countries.length > 0)) { html += fill_selection_box_single_filter("COUNTRIES", current_selection.countries); }
		if ((typeof current_selection.budgets !== "undefined") && (current_selection.budgets.length > 0)) { html += fill_selection_box_single_filter("BUDGETS", current_selection.budgets); }
		if ((typeof current_selection.regions !== "undefined") && (current_selection.regions.length > 0)) { html += fill_selection_box_single_filter("REGIONS", current_selection.regions); }
		if ((typeof current_selection.cities !== "undefined") && (current_selection.cities.length > 0)) { html += fill_selection_box_single_filter("CITIES", current_selection.cities); }
		if ((typeof current_selection.indicators !== "undefined") && (current_selection.indicators.length > 0)) { indicatorhtml = fill_selection_box_single_filter("INDICATORS", current_selection.indicators); }
		if ((typeof current_selection.reporting_organisations !== "undefined") && (current_selection.reporting_organisations.length > 0)) { indicatorhtml = fill_selection_box_single_filter("REPORTING_ORGANISATIONS", current_selection.reporting_organisations); }
		if ((typeof current_selection.query !== "undefined") && (current_selection.query.length > 0)) { html += fill_selection_box_single_filter("QUERY", current_selection.query); }
		$("#selection-box").html(html);
		$("#selection-box-indicators").html(indicatorhtml);
		this.init_remove_filters_from_selection_box();
	},
	fill_selection_box_single_filter: function(header, arr){

		var html = '<div class="select-box" id="selected-' + header.toLowerCase() + '">';
		html += '<div class="select-box-header">';
		if (header === "INDICATORS" && selected_type === "cpi"){ header = "DIMENSIONS"; }
		if (header === "QUERY"){header = "SEARCH"; }
		if (header === "REPORTING_ORGANISATIONS"){header = "REPORTING ORGANISATIONS"; }
		html += header;
		html += '</div>';

		for(var i = 0; i < arr.length; i++){
			html += '<div class="select-box-selected">';
			html += '<div id="selected-' + arr[i].id.toString().replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc') + '" class="selected-remove-button"></div>';

			if (arr[i].name.toString() == 'unknown'){
				arr[i].name = $(':checkbox[value=' + arr[i].id + ']').attr("name");
			}

			html += '<div>' + arr[i].name + '</div>';
			if (header == "INDICATORS" || header == "DIMENSIONS"){
				html += '<div class="selected-indicator-color-filler"></div><div class="selected-indicator' + (i + 1).toString() + '-color"></div>';
			}
			html += '</div>';
		}

		html += '</div>';
		return html;
	},
	init_remove_filters_from_selection_box: function (){

		$(".selected-remove-button").click(function(){
			var id = $(this).attr('id');
			id = id.replace("selected-", "");
			var filtername = $(this).parent().parent().attr('id');
			filtername = filtername.replace("selected-", "");
			var arr = current_selection[filtername];
			for (var i = 0; i < arr.length;i++){
				if(arr[i].id === id){
					// arr.splice(i, 1);
					$('input[name="' + arr[i].name + '"]').attr('checked', false);
					break;
				}
			}
			this.save_selection();
		});
	}
};


function geo_point_to_latlng(point_string){
	point_string = point_string.replace("POINT (", "");
	point_string = point_string.substring(0, point_string.length - 1);
	lnglat = point_string.split(" ");
	latlng = [lnglat[1], lnglat[0]];
	return latlng;
}


function get_parameters_from_selection(arr){
	dlmtr = ",";
	var str = '';

	if(arr.length > 0){
	  for(var i = 0; i < arr.length; i++){
	    str += arr[i].id + dlmtr;
	  }
	  str = str.substring(0, str.length-1);
	}
  
	return str;
}




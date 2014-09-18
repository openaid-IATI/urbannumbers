$("#main-map .change-basemap-link").click(function(e){
	e.preventDefault();
	var basemap_id = $(this).attr("name");
	map.change_basemap(basemap_id);
});

$("#left-map .change-basemap-link").click(function(e){
	e.preventDefault();
	var basemap_id = $(this).attr("name");
	leftmap.change_basemap(basemap_id);
});

$("#right-map .change-basemap-link").click(function(e){
	e.preventDefault();
	var basemap_id = $(this).attr("name");
	rightmap.change_basemap(basemap_id);
});

$(".filters-save-button").click(function(e){
	e.preventDefault();
	var saved = filter.save();
	if (saved){
		$(".sort-list .active .opener").click();
	}
});

$("#reset-filters").click(function(e){
	e.preventDefault();
	filter.reset_filters();
});

$(".compare-filters-save-button").click(function(e){
	e.preventDefault();
	var saved = filter.save();
	if (saved){
		$(".sort-list .active .opener").click();
	}

});

$("#compare-cities-randomize").click(function(e){

	e.preventDefault();
	OipaCompare.randomize();

});

$("#indicator-filter-wrapper .filter-open").click(function(e){
	var filtername = $(this).attr("name");
	filter.reload_specific_filter(filtername);

});

function get_random_city_within_selection(selection, already_chosen){
	var rand = selection[Math.floor(Math.random() * selection.length)];

	if(already_chosen){
		if(rand==already_chosen){
			rand = get_random_city_within_selection(selection, already_chosen);
		}
	}

	return rand;
}

$("#opener-left-cities").click(function(e){
	e.preventDefault();
	filter.reload_specific_filter("left-cities", null);
});

$("#opener-right-cities").click(function(e){
	e.preventDefault();
	filter.reload_specific_filter("right-cities", null);
});

$("#header-login-register-button").click(function(e){
    if ($(this).attr("href") == "#"){
        e.preventDefault();
        display_login_form();
    }
});

$("#lost-password-login").click(function(e){
	e.preventDefault();
	$("#urbannumbers-login").hide();
	$("#urbannumbers-lostpassword").show();

});

$("#register-button").click(function(e){
	e.preventDefault();	
	$("#urbannumbers-register").show();
	$("#urbannumbers-login").hide();
});

$("#delete-account-button").click(function(e){
	e.preventDefault();
	$("#hoover-wrapper").show();
	$("#urbannumbers-remove-account").show();
});

$(".close-login").click(function(e){
	e.preventDefault();
	$("#hoover-wrapper").hide();
	$("#urbannumbers-login").hide();
	$("#urbannumbers-register").hide();
	$("#urbannumbers-lostpassword").hide();
});




$("#map-indicator-filter-wrapper .map-indicator-header").click(function(e) {
    e.preventDefault();
    $("#map-indicator-filter-wrapper .sort-list").toggle();
});

$("#map-indicator-filter-wrapper .filter-open").click(function(e){
    e.preventDefault();
    var filtername = $(this).attr("name");
    this.has_listener=true;
    $("#map-indicator-filter-wrapper .sort-list ul").each(function(_, v) {
        var _skip = false;
        $(v.className.split(' ')).each(function(_, a) {
            if (a.split('-')[0] == filtername) {
                _skip = true;
            }
        });

        if (!_skip) {
            $(v).css("display", "none");
        }
    });
    $("#map-indicator-filter-wrapper ." + filtername + "-list").toggle();
    filter.reload_specific_filter(filtername);
});


function UnhabitatOipaCompareFilters(){
	this.get_url = function(selection, parameters_set){
		// get url from filter selection object
		if (parameters_set){
			var cururl = search_url + "indicator-filter-options/?format=json&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity&adm_division__in=city" + parameters_set;
		} else {
			var cururl = search_url + "indicator-filter-options/?format=json&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity&adm_division__in=city&indicators__in=" + get_parameters_from_selection(this.selection.indicators);
		}
		
		return cururl;
	};
}
UnhabitatOipaCompareFilters.prototype = new OipaCompareFilters();

function UnhabitatOipaIndicatorFilters() {
    OipaIndicatorFilters.call(this);
    this.get_url = function(selection, parameters_set){
        // get url from filter selection object
        if (parameters_set){
            var cururl = search_url + "indicator-filter-options/?format=json";//"&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity" + parameters_set;
        } else {
            var cururl = search_url + "indicator-filter-options/?format=json";//"&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity&indicators__in=" + get_indicator_parameters_from_selection(this.selection.indicators) + "&regions__in=" + get_parameters_from_selection(this.selection.regions) + "&countries__in=" + get_parameters_from_selection(this.selection.countries) + "&cities__in=" + get_parameters_from_selection(this.selection.cities);
        }
        
        return cururl;
    };

    this.reset_filters = function(){
        jQuery("#"+this.filter_wrapper_div+" input[type=checkbox]").attr('checked', false);
        filter.selection.search = "";
        filter.selection.query = "";
        filter.selection.country = "";
        filter.selection.region = "";
        filter.selection.regions = [];
        filter.selection.cities = [];
        filter.selection.countries = [];
        filter.selection.indicators = [];
        //filter.selection.indicators.push({"id": "urban_population_countries", "name": "Urban population – Countries", "type": "Slum dwellers"});
        // TO DO: set checkboxes
        filter.save(true);
    }

};
UnhabitatOipaIndicatorFilters.prototype = Object.create(OipaIndicatorFilters.prototype);

function UnhabitatInMapOipaIndicatorFilters() {
    var self = this;
    UnhabitatOipaIndicatorFilters.call(self);

    self.make_option_element = function(id, value, sortablename, type) {
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

    self.make_option_with_subs_element = function(id, value, sortablename, subs) {
        id = self.string_to_id(id.toString());
        var _html = [
            '<li class="' + id + '-li">',
                '<div>',
                    '<a name="' + id + '" class="opener filter-open" href="#"><label>' + sortablename + '</label><span class="caret"></span></a>',
                '</div>',
                '<ul class="' + id + '-list subul">',
        ];

        $.each(subs, function(e, v) {
            _html.push(self.make_option_element(id, v.id, v.name, 'indicators'));
        });

        _html.push("</ul>", "</li>");
        return _html.join('');
    }
    
    self.string_to_id = function(name) {
        return name.replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc');
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
                                $("#map-indicator-filter-wrapper ." + _k + "-li").find('span.counts').html(_v);
                            } else {
                                $("#map-indicator-filter-wrapper ." + _k + "-li").find('span.counts').html('');
                            }
                        });
                    }
                } else {
                    if (value.length > 0) {
                        $("#map-indicator-filter-wrapper ." + key + "-li").find('span.counts').html(value.length);
                    } else {
                        $("#map-indicator-filter-wrapper ." + key + "-li").find('span.counts').html('');
                    }
                }
            }
        });

        //$("#map-indicator-filter-wrapper ." + attribute_type + "-li").find('span.counts').html(sortable.length);
        //$("#map-indicator-filter-wrapper ." + category_id + "-li").find('span.counts').html(value.counts);
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

        var html = '';

        $.each(sortable, function(_, v) {
            var sortablename = v[1];
            if (columns == 4 && sortablename.length > 32){
                sortablename = sortablename.substr(0,28) + "...";
            } else if (columns == 3 && sortablename.length > 40){
                sortablename = sortablename.substr(0,36) + "...";
            }
            html += self.make_option_element(v[1], v[0], sortablename, attribute_type);
        });

        $("#map-indicator-filter-wrapper ." + attribute_type + "-list").html(html);
        

        $("#map-indicator-filter-wrapper ." + attribute_type + "-list .map-filter-checkbox").change(function(e) {
            this.has_listener = true;
            if (this.checked) {
                filter.selection.update_selection(attribute_type, this.value, this.name, attribute_type);
            } else {
                filter.selection[attribute_type] = filter.selection.remove_from_selection(attribute_type, this.value);
            }
            self.update_selection_after_filter_load(filter.selection);
        });
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
                indicatoroptionhtml = self.make_option_with_subs_element(v[0], v[0], sortablename, v[1].subs);
            } else {
                categories[categoryname].counts += 1;
                indicatoroptionhtml = self.make_option_element(v[0], v[0], sortablename, 'indicators');
            }
            categories[categoryname].items.push(indicatoroptionhtml);
        });
    
        $.each(categories, function(category_name, value) {
            if (category_name == "") {
                return;
            }

            var category_id = self.string_to_id(category_name);
            $("#map-indicator-filter-wrapper ." + category_id + "-list").html(value.items.join(''));
        });
        
        $("#map-indicator-filter-wrapper .filter-open").click(function(e) {

            e.preventDefault();
            if (this.has_listener) {
                return;
            }
            $(this.parentNode.parentNode).find('ul').each(function(i,v) {
                $(v).toggle();
            });

                        //
            var filtername = $(this).attr("name");
            filter.reload_specific_filter(filtername);
        });

        $(".map-filter-checkbox").change(function(e) {
            if (this.checked) {
                filter.selection.update_selection('indicators', this.value, this.name, 1);
            } else {
                filter.selection['indicators'] = filter.selection.remove_from_selection('indicators', this.value);
            }
            self.update_selection_after_filter_load(filter.selection);
        });
    }

};
UnhabitatInMapOipaIndicatorFilters.prototype = Object.create(UnhabitatOipaIndicatorFilters.prototype);

function get_wiki_city_data(city_name, left_right_city){

	city_name = city_name.replace(" ", "_");

	//An approch to getting the summary / leading paragraphs / section 0 out of Wikipedia articlies within the browser using JSONP with the Wikipedia API: http://en.wikipedia.org/w/api.php

	// var url = "http://en.wikipedia.org/wiki/";
	// var title = url.split("/");
	// title = title[title.length - 1];
	var text = "";
	//Get Leading paragraphs (section 0)
	$.getJSON("http://en.wikipedia.org/w/api.php?action=parse&page=" + city_name + "&prop=text&section=0&format=json&callback=?", function (data) {
	   	
		var complete_text = "";

        if (data.parse) {
    	    for (text in data.parse.text) {
    	        var text = data.parse.text[text].split("<p>");
    	        var pText = "";

    	        for (p in text) {
    	            //Remove html comment
    	            text[p] = text[p].split("<!--");
    	            if (text[p].length > 1) {
    	                text[p][0] = text[p][0].split(/\r\n|\r|\n/);
    	                text[p][0] = text[p][0][0];
    	                text[p][0] += "</p> ";
    	            }
    	            text[p] = text[p][0];

    	            //Construct a string from paragraphs
    	            if (text[p].indexOf("</p>") == text[p].length - 5) {
    	                var htmlStrip = text[p].replace(/<(?:.|\n)*?>/gm, '') //Remove HTML
    	                var splitNewline = htmlStrip.split(/\r\n|\r|\n/); //Split on newlines
    	                for (newline in splitNewline) {
    	                    if (splitNewline[newline].substring(0, 11) != "Cite error:") {
    	                        pText += splitNewline[newline];
    	                        pText += "\n";
    	                    }
    	                }
    	            }
    	        }
    	        pText = pText.substring(0, pText.length - 2); //Remove extra newline
    	        pText = pText.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)
    	        text = unescape(pText);

    	        var begin_text = text.substring(0, 280);
    	        var end_text = text.substring(280);

    	        var end_text_untill_first_space = end_text.substr(0,end_text.indexOf(' '));
    	        var end_text = end_text.substr(end_text.indexOf(' ')+1);

    	        begin_text = begin_text + end_text_untill_first_space;

    	        complete_text = begin_text + '... <a target="_blank" href="http://en.wikipedia.org/wiki/'+city_name+'" class="wiki-read-more"> Read more at Wikipedia </a>';

    	        if (end_text == ""){
    	        	complete_text = begin_text;
    	        }

    	        if (begin_text != ""){
    	        	complete_text += '<div class="city-wikipedia-disclaimer">Source: Wikipedia - Disclaimer: excerpt not endorsed by UN-Habitat. </div>';
    	        }
        

    	        

    	    }
        } 

        jQuery("."+left_right_city+"-city-wikipedia").html(complete_text);
	});
}

function display_login_form() {


    $("#hoover-wrapper").show();
    $("#urbannumbers-login").show();
}


$('#ur-registration').submit(function(e) {
    e.preventDefault();
    var reg_nonce = $('#vb_new_user_nonce').val();
    var reg_pass  = $('#vb_pass').val();
    var reg_pass2  = $('#vb_pass2').val();
    var reg_mail  = $('#vb_email').val();
    var reg_first_name  = $('#vb_first_name').val();
    var reg_last_name  = $('#vb_last_name').val();

    var display_error = function(message) {
	$('.vb-registration-form .result-message').html(message).removeClass('alert-success').addClass('alert-danger');
    }
    var display_success = function(message) {
	$('.vb-registration-form .result-message').html(message).removeClass('alert-danger').addClass('alert-success');
    }

    // Do basic data sanitation
    if (reg_mail.trim() == "" || reg_pass.trim() == "" || reg_pass2.trim() == "") {
	display_error("Please fill in email and password fields.");
    }

    if (reg_pass.trim() !== reg_pass2.trim()) {
	display_error("Passwords did not match.");
    }

    var data = {
	"action": 'register_user',
        "username": reg_mail,
	"nonce": reg_nonce,
        "pass": reg_pass,
        "mail": reg_mail,
	"name": reg_first_name + ' ' + reg_last_name,
        "first_name": reg_first_name,
        "last_name": reg_last_name
    };

    var ajax_url = vb_reg_vars.vb_ajax_url;
    $.post(ajax_url, data, function(response) {
	display_success("Successfully registered. Now you can <a href='" + LOGIN_URL + "'>log in</a>.");
    }).fail(function(e) {
	//try {
	    var response = JSON.parse(e.responseText);
		var _msg = [];
		$.each(response.profile, function(field, error) {
		    _msg.push(error.join());
		});
		display_error(_msg.join("<br />"));
	    //}
	//} catch(e2) {
        //    display_error("Unable to reach registration database. Please try later.");
	//}
        
    });
});

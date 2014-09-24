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
            var cururl = search_url + "indicator-filter-options/?format=json&categories__in=Public%20spaces,Slum%20dwellers,City%20prosperity" + parameters_set;
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


$('.save-infographic').click(function(e) {
    e.preventDefault();
    if (this.name !== undefined && this.name.trim() !== "") {
        $.ajax({
          type: "POST",
          url: vb_reg_vars.vb_ajax_url,
          data: {
              action: 'favorite_infographic',
              infographic_id: this.name
          },
          success: function(data) {
              console.log('response', data);
          },
          error: function(xhr, status, e) {
              console.log(xhr, status, e);
          },
          dataType: 'json'
        });
    }
});
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


$(".compare-filters-save-button").click(function(e){
        e.preventDefault();
        var saved = filter.save();
        if (saved){
                $(".sort-list .active .opener").click();
        }

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

$("#reset-filters").click(function(e){
        e.preventDefault();
        filter.reset_filters();
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

        if (complete_text.trim() == "") {
            complete_text = "No excerpt availlable for this city";
        }
        jQuery("."+left_right_city+"-city-wikipedia").html(complete_text);
        }).error(function(a, b, c) {
            console.log('e');
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
        $('.vb-registration-form .result-message')
            .show()
            .html(message)
            .removeClass('alert-success')
            .addClass('alert-danger');
    }
    var display_success = function(message) {
        $('.vb-registration-form .result-message')
            .show()
            .html(message)
            .removeClass('alert-danger')
            .addClass('alert-success');
    }

    // Do basic data sanitation
    if (reg_mail.trim() == "" || reg_pass.trim() == "" || reg_pass2.trim() == "") {
        display_error("Please fill in email and password fields.");
        return;
    }

    if (reg_pass.trim() !== reg_pass2.trim()) {
        display_error("Passwords did not match.");
        return;
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
    $('.vb-registration-form .result-message').show();
    $('.vb-registration-form .result-message').removeClass('alert-danger').removeClass('alert-success').html("<img src='" + pathInfo.base + "images/ajax-loader.gif' alt='Loading...' />");

    $.post(ajax_url, data, function(response) {
        if (response.status == 'ok') {
            display_success(response.message);
        } else {
            display_error(response.message);
        }
    }, 'json').fail(function(e) {
        var response = JSON.parse(e.responseText);
        var _msg = [];
        $.each(response.profile, function(field, error) {
            _msg.push(error.join());
        });
        display_error(_msg.join("<br />"));
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

$('.share-btn').click(function(e) {
    e.preventDefault();

    if ($('.share-widget-input').val().trim() !== '') {
        return;
    }

    var _socials = {
        facebook: function(url) {
            return 'https://www.facebook.com/sharer/sharer.php?u=' + url;
        },
        linkedin: function(url, title) {
            return 'http://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + title;
        },
        twitter: function(url, title) {
           return  'http://twitter.com/home?status=' + title.replace('|', ':') + ' ' + url;
        },
        google: function(url, title) {
            return 'https://plus.google.com/share?url=' + title + ' ' + url;
        }
    }

    var _set_share_url = function(url) {
        $('.share-widget-input').val(url);
        
        var _title = (document.title.trim() !== '') ? document.title : 'UN-Habitat #opendata city data made accessible';

        $.each(_socials, function(name, func) {
            $('.share-widget .icon-' + name).attr('href', func(url, _title));
        });
    }


    var b = new jQuery.Bitly({login: 'ngaranko', key: 'R_f120a4d6170b11df97f5fd128cc3feab'});
    b.shorten(window.location.href, {
        onSuccess: function(short_url) {
            _set_share_url(short_url);
        },
        onError: function(data) {
            _set_share_url(window.location.href);
        }
    });
})

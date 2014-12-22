function geo_point_to_latlng(point_string){
    if (point_string === null) {
        return;
    }
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


function make_parameter_string_from_budget_selection(arr){

        var gte = '';
        var lte = '';
        var str = '';

        if(arr.length > 0){
          gte = '99999999999';
          lte = '0';
          for(var i = 0; i < arr.length; i++){
                curid = arr[i].id;
                lower_higher = curid.split('-');

                if(lower_higher[0] < gte){
                  gte = lower_higher[0];
                }

                if(lower_higher.length > 1){
                  if(lower_higher[1] > lte){
                        lte = lower_higher[1];
                  }
                }
          }
        }

        if (gte !== '' && gte != '99999999999'){
                str += '&total_budget__gt=' + gte;
        }
        if (lte !== '' && lte != '0'){
                str += '&total_budget__lt=' + lte;
        }

        return str;
}

function get_indicator_parameters_from_selection(arr){
        dlmtr = ",";
        var str = '';
        var selection_type_str = "&selection_type__in=";

        if(arr.length > 0){
                for(var i = 0; i < arr.length; i++){
                        str += arr[i].id + dlmtr;
                        if (arr[i].selection_type){
                                selection_type_str += arr[i].selection_type + dlmtr;
                        }
                }
                str = str.substring(0, str.length-1);
        }

        return str + selection_type_str;
}

function make_parameter_string_from_selection(arr, parameter_name){

        var parameters = get_parameters_from_selection(arr);
        if (parameters !== ''){
                return "&" + parameter_name + "=" + parameters;
        } else {
                return '';
        }
}

function make_parameter_string_from_query_selection(str, parameter_name){
        if (str !== ""){
                str = "&"+parameter_name+"=" + str;
        } else {
                str = "";
        }
        return str;
}

function get_activity_based_parameters_from_selection(selection) {
        var str_region = make_parameter_string_from_selection(selection.regions, "regions__in");
        var str_country = make_parameter_string_from_selection(selection.countries, "countries__in");
        var str_sector = make_parameter_string_from_selection(selection.sectors, "sectors__in");
        var str_budget = make_parameter_string_from_budget_selection(selection.budgets);
        var str_start_year = make_parameter_string_from_selection(selection.start_planned_years, "start_planned__in");
        var str_donor = make_parameter_string_from_selection(selection.donors, "participating_organisations__in");
        var str_reporting_organisation = make_parameter_string_from_selection(selection.reporting_organisations, "reporting_organisation__in");
        var str_search = make_parameter_string_from_query_selection(selection.query, "query");
        var str_country_search = make_parameter_string_from_query_selection(selection.country, "country");
        var str_region_search = make_parameter_string_from_query_selection(selection.region, "region");

        return str_region + str_country + str_sector + str_budget + str_start_year + str_donor + str_reporting_organisation + str_search + str_country_search + str_region_search;
}


function comma_formatted(amount) {
        if (amount){
                return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
                return "-";
        }
}

function replaceAll(o,t,r,c){
        var cs = "";
        if(c===1){
                cs = "g";
        } else {
                cs = "gi";
        }
        var mp=new RegExp(t,cs);
        ns=o.replace(mp,r);
        return ns;
}

function perform_cors_ajax_call_with_refresh_callback(url, current_object){

        jQuery.support.cors = true;

        if(window.XDomainRequest){
                var xdr = new XDomainRequest();
                xdr.open("get", url);
                xdr.onprogress = function () { };
                xdr.ontimeout = function () { };
                xdr.onerror = function () { };
                xdr.onload = function() {
                        var data = jQuery.parseJSON(xdr.responseText);
                        if (data === null || typeof (data) === 'undefined')
                        {
                                data = jQuery.parseJSON(data.firstChild.textContent);
                        }
                        current_object.refresh(data);
                };
                setTimeout(function () {xdr.send();}, 0);
        } else {
                jQuery.ajax({
                        type: 'GET',
                        url: url,
                        contentType: "application/json",
                        dataType: 'json',
                        success: function(data) {
                            if (Object.prototype.toString.call(data) !== '[object Object]') {
                                data = {};
                            }
                            current_object.refresh(data);
                        }
                });
        }
}


function humanReadableSize(number, units, no_suffix, no_number_formatting) {
    var thresh = 1000;
    var _format_number = function(num) {
        if ((num - parseInt(num)) === 0) {
            return num.toFixed(0);
        }

        return num.toFixed(2);
    };
    number = parseFloat(number);
    if (number < thresh) {
        if (no_suffix === undefined) {
            return _format_number(number) + '%';
        } else {
            return _format_number(number);
        }
    }

    units = ['K','M','B'];
    var u = -1;
    do {
        number /= thresh;
        ++u;
    } while(number >= thresh);

    if (units[u] === undefined) {
        return _format_number(number);
    }
    return _format_number(number) + ' ' + units[u];
}

function string_to_id(name) {
    if (!name) {
        return name;
    }
    return name.replace(/ /g,'').replace(',', '').replace('&', '').replace('%', 'perc');
}

function oipa_get_color(category) {
    category = string_to_id(category);

    var _colors = {
        'Cityprosperity': '253, 190, 44',
        'Slumdwellers': '164, 215, 42',
        'Population': '23, 131, 251',
        'Streets': '22, 220, 250',
        'Transport': '253, 23, 130',
        'Health': '254, 31, 23',
        'Resilience': '23, 255, 31',
        'Education': '248, 255, 23',
        'Crime': '0, 0, 0',
        'default': '182, 182, 182'
    };
    if (_colors[category] !== undefined) {
        return _colors[category];
    }
    return _colors['default'];
}

function toFixed(x) {
    var e;
    if (Math.abs(x) < 1.0) {
        e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
    }
    return x;
}

function curry( fn ){
    var slice = Array.prototype.slice,
        storedArgs = slice.call( arguments, 1 );

    return function() {
        var args = storedArgs.concat( slice.call( arguments ) );
        return fn.apply( this, args );
    };
}

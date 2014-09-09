
function OipaVis (){
    this.type = null; // override
    this.data = null;
    this.selection = null;
    this.name = null;
    this.indicator = null;
    this.chartwrapper = "#visualisation-block-wrapper";
    this.selected_year = null;

    this.init = function(){
        // Register event in event bus
        OipaWidgetsBus.add_listener(this);

        // create html
        var html = '<li id="visualization_' + this.indicator + '">';
        html += '<section class="container-box" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'">';
        html += '<header class="heading-holder" data-indicator="'+this.indicator+'"><h3>'+this.name+'</h3></header>';
        html += '<div class="box-content">';
        html +=  '<a href="#" class="btn-vis-zoom" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a>';
        html +=  '<a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a>';
        html +=  '<div class="widget" data-indicator="'+this.indicator+'"></div>';
        html +=  '<a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';
        if (this.limit){
            html += '<div class="vis-box-note">Showing top '+this.limit+', use filters to show a different selection, <a class="vis-box-show-all" href="#">click here to show all</a></div>';
        }
        html += '</div></section></li>';

        $("#visualisation-block-wrapper").append(html);
        this.load_listeners();
        this.refresh();
        this.check_if_in_favorites();

    };

    this.destroy = function() {
        OipaWidgetsBus.remove_listener(this);
        //map.remove_refresh_callback('OipaVis' + this.get_url());
        var node = document.getElementById('visualization_' + this.indicator);
        var holder = document.getElementById('visualisation-block-wrapper');
        holder.removeChild(node);
    }

    this.year_changed = function(year) {
        this.selected_year = year;
        this.refresh();
    };

    this.check_if_in_favorites = function(){

        var jsonString = this.get_save_string();

        var data = {
            'action': 'in_favorites',
            'visdata': jsonString
        };

        var curchart = this;
        
        $.post(ajaxurl, data, function(response) {
            if(response.status == "in_favorites"){
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
            }
        });
    };

    this.get_save_string = function(){
        // create the string this vis will be saved as.
        var vis_parameters = new Object();
        vis_parameters.type = this.type;
        //vis_parameters.selection = this.selection;
        vis_parameters.name = this.name;
        vis_parameters.indicator = this.indicator;
        vis_parameters.y_name = this.y_name;
        vis_parameters.y_format = this.y_format;
        vis_parameters.x_name = this.x_name;
        vis_parameters.x_format = this.x_format;
        vis_parameters.limit = this.limit;

        return (JSON.stringify(vis_parameters));
    };

    this.load_from_string = function(jsonString){
        // create the string this vis will be saved as.
        var vis_parameters = $.parseJSON( jsonString );

        this.type = vis_parameters.type;
        this.selection = vis_parameters.selection;
        this.name = vis_parameters.name;
        this.indicator = vis_parameters.indicator;
        this.y_name = vis_parameters.y_name;
        this.y_format = vis_parameters.y_format;
        this.x_name = vis_parameters.x_name;
        this.x_format = vis_parameters.x_format;
        this.limit = vis_parameters.limit;

        this.init();
    };

    this.favorite = function(){

        var savestring = this.get_save_string();
        var curchart = this;

        
        var htmlencoded = $('<div/>').text(savestring).html();
        var data = {
            'action': 'favorite_visualisation',
            'visdata': savestring
        };

        
        $.post(ajaxurl, data, function(response) {
            if(response.status == "log_in_first"){
                $("#header-login-register-button").click();
                $("#urbannumbers-login h1").text("Log in first");

            } else if (response.status == "already_in_favorites"){
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
            
            } else if (response.status == "saved"){
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
            }
        });
    };

    this.unfavorite = function(){
        var savestring = this.get_save_string();
        // remove from favorites via wp-ajax
        var data = {
            'action': 'unfavorite_visualisation',
            'visdata': savestring
        };

        var curchart = this;
        
        $.post(ajaxurl, data, function(response) {
            
            if(response.status == "log_in_first"){
                $("#header-login-register-button").click();

            } else if (response.status == "not_in_favorites"){
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");
                
            } else if (response.status == "removed_from_favorites"){
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");
            }
        });

    };

    this.refresh_data = function(data, force) {
        this.data = data;
        this.refresh(data, force);
    }

    this.refresh = function(data, force) {
        if (force || (!data && !this.data)){
            // get url
            var url = this.get_url();

            // get data
            this.get_data(url, force);
            
        } else {
            if (data) {
                this.visualize(data);
            } else {
                this.visualize(this.data);
            }
        }
    };

    this.export = function(filetype){
        new OipaExport(this, filetype);
    };

    this.embed = function(){
        var embed = new OipaEmbed(this);
    };

    this.get_url = function(){
        var str_region = get_parameters_from_selection(this.selection.regions);
        var str_country = get_parameters_from_selection(this.selection.countries);
        var str_city = get_parameters_from_selection(this.selection.cities);
        var str_indicators = get_parameters_from_selection(this.selection.indicators);
        var str_limit = "";

        if(this.limit){
            str_limit = "&limit=" + this.limit;
        }

        return search_url + 'indicator-data/?format=json'+str_limit+'&countries__in=' + str_country + '&regions__in=' + str_region + '&cities__in=' + str_city + '&indicators__in=' + str_indicators;
    };

    this.forced_get_data = function(url) {
        var self = this;

        $.support.cors = true;

        if (window.XDomainRequest) {
            var xdr = new XDomainRequest();
            xdr.open("get", url);
            xdr.onprogress = function () { };
            xdr.ontimeout = function () { };
            xdr.onerror = function () { };
            xdr.onload = function() {
                var jsondata = $.parseJSON(xdr.responseText);
                if (jsondata === null || typeof (jsondata) === 'undefined') {
                    jsondata = $.parseJSON(jsondata.firstChild.textContent);
                    self.refresh_data(jsondata);
                }
            };
            setTimeout(function () {xdr.send();}, 0);
        } else {
            $.ajax({
                type: 'GET',
                url: url,
                contentType: "application/json",
                dataType: 'json',
                success: function(data) {
                    self.refresh_data(data);
                }
            });
        }
    }

    this.get_data = function(url, force){
        // filters
        var self = this;
        if (force) {
            this.forced_get_data(url);
        }
        // Data for this graphs comes from widgetbus
        return;
    }

    this.getRandomColor = function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    this.format_data = function(data){
        // override
    };

    this.visualize = function(data){
        // override 
    };

    this.zoom_in = function(){
        $("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"'] .glyphicon-zoom-in").removeClass("glyphicon-zoom-in").addClass("glyphicon-zoom-out");
        $("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"']").css('position', 'fixed').css('width', '90%').css('height', '90%').css('margin', '3% 5%').css('z-index', '9999999').css('top', '0').css('left', '0').css('background-color', 'white');
        $("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"'] svg").css("height", "90%").css("width", "90%"); $(window).resize();
    };

    this.zoom_out = function(){
        $("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"'] .glyphicon-zoom-out").removeClass("glyphicon-zoom-out").addClass("glyphicon-zoom-in");
        $("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"']").css('position', 'relative').css('width', 'auto').css('height', 'auto').css('margin', 'auto').css('z-index', '1').css('top', 'auto').css('left', 'auto').css('background-color', 'transparent');
        $(window).resize();
    };

    this.load_listeners = function(){

        var curchart = this;

        
        $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .btn-vis-close").click(function(e){
            e.preventDefault();
            
            // TO DO: on deletion of vis, remove vis from Oipa.visualisations

            $(this).closest("li").hide(500, function(){
                $(this).remove();
            });
            
        });

        $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .btn-vis-zoom").click(function(e){
            e.preventDefault();

            if ($("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-zoom-in").length){ // if unzoomed
                curchart.zoom_in();
            } else { // zoomed, so zoom out
                curchart.zoom_out();
            }
        });

        $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .vis-box-show-all").click(function(e){
            e.preventDefault();
            curchart.limit = null;
            curchart.refresh();
        });

        $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .btn-vis-save").click(function(e){
            e.preventDefault();
            if($("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star-empty").length > 0){
                curchart.favorite();
            } else {
                curchart.unfavorite();
            }
        });
    };

    this.remove = function(){
        this.destroy();
    }

}

function OipaTableChart(){
    this.type = "OipaTableChart";

}
OipaTableChart.prototype = new OipaVis();



function OipaColumnChart(){
    this.type = "OipaColumnChart";

    this.format_data = function(data){

        var d = [];     
        var locs = [];
        var indicators = [];
        
        // get geolocs
        $.each(data, function(key, value){

            if ($.inArray(value.indicator_friendly, indicators) < 0){
                indicators[key] = value.indicator_friendly;
            }

            $.each(value.locs, function(ikey, ivalue){
                if ($.inArray(ivalue.id, locs) < 0){
                    locs[ikey] = ivalue.name;
                }
            });
        });

        // bv. Helsinki
        for(var lockey in locs) {

            locval = locs[lockey];

            var curcity = {
                key: locval,
                values: []
            };
            
            for(var indkey in indicators) {

                indval = indicators[indkey];

                if(jQuery.inArray(lockey, data[indkey].locs)){
                    for (var firstyear in data[indkey].locs[lockey].years){

                        var modindval = indval;
                        if(modindval.indexOf('–') !== -1){

                            modindval = indval.split('–')[1];
                        }


                        var curindicator = { 
                            "label" : modindval,
                            "value" : data[indkey].locs[lockey].years[firstyear]
                        }
                        curcity.values.push(curindicator);
                        break;
                    }
                }
            }
            d.push(curcity);
        }

        if (d.length < 1){
            return null;
        }
        return d;
    };

    this.visualize = function(data){

        var current_vis = this;

        var data = current_vis.format_data(data);

        if (!data){
            // empty data, remove vis
            this.remove();
            return false;
        }

        nv.addGraph(function() {
            var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })    //Specify the data accessors.
            .y(function(d) { return d.value })
            .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
            .tooltips(true)        //Don't show tooltips
            .showValues(true)       //...instead, show the bar value right on top of each bar.
            .transitionDuration(350)
            .color(['#aec7e8', '#7b94b5', '#486192'])
            ;

            

            d3.select('section[data-indicator="'+current_vis.indicator+'"][data-vis-type="'+current_vis.type+'"] svg')
                .datum(data)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    };

}
OipaColumnChart.prototype = new OipaVis();





function OipaActiveChart(id) {
    this.id = id;
    this.y_name = null;
    this.y_format = null;
    this.x_name = null;
    this.x_format = null;
    this.limit = 5;
    this.chart = null;
    this.year_data = {};

    this.get_year_slice = function(locations, year, limit) {
        var self = this;
        // Get last year slice if year is null

        year = (year==null?2014:year);
        var _mapped = $.map(locations, function(i, _) {
            return [{
                value: i.years[year],
                color: i.color,
                stroke_color: i.stroke_color,
                name: i.name
            }];
        });
        _mapped.sort(function(a, b) {
            return a.value < b.value ? -1 : (a.value > b.value ? 1 : 0);
        });
        _mapped.reverse();
        return _mapped.slice(0, limit);
    }

    this.get_last_data_year = function(data) {
        return Math.max.apply(null, $.map(Object.keys(data.locs[Object.keys(data.locs)[0]].years), function(i) {return parseInt(i);}));
    }

    // TODO: optimize this crap, it gets slow even with 3 indicators
    this.format_year_data = function(data, year, limit){
        var self = this;
        if (year == null) {
            year = self.get_last_data_year(data);
        }

        var data_slice = self.get_year_slice(data.locs, year, limit);

        var base_data = {
            labels: [],
            datasets: [{
                label: data.indicator_friendly,
                fillColor: (data_slice[0].color == undefined) ? "rgba(151,187,205,1)" : data_slice[0].color,
                strokeColor: (data_slice[0].stroke_color == undefined) ? "rgba(151,187,205,2)" : data_slice[0].stroke_color,
                pointColor: (data_slice[0].color == undefined) ? "rgba(151,187,205,1)" : data_slice[0].color,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: $.map(data_slice, function(loc, _) { return loc.value;})
            }]
        }

        if (data_slice[0].value !== undefined) {
            // Update dataset only if data available for this year
            base_data.labels = $.map(data_slice, function(loc, _) { return loc.name;});
            base_data.datasets[0].data = $.map(data_slice, function(loc, _) { return loc.value;});
        }

        return base_data;
    }

    this.format_data = function(data) {
        // the to be used data is this.data, that's still in the API call's format. We need to transform it to values to be used for the line chart
        var curchart = this;
        var returned_data = [];
        $.each(data[curchart.indicator].locs, function(key, value){

            // each key is a city / country, so draw i line per key
            var line_data = [];
            $.each(value.years, function(year, yearvalue){
                line_data.push({x: year, y: yearvalue});
            });

            var color = curchart.getRandomColor();
            returned_data.push({values: line_data, key: value.name, color: color});
        });

        //Line chart data should be sent as an array of series objects.
        return returned_data;
    }

    this.init_chart = function(chart_data) {
        // Defaults to Line
        return this.chart_obj.Line(chart_data);
    }

    this.get_chart_points = function(chart) {
        return chart.datasets[0].points;
    }

    this.get_chart_labels = function(chart) {
        return chart.scale.xLabels;
    }

    this.visualize = function(data) {
        var self = this;

        if (!data) {
            data = this.data;
        }
        //data = self.format_data(data);   //You need data...

        if (!data || data[self.indicator] == undefined){
            // empty data, remove vis
            return false;
        }

        data = data[self.indicator];
        chart_data = self.format_year_data(data, self.selected_year, 10);


        if (!self.chart) {
            var ctx = document.createElement('canvas');
            ctx.height = 300;
            ctx.width = 340;

            $(".heading-holder[data-indicator='" + self.indicator + "']").find('h3').each(function(_, node) {
                node.innerHTML = data.indicator_friendly;
            });
            $("div.widget[data-indicator='" + self.indicator + "']").each(function(_, node) {
                node.appendChild(ctx);
            });
            self.chart_obj = new Chart(ctx.getContext("2d"));
            self.chart = self.init_chart(chart_data);
        } else {
            // Refresh
            if (chart_data.labels) {
                $.each(chart_data.labels, function(_id, label) {
                    self.get_chart_labels(self.chart)[_id] = label;
                    self.get_chart_points(self.chart)[_id].value = chart_data.datasets[0].data[_id];
                    self.get_chart_points(self.chart)[_id].label = label;
                });
            } else {
                // pie, radar etc
                // Redraw chart only if data isset
                if (chart_data[0].value !== undefined) {
                 $.each(chart_data, function(i, v) {
                     self.chart.segments[i].label = v.label;
                     self.chart.segments[i].value = v.value;
                 });
                }
            }
            self.chart.update();

        }
    }
    return this;
}
OipaActiveChart.prototype = new OipaVis();

function OipaActiveRoundChart(id) {
    this.format_year_data = function(data, year, limit){
        var self = this;
        if (year == null) {
            year = self.get_last_data_year(data);
        }
        
        var data_slice = self.get_year_slice(data.locs, year, limit);
        return $.map(data_slice, function(i, _) {
            var _color = (i.color==undefined ? self.getRandomColor() : i.color);
            var _stroke_color = (i.stroke_color==undefined?_color:i.stroke_color);
            return {
                value: i.value,
                label: i.name,
                color: _color,
                stroke_color: _stroke_color,
                highlight: _stroke_color
            };
        });
    }
}
OipaActiveRoundChart.prototype = new OipaActiveChart();


function OipaLineChart(id) {
    this.id = id;
    this.type = "OipaLineChart";

    return this;
}
OipaLineChart.prototype = new OipaActiveChart();


function OipaBarChart(id) {
    this.id = id;
    this.type = "OipaBarChart";
    this.init_chart = function(chart_data) {
        return this.chart_obj.Bar(chart_data);
    }
    this.get_chart_points = function(chart) {
        return chart.datasets[0].bars;
    }
    return this;
}
OipaBarChart.prototype = new OipaActiveChart();


function OipaRadarChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";
    this.init_chart = function(chart_data) {
        return this.chart_obj.Radar(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
    return this;
}
OipaRadarChart.prototype = new OipaActiveChart();


function OipaPolarChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";
    this.init_chart = function(chart_data) {
        return this.chart_obj.PolarArea(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
    return this;
}
OipaPolarChart.prototype = new OipaActiveRoundChart();


function OipaPieChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";

    this.init_chart = function(chart_data) {
        return this.chart_obj.Pie(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
    return this;
}
OipaPieChart.prototype = new OipaActiveRoundChart();


function OipaDoughnutChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";

    this.init_chart = function(chart_data) {
        return this.chart_obj.Doughnut(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
    return this;
}
OipaDoughnutChart.prototype = new OipaActiveRoundChart();


function OipaBlankChart(object_id) {
    function OipaBlankChartFactory(subobject_id) {
        this.id = subobject_id;
        this.type = "OipaBlankChart";

        var _old_visualize = this.visualize;
        this.visualize = function(data) {
            var self = this;
            if (typeof(data) == 'string') {
                // data becomes string when no real indicators selected
                data = {};
            }
            if (data[self.indicator] == undefined) {
                data[self.indicator] = {
                    indicator: this.indicator,
                    indicator_friendly: "Random chart",
                    selection_type: null,
                    max_value:19900000,
                    locs: {
                        5208: {
                            latitude: "-1.95359",
                            longitude: "30.060532",
                            color: "rgba(192,192,192,2)",
                            stroke_color: "rgba(192,192,192,1)",
                            years: {},
                            name: "Kigali",
                            id: 5208
                        },
                        5702: {
                            latitude: "6.801974",
                            longitude: "-58.167029",
                            color: "rgba(192,192,192,2)",
                            stroke_color: "rgba(192,192,192,1)",
                            years: {},
                            name: "Georgetown",
                            id:5702
                        },
                        5796: {
                            latitude: "9.083333",
                            longitude: "7.533328",
                            color: "rgba(192,192,192,2)",
                            stroke_color: "rgba(192,192,192,1)",
                            years: {},
                            name: "Abuja",
                            id:5796
                        },
                        5929: {
                            latitude: "40.181151",
                            longitude: "44.513551",
                            color: "rgba(192,192,192,2)",
                            stroke_color: "rgba(192,192,192,1)",
                            years: {},
                            name: "Yerevan",
                            id: 5929
                        },
                    },
                    type_data: "1000"
                };

                var _active_years = {};
                if (typeof(map) !== "undefined") {
                    $.map(Object.keys(map.active_years), function(i) {
                        return parseInt(i);
                    });
                }
                $.each(data[self.indicator].locs, function(id) {
                    for (var _year = (Math.min.apply(null, _active_years) | 1990); _year < (Math.max.apply(null, _active_years) | 2015); _year++) {
                        data[self.indicator].locs[id].years[_year] = Math.floor((Math.random() * 100) + 1);
                    }
                });
                self.data = data;
            }
            return _old_visualize.apply(self, data);
        
        }
        return this;
    }

    var _chart_type = [
        "OipaLineChart",
        "OipaBarChart",
        "OipaPieChart",
        "OipaPolarChart",
        "OipaDoughnutChart"
    ][Math.floor((Math.random() * 5))];

    OipaBlankChartFactory.prototype = new window[_chart_type]();
    return new OipaBlankChartFactory(object_id);
}


function OipaBubbleChart(){
    this.type = "OipaBubbleChart";
}
OipaBubbleChart.prototype = new OipaVis();








function OipaSimpleMapVis(){
    this.type = "OipaSimpleMapVis";
    this.name = null;
    this.geotype = null; // point / polygon / line
    this.geo_location = null; // exact location / city / country / region
    this.indicator = null;
    this.basemap = "zimmerman2014.hmpkg505";
    this.id = null;
    this.map = null;
    this.map_div = null;
    this.chartwrapper = "#visualisation-maps-block-wrapper";
    this._url_cache = {};

    this.init = function(){
        // create html

        this.map_div = 'simple-map-chart-'+this.indicator;
        var html = '<li><section class="container-box grayed-and-inactive" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'" data-geo-location="'+this.geo_location+'"><header class="heading-holder"><h3>'+this.name+'</h3></header>';
        html += '<div class="box-content"><a href="#" class="btn-vis-zoom" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a><a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a><div class="widget"><div id="'+this.map_div+'" class="simple-map-chart" style="height:350px; width: 350px;"></div></div><a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';
        html += '</div></section></li>';

        var div_id = this.map_div;

        $(this.chartwrapper).append(html);

        var mapoptions = {
            attributionControl: false,
            scrollWheelZoom: false,
            zoom: 3,
            minZoom: 2,
            maxZoom:12,
            continuousWorld: 'false'
        }

        mapoptions.zoomControl = false;

        // if(zoomposition){
        //  mapoptions.zoomControl = false;
        // }

        jQuery("#"+div_id).css("min-height", "200px");
        this.map = L.map(div_id, mapoptions).setView([10.505, 25.09], 2);

        // if (zoomposition){
        //  new L.Control.Zoom({ position: zoomposition }).addTo(this.map);
        // }

        this.tl = L.tileLayer('https://{s}.tiles.mapbox.com/v3/'+this.basemap+'/{z}/{x}/{y}.png', {
            maxZoom: 12
        }).addTo(this.map);



        this.load_listeners();
        this.refresh();
        this.check_if_in_favorites();
    };

    this.get_url = function(){

        var api_call = "";

        if(this.geo_location == "exact_loc"){

        } else if(this.geo_location == "city"){
            api_call = "cities";
        } else if(this.geo_location == "country"){
            api_call = "countries";
        } else if(this.geo_location == "region"){
            api_call = "regions";
        }

        return search_url + api_call + '/' + this.id + '/?format=json';
    };

    this.get_data = function(url) {
        this.forced_get_data(url);
    }

    this.format_data = function(data){
        
    };
  

    this.visualize = function(data){
        if (this.geotype == "point"){

            var latitude = null;
            var longitude = null;

            if(this.geo_location == "exact_loc"){


            } else if(this.geo_location == "city"){
                
                var longlat = geo_point_to_latlng(data.location);
                latitude = longlat[0];
                longitude = longlat[1];
                this.map.setView(longlat, 6);


            } else if(this.geo_location == "country"){
                var longlat = geo_point_to_latlng(data.center_longlat);
                latitude = longlat[0];
                longitude = longlat[1];
                this.map.setView(longlat, 4);

            } else if(this.geo_location == "region"){
                // var longlat = geo_point_to_latlng(data.center_longlat);
                // latitude = longlat[0];
                // longitude = longlat[1];
                // this.map.setView(longlat, 6);
            }

            if (latitude){
            curmarker = L.marker([
                    latitude,
                    longitude
            ])
            .addTo(this.map);
            
            this.marker = curmarker;}
        }

    };
}

OipaSimpleMapVis.prototype = new OipaVis();


OipaInfographicVis = function(indicator, charts_count, options) {
    var self = this;
    self.id = indicator;
    self.indicator = indicator;
    self.charts_count = charts_count;

    // parse options
    self.options = (options !== undefined ? options : {});

    self.opt = function(name, default_value) {
        return (self.options[name] !== undefined ? self.options[name] : default_value);
    }

    self.visualize = function(data) {
        if (!data) {
            data = self.data;
        }
        

        if (!data || data[self.indicator] == undefined){
            // empty data, remove vis
            return false;
        }

        data = data[self.indicator];
        chart_data = self.format_year_data(data, self.selected_year, self.charts_count);

        $.each(Array(self.charts_count), function (chart_id, _) {
            self.visualize_chart(chart_data, chart_id);
        });
    }

    self.visualize_chart = function(chart_data, chart_id) {
        //console.log(chart_data, chart_id)
    }
}
OipaInfographicVis.prototype = new OipaActiveChart();

OipaPieInfographicsVis = function(indicator, charts_count, options) {
    var self = this;
    OipaInfographicVis.call(self, indicator,  charts_count, options);
    self.charts = [];

    self.normalize_data_for_pie = function(chart_data, chart_id) {
        var _data = [jQuery.extend({}, chart_data[chart_id])];
        _data[0].value = parseFloat(chart_data[chart_id].value) / self.opt('divide_by', 1);
        _data.push({
            value: 1 - _data[0].value,
            label: "empty",
            color: "#767D91",
            stroke_color: "#767D91",
            highlight: "#767D91"
        });

        return _data;
    }

    self.init_chart = function(chart_data, chart_id) {
        var _data = self.normalize_data_for_pie(chart_data, chart_id);
        return self.charts[chart_id].obj.Doughnut(_data, {showScale: false, showTooltips: false});
    }

    self.format_year_data = function(data, year, limit){
        if (year == null) {
            year = self.get_last_data_year(data);
        }
        
        var data_slice = self.get_year_slice(data.locs, year, limit);
        return $.map(data_slice, function(i, _) {
            var _color = (i.color==undefined ? self.opt('color', '#00AAB0') : i.color);
            var _stroke_color = (i.stroke_color==undefined?_color:i.stroke_color);
            return {
                value: i.value,
                label: i.name,
                color: _color,
                stroke_color: _stroke_color,
                segmentStrokeColor: _stroke_color,
                highlight: _stroke_color
            };
        });
    }

    self.visualize_chart = function(chart_data, chart_id) {
        if (self.charts[chart_id] == undefined) {
            var holder = document.createElement("div");
            holder.className = "col-md-1";
            holder.style.width = '120px';
            holder.ctx = document.createElement('canvas');
            holder.appendChild(holder.ctx);
            holder.ctx.height = 100;
            holder.ctx.width = 100;
            
            holder.label = document.createElement('div');
            holder.label.innerHTML = chart_data[chart_id].label;
            holder.appendChild(holder.label);

            $("div.widget[data-indicator='" + self.indicator + "']").each(function(_, node) {
                node.appendChild(holder);
            });

            self.charts[chart_id] = {
                obj: new Chart(holder.ctx.getContext("2d")),
                chart: null
            }
            self.charts[chart_id].chart = self.init_chart(chart_data, chart_id);
        } else {
            // Refresh
            if (chart_data.labels) {
                $.each(chart_data.labels, function(_id, label) {
                    self.get_chart_labels(self.charts[chart_id].chart)[_id] = label;
                    self.get_chart_points(self.charts[chart_id].chart)[_id].value = chart_data.datasets[0].data[_id];
                    self.get_chart_points(self.charts[chart_id].chart)[_id].label = label;
                });
            } else {
                // pie, radar etc
                // Redraw chart only if data isset
                if (chart_data[0].value !== undefined) {
                     $.each(chart_data, function(i, v) {
                         var _data = self.normalize_data_for_pie(chart_data, chart_id);
                         self.charts[chart_id].chart.segments[0].label = _data[0].label;
                         self.charts[chart_id].chart.segments[0].value = _data[0].value;
                         self.charts[chart_id].chart.segments[1].label = _data[1].label;
                         self.charts[chart_id].chart.segments[1].value = _data[1].value;
                     });
                }
                self.charts[chart_id].chart.update();
            }
        }
    }
    return this;
}
OipaPieInfographicsVis.prototype = Object.create(OipaInfographicVis.prototype);

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}
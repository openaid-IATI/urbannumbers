
function OipaVis(){
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
        map.remove_refresh_callback('OipaVis' + this.get_url());
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
        vis_parameters.selection = this.selection;
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

            // console.log(response);

            if(response.status == "log_in_first"){
                console.log("log in first");
                $("#header-login-register-button").click();
                $("#urbannumbers-login h1").text("Log in first");

            } else if (response.status == "already_in_favorites"){
                console.log("Already in favorites");
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
            
            } else if (response.status == "saved"){
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
                console.log("Saved");
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
                console.log("Not found in favorites");
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");
                
            } else if (response.status == "removed_from_favorites"){
                $("section[data-indicator='"+curchart.indicator+"'][data-vis-type='"+curchart.type+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");
                console.log("Removed");
            }
        });

    };

    this.refresh = function(data){
        if (!data && !this.data){
            // get url
            var url = this.get_url();

            // get data
            this.get_data(url);
            
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

    this.get_data = function(url){
        // filters
        var self = this;
        map.add_refresh_callback('OipaVis' + url, function(data) {
            self.data = data;
            self.refresh(data);
        });
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
        //console.log(d);
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
        var _mapped = $.map(locations, function(i, _) {
            return [{
                value: i.years[year],
                name: i.name
            }];
        });
        _mapped.sort(function(a, b) {
            return a.value < b.value ? -1 : (a.value > b.value ? 1 : 0);
        });
        _mapped.reverse();
        return _mapped.slice(0, limit);
    }

    // TODO: optimize this crap, it gets slow even with 3 indicators
    this.format_year_data = function(data, year, limit){
        var self = this;
        
        var data_slice = self.get_year_slice(data.locs, year, limit);

        var base_data = {
            labels: [],
            datasets: [{
                label: data.indicator_friendly,
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
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

    this.init_chart = function(ctx, chart_data) {
        // Defaults to Line
        return new Chart(ctx.getContext("2d")).Line(chart_data);
    }

    this.get_chart_points = function(chart) {
        return chart.datasets[0].points;
    }

    this.get_chart_labels = function(chart) {
        return chart.scale.xLabels;
    }

    this.visualize = function(data){
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
        var _year = map.selected_year;
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
            self.chart = self.init_chart(ctx, chart_data);
        } else {
            // Refresh
            //self.chart.Line(chart_data);
            if (chart_data.labels) {
                $.each(chart_data.labels, function(_id, label) {
                    self.get_chart_labels(self.chart)[_id] = label;
                    self.get_chart_points(self.chart)[_id].value = chart_data.datasets[0].data[_id];
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
}
OipaActiveChart.prototype = new OipaVis();

function OipaLineChart(id) {
    this.id = id;
    this.type = "OipaLineChart";
}
OipaLineChart.prototype = new OipaActiveChart();


function OipaBarChart(id) {
    this.id = id;
    this.type = "OipaBarChart";
    this.init_chart = function(ctx, chart_data) {
        return new Chart(ctx.getContext("2d")).Bar(chart_data);
    }
    this.get_chart_points = function(chart) {
        return chart.datasets[0].bars;
    }
}
OipaBarChart.prototype = new OipaActiveChart();


function OipaRadarChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";
    this.init_chart = function(ctx, chart_data) {
        return new Chart(ctx.getContext("2d")).Radar(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
}
OipaRadarChart.prototype = new OipaActiveChart();

function OipaPolarChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";
    this.format_year_data = function(data, year, limit){
        var self = this;
        
        var data_slice = self.get_year_slice(data.locs, year, limit);
        return $.map(data_slice, function(i, _) {
            var _color = self.getRandomColor();
            return {
                value: i.value,
                label: i.name,
                color: _color,
                highlight: _color
            };
        });
    }
    this.init_chart = function(ctx, chart_data) {
        return new Chart(ctx.getContext("2d")).PolarArea(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
}
OipaPolarChart.prototype = new OipaActiveChart();


function OipaPieChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";
    this.format_year_data = function(data, year, limit){
        var self = this;
        
        var data_slice = self.get_year_slice(data.locs, year, limit);
        return $.map(data_slice, function(i, _) {
            var _color = self.getRandomColor();
            return {
                value: i.value,
                label: i.name,
                color: _color,
                highlight: _color
            };
        });
    }
    this.init_chart = function(ctx, chart_data) {
        return new Chart(ctx.getContext("2d")).Pie(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
}
OipaPieChart.prototype = new OipaActiveChart();


function OipaDoughnutChart(id) {
    this.id = id;
    this.type = "OipaRadarChart";
    this.format_year_data = function(data, year, limit){
        var self = this;
        
        var data_slice = self.get_year_slice(data.locs, year, limit);
        return $.map(data_slice, function(i, _) {
            var _color = self.getRandomColor();
            return {
                value: i.value,
                label: i.name,
                color: _color,
                highlight: _color
            };
        });
    }
    this.init_chart = function(ctx, chart_data) {
        return new Chart(ctx.getContext("2d")).Doughnut(chart_data);
    }
    this.get_chart_labels = function(chart) {
        return chart.scale.labels;
    }
}
OipaDoughnutChart.prototype = new OipaActiveChart();


function OipaBubbleChart(){
    this.type = "OipaBubbleChart";
}
OipaBubbleChart.prototype = new OipaVis();

//
//
// function OipaRadarChart(){
//     this.type = "OipaRadarChart";
//     this.data = null;
//     this.name = null;
//     this.indicator = null;
//     this.limit = null;
//
//     this.init = function(){
//         // create html
//         var html = '<li><section class="container-box" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><header class="heading-holder"><h3>'+this.name+'</h3></header>';
//         html += '<div class="box-content"><a href="#" class="btn-vis-zoom" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a><a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a><div class="widget"><div class="radar-chart" style="height:350px; width: 350px;"></div></div><a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';
//         html += '</div></section></li>';
//         $(this.chartwrapper).append(html);
//         this.load_listeners();
//         this.refresh();
//         this.check_if_in_favorites();
//     };
//
//     this.format_data = function(data){
//         var d = [];
//         var locs = [];
//         var indicators = [];
//
//         // get geolocs
//         $.each(data, function(key, value){
//
//             if ($.inArray(value.indicator_friendly, indicators) < 0){
//                 indicators[key] = value.indicator_friendly;
//             }
//
//             $.each(value.locs, function(ikey, ivalue){
//                 if ($.inArray(ivalue.id, locs) < 0){
//                     locs[ikey] = ivalue.name;
//                 }
//             });
//         });
//
//         for(var lockey in locs) {
//
//             locval = locs[lockey];
//
//             var curlocarray = [];
//
//             // bv. Helsinki
//             for(var indkey in indicators) {
//
//                 indval = indicators[indkey];
//                 var curvalue = null;
//
//                 for (var firstyear in data[indkey].locs[lockey].years){
//                     curvalue = data[indkey].locs[lockey].years[firstyear];
//                     break;
//                 }
//
//                 curlocarray.push({axis: indval, value: curvalue});
//             }
//             d.push(curlocarray);
//         }
//
//         if (d.length < 1){
//             return null;
//         }
//
//         return d;
//     }
//
//     this.visualize = function(data){
//
//         var w = 200,
//             h = 200;
//
//         var colorscale = d3.scale.category10();
//
//         //Legend titles
//         // var LegendOptions = ['Smartphone','Tablet'];
//
//         //Options for the Radar chart, other than default
//         var mycfg = {
//           w: w,
//           h: h,
//           maxValue: 1.0,
//           levels: 10,
//           ExtraWidthX: 300
//         }
//
//         // get data in right format (differs per vis)
//         data = this.format_data(data);
//
//         if (!data){
//             // empty data, remove vis
//             this.remove();
//             return false;
//         }
//
//         //Call function to draw the Radar chart
//         //Will expect that data is in %'s
//         RadarChart.draw('section[data-indicator="'+this.indicator+'"][data-vis-type="'+this.type+'"] .radar-chart', data, mycfg);
//
//         ////////////////////////////////////////////
//         /////////// Initiate legend ////////////////
//         ////////////////////////////////////////////
//
//         // var svg = d3.select('section[data-indicator="'+this.indicator+'"][data-vis-type="'+this.type+'"] svg');
//
//         // //Create the title for the legend
//         // var text = svg.append("text")
//         //  .attr("class", "title")
//         //  .attr('transform', 'translate(90,0)')
//         //  .attr("x", w - 70)
//         //  .attr("y", 10)
//         //  .attr("font-size", "12px")
//         //  .attr("fill", "#404040")
//         //  .text("What % of owners use a specific service in a week");
//
//         // //Initiate Legend
//         // var legend = svg.append("g")
//         //  .attr("class", "legend")
//         //  .attr("height", 100)
//         //  .attr("width", 200)
//         //  .attr('transform', 'translate(90,20)')
//         //  ;
//         //  //Create colour squares
//         //  legend.selectAll('rect')
//         //    .data(LegendOptions)
//         //    .enter()
//         //    .append("rect")
//         //    .attr("x", w - 65)
//         //    .attr("y", function(d, i){ return i * 20;})
//         //    .attr("width", 10)
//         //    .attr("height", 10)
//         //    .style("fill", function(d, i){ return colorscale(i);})
//         //    ;
//         //  //Create text next to squares
//         //  legend.selectAll('text')
//         //    .data(LegendOptions)
//         //    .enter()
//         //    .append("text")
//         //    .attr("x", w - 52)
//         //    .attr("y", function(d, i){ return i * 20 + 9;})
//         //    .attr("font-size", "11px")
//         //    .attr("fill", "#737373")
//         //    .text(function(d) { return d; })
//         //    ;
//     }
//
//
//
// }
// OipaRadarChart.prototype = new OipaVis();







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

            
            curmarker = L.marker([
                    latitude,
                    longitude
            ])
            .addTo(this.map);
            
            this.marker = curmarker;
        }

    };
}

OipaSimpleMapVis.prototype = new OipaVis();

    

// function resize() {
//     /* Find the new window dimensions */
//  var width = parseInt(d3.select("#line-chart").style("width")) - margin*2,
//  height = parseInt(d3.select("#line-chart").style("height")) - margin*2;
    
//  /* Update the range of the scale with new width/height */
//  xScale.range([0, width]).nice(d3.time.year);
//  yScale.range([height, 0]).nice();
     
//  /* Update the axis with the new scale */
//  graph.select('.x.axis')
//    .attr("transform", "translate(0," + height + ")")
//    .call(xAxis);
     
//  graph.select('.y.axis')
//    .call(yAxis);
     
//  /* Force D3 to recalculate and update the line */
//  graph.selectAll('.line')
//    .attr("d", line);
// }
 
// d3.select(window).on('resize', resize); 
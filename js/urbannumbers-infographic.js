
function InfographicOipaMapVis() {
    var self = this;
    OipaSimpleMapVis.call(self);

    self.init_wrapper = function() {
        self.map_div = 'simple-map-chart-' + self.indicator;
        var html = '<li>'
        html += '<section class="container-box" data-vis-type="' + self.type + '" data-indicator="' + self.indicator + '" data-geo-location="' + self.geo_location + '">';
        html  += '<header class="heading-holder"><h3>' + self.name + '</h3></header>';
        html  += '<div class="box-content">';
        html   += '<div class="widget">';
        html    += '<div id="' + self.map_div + '" class="simple-map-chart" style="height:250px; width: 250px;"></div>';
        html   += '</div>';
        html  += '</div>';
        html += '</section></li>';

        $(self.chartwrapper).append(html);
    }

    var _old_visualize = self.visualize;
    self.visualize = function(data) {
        _old_visualize.apply(self, [data]);
        if (data.name !== undefined) {
            var _div = document.getElementById(self.map_div);
            // This is HELL
            $(_div.parentNode.parentNode.parentNode).find('h3').html(data.name);
        }
    }
}
InfographicOipaMapVis.prototype = Object.create(OipaSimpleMapVis.prototype);




function InfographicsChart(object_id, options) {
    function InfographicsChartFactory(subobject_id, suboptions, base_type) {
        this.has_skeleton = false;

        this.init = function() {
            //this.create_html_skeleton();
            this.load_listeners();
            this.refresh();
            this.check_if_in_favorites();
        };


        this.create_html_skeleton = function(base) {
            // Register event in event bus
            OipaWidgetsBus.add_listener(this);

            // create html
            var html = '<li id="visualization_' + this.indicator + '">';
            html += '<section class="container-box" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'">';
            html += '<header class="heading-holder" data-indicator="'+this.indicator+'"><h3>'+this.name+'</h3></header>';
            html += '<div class="box-content row">'
            html +=  '<div class="col-md-6">';
            //html +=  '<a href="#" class="btn-vis-zoom" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a>';
            html +=   '<a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a>';
            html +=   '<div class="widget" data-indicator="'+this.indicator+'">';
            html +=     '<div class="no_data">No data for this chart</div>';
            html +=     '<canvas height="240" width="240"></canvas>';
            html +=   '</div>';
            html +=  '</div>';

            html +=  '<div class="col-md-6 legend" data-indicator="' + this.indicator + '">';
            html +=  '</div>';
            html +=   '<a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';
            /*if (this.limit){
                html += '<div class="vis-box-note">Showing top '+this.limit+', use filters to show a different selection, <a class="vis-box-show-all" href="#">click here to show all</a></div>';
            }*/
            html += '</div>';
            html += '</section></li>';

            base = base !== undefined ? base : "#visualisation-block-wrapper";
            $(base).append(html);

        }

        window[base_type].call(this, subobject_id, suboptions);

        var _old_visualize = this.visualize;
        this.visualize = function(data) {
            console.log(data, this.id);
            if (data[this.id] == undefined) {
                return;
            }

            var base = '.' + this.filter.string_to_id(data[this.id].category) + '-list';
            $(base).show();
            $('.' + this.filter.string_to_id(data[this.id].category) + '-head').show();
            if (!this.has_skeleton) {
                this.create_html_skeleton(base);
                this.has_skeleton = true;
            }

            _old_visualize.apply(this, [data]);

            if (this.chart) {
                console.log($("div.legend[data-indicator='" + this.indicator + "']").get());
                $("div.legend[data-indicator='" + this.indicator + "']").html(this.chart.generateLegend());
            }
        }
    }


    var _chart_type = [
        "OipaLineChart",
        "OipaBarChart",
        "OipaPieChart",
        "OipaPolarChart",
        "OipaDoughnutChart"
    ][Math.floor((Math.random() * 5))];

    console.log(options.all_years, object_id);
    _chart_type = "OipaBarChart";
    if (object_id.substring(0, 4) == 'cpi_') {
        _chart_type = "OipaPieChart";

        InfographicsChartFactory.prototype = Object.create(window[_chart_type].prototype);
        return new InfographicsChartFactory(object_id, $.extend({}, options, {all_years: false}), _chart_type);
    }
    console.log(options.all_years);

    InfographicsChartFactory.prototype = Object.create(window[_chart_type].prototype);
    return new InfographicsChartFactory(object_id, options, _chart_type);
}

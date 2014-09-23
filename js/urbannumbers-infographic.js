
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
        html    += '<div id="' + self.map_div + '" class="simple-map-chart" style="height:350px; width: 350px;"></div>';
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


        window[base_type].call(this, subobject_id, suboptions);

        var _old_visualize = this.visualize;
        this.visualize = function(data) {
            console.log(data);
            if (!this.has_skeleton) {
                this.create_html_skeleton();
                this.has_skeleton = true;
            }
            _old_visualize.apply(this, [data]);
        }
    }


    var _chart_type = [
        "OipaLineChart",
        "OipaBarChart",
        "OipaPieChart",
        "OipaPolarChart",
        "OipaDoughnutChart"
    ][Math.floor((Math.random() * 5))];
    console.log(object_id, options)

    InfographicsChartFactory.prototype = Object.create(OipaLineChart.prototype);
    return new InfographicsChartFactory(object_id, options, "OipaLineChart");
}
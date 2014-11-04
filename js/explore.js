function ExploreIndicatorFilters() {
}

ExploreIndicatorFilters.prototype = new OipaIndicatorFilters();

ExploreIndicatorFilters.prototype.load_indicator_paginate_listeners = function(){
    $("#indicators-pagination li a").addClass('btn btn-default');

    $("#indicators-pagination li a").click(function(e){
        e.preventDefault();

        var is_active = $(this).hasClass('btn-success');
        $("#indicators-pagination li a").removeClass("btn-success").addClass("btn-default");
        $("#indicators-filters .filter-page").hide();

        if (is_active) {
            $('#indicator-filter-wrapper .slide-content').hide();
        } else {
            $('#indicator-filter-wrapper .slide-content').show();
            $(this).removeClass("btn-default").addClass("btn-success");

            var name = $(this).attr("name");
            $(".filter-page-"+name).show();
        }
    });

    //$("#indicators-pagination li a:first").click();

    $(".filter-indicator-type-text").click(function(e){
        e.preventDefault();
        $(this).find("span.urbnnrs-arrow").toggleClass("urbnnrs-arrow-active");
        $(this).closest(".filter-indicator-type-dropdown").children(".filter-indicator-type-inner").toggle(500);
    });
}

ExploreIndicatorFilters.prototype.reset_filters = function() {
    this.selection.clean('indicators');
    this.save(true);
}

ExploreIndicatorFilters.prototype.randomize = function(max_indicators) {
    var self = this;
    max_indicators = (max_indicators == undefined) ? 3 : max_indicators;

    if (self.data !== undefined && self.data.indicators !== undefined) {
        var _indicators = self.data.indicators;
        var _keys = Object.keys(_indicators);

        var _get_ids = function(keys, _count, result) {
            if (_count == result.length) {
                return result;
            }
            var _id =  Math.floor(Math.random() * (keys.length));
            if (result.indexOf(_id) == -1) {
                result.push(_id);
            }
            return _get_ids(keys, _count, result);
        }

        $.each(_get_ids(_keys, max_indicators, []), function(_, id) {
            var _indicator = _indicators[_keys[id]];
            self.selection.add_indicator(_keys[id], _indicator.name, 'indicators');
        });

        self.save(true);
    }
}



/** EXTRAS **/

$(".explore-filters-save-button").click(function(e){
    e.preventDefault();
    filter.save();
    $('.explore-filters-close-button').click();
});

$('.explore-filters-close-button').click(function(e) {
    e.preventDefault();

    $("#indicators-pagination li a").removeClass("btn-success").addClass("btn-default");
    $('#indicator-filter-wrapper .slide-content').hide();
});

$('#explore-randomize').click(function(e) {
    e.preventDefault();
    filter.reset_filters();
    filter.randomize(3);
});

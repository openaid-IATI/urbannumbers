
// XXXXXXXXXXXXXX INDICATOR SLIDER XXXXXXXXXXXXXXXXX


$( "#map-slider-tooltip" ).noUiSlider({
        range: [1950, 2050],
        handles: 1,
        start: 2000,
        step: 1,
        slide: slide_tooltip
});

function slide_tooltip(){
        var curval = $("#map-slider-tooltip").val();
        $( "#map-slider-tooltip div" ).text(curval);

        map.refresh_circles(curval);
        $( ".slider-year").removeClass("active");
        $( "#year-" + curval).addClass("active");
}


$(".slider-year").click(function() {
        var curId = $(this).attr('id');
        var curYear = curId.replace("year-", "");
        map.refresh_circles(curYear);
        $( "#map-slider-tooltip" ).val(parseInt(curYear));
        $( "#map-slider-tooltip div" ).text(curYear);

        $( ".slider-year").removeClass("active");
        $(this).addClass("active");
});

function OipaVis(){this.type=null;this.data=null;this.selection=null;this.name=null;this.indicator=null;this.chartwrapper="#visualisation-block-wrapper";this.init=function(){var e='<li><section class="container-box" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><header class="heading-holder"><h3>'+this.name+"</h3></header>";e+='<div class="box-content"><a href="#" class="btn-vis-zoom" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a><a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a><div class="widget"><svg id="line-chart" style="height:350px; width: 350px;"></svg></div><a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';this.limit&&(e+='<div class="vis-box-note">Showing top '+this.limit+', use filters to show a different selection, <a class="vis-box-show-all" href="#">click here to show all</a></div>');e+="</div></section></li>";$("#visualisation-block-wrapper").append(e);this.load_listeners();this.refresh();this.check_if_in_favorites()};this.check_if_in_favorites=function(){var e=this.get_save_string(),t={action:"in_favorites",visdata:e},n=this;$.post(ajaxurl,t,function(e){e.status=="in_favorites"&&$("section[data-indicator='"+n.indicator+"'][data-vis-type='"+n.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star")})};this.get_save_string=function(){var e=new Object;e.type=this.type;e.selection=this.selection;e.name=this.name;e.indicator=this.indicator;e.y_name=this.y_name;e.y_format=this.y_format;e.x_name=this.x_name;e.x_format=this.x_format;e.limit=this.limit;return JSON.stringify(e)};this.load_from_string=function(e){var t=$.parseJSON(e);this.type=t.type;this.selection=t.selection;this.name=t.name;this.indicator=t.indicator;this.y_name=t.y_name;this.y_format=t.y_format;this.x_name=t.x_name;this.x_format=t.x_format;this.limit=t.limit;this.init()};this.favorite=function(){var e=this.get_save_string(),t=this,n=$("<div/>").text(e).html(),r={action:"favorite_visualisation",visdata:e};$.post(ajaxurl,r,function(e){if(e.status=="log_in_first"){console.log("log in first");$("#header-login-register-button").click();$("#urbannumbers-login h1").text("Log in first")}else if(e.status=="already_in_favorites"){console.log("Already in favorites");$("section[data-indicator='"+t.indicator+"'][data-vis-type='"+t.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star")}else if(e.status=="saved"){$("section[data-indicator='"+t.indicator+"'][data-vis-type='"+t.type+"'] .glyphicon-star-empty").removeClass("glyphicon-star-empty").addClass("glyphicon-star");console.log("Saved")}})};this.unfavorite=function(){var e=this.get_save_string(),t={action:"unfavorite_visualisation",visdata:e},n=this;$.post(ajaxurl,t,function(e){if(e.status=="log_in_first")$("#header-login-register-button").click();else if(e.status=="not_in_favorites"){console.log("Not found in favorites");$("section[data-indicator='"+n.indicator+"'][data-vis-type='"+n.type+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty")}else if(e.status=="removed_from_favorites"){$("section[data-indicator='"+n.indicator+"'][data-vis-type='"+n.type+"'] .glyphicon-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");console.log("Removed")}})};this.refresh=function(e){if(!e){var t=this.get_url();this.get_data(t)}else this.visualize(e)};this.export=function(e){new OipaExport(this,e)};this.embed=function(){var e=new OipaEmbed(this)};this.get_url=function(){var e=get_parameters_from_selection(this.selection.regions),t=get_parameters_from_selection(this.selection.countries),n=get_parameters_from_selection(this.selection.cities),r=get_parameters_from_selection(this.selection.indicators),i="";this.limit&&(i="&limit="+this.limit);return search_url+"indicator-data/?format=json"+i+"&countries__in="+t+"&regions__in="+e+"&cities__in="+n+"&indicators__in="+r};this.get_data=function(e){var t=this;$.support.cors=!0;if(window.XDomainRequest){var n=new XDomainRequest;n.open("get",e);n.onprogress=function(){};n.ontimeout=function(){};n.onerror=function(){};n.onload=function(){var e=$.parseJSON(n.responseText);if(e===null||typeof e=="undefined"){e=$.parseJSON(e.firstChild.textContent);t.refresh(e)}};setTimeout(function(){n.send()},0)}else $.ajax({type:"GET",url:e,contentType:"application/json",dataType:"json",success:function(e){t.refresh(e)}})};this.getRandomColor=function(){var e="0123456789ABCDEF".split(""),t="#";for(var n=0;n<6;n++)t+=e[Math.floor(Math.random()*16)];return t};this.format_data=function(e){};this.visualize=function(e){};this.zoom_in=function(){$("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"'] .glyphicon-zoom-in").removeClass("glyphicon-zoom-in").addClass("glyphicon-zoom-out");$("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"']").css("position","fixed").css("width","90%").css("height","90%").css("margin","3% 5%").css("z-index","9999999").css("top","0").css("left","0").css("background-color","white");$("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"'] svg").css("height","90%").css("width","90%");$(window).resize()};this.zoom_out=function(){$("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"'] .glyphicon-zoom-out").removeClass("glyphicon-zoom-out").addClass("glyphicon-zoom-in");$("section[data-indicator='"+this.indicator+"'][data-vis-type='"+this.type+"']").css("position","relative").css("width","auto").css("height","auto").css("margin","auto").css("z-index","1").css("top","auto").css("left","auto").css("background-color","transparent");$(window).resize()};this.load_listeners=function(){var e=this;$("section[data-indicator='"+e.indicator+"'][data-vis-type='"+e.type+"'] .btn-vis-close").click(function(e){e.preventDefault();$(this).closest("li").hide(500,function(){$(this).remove()})});$("section[data-indicator='"+e.indicator+"'][data-vis-type='"+e.type+"'] .btn-vis-zoom").click(function(t){t.preventDefault();$("section[data-indicator='"+e.indicator+"'][data-vis-type='"+e.type+"'] .glyphicon-zoom-in").length?e.zoom_in():e.zoom_out()});$("section[data-indicator='"+e.indicator+"'][data-vis-type='"+e.type+"'] .vis-box-show-all").click(function(t){t.preventDefault();e.limit=null;e.refresh()});$("section[data-indicator='"+e.indicator+"'][data-vis-type='"+e.type+"'] .btn-vis-save").click(function(t){t.preventDefault();$("section[data-indicator='"+e.indicator+"'][data-vis-type='"+e.type+"'] .glyphicon-star-empty").length>0?e.favorite():e.unfavorite()})};this.remove=function(){$("section[data-indicator='"+this.indicator+"']").parent("li").remove()}}function OipaTableChart(){this.type="OipaTableChart"}function OipaColumnChart(){this.type="OipaColumnChart";this.format_data=function(e){var t=[],n=[],r=[];$.each(e,function(e,t){$.inArray(t.indicator_friendly,r)<0&&(r[e]=t.indicator_friendly);$.each(t.locs,function(e,t){$.inArray(t.id,n)<0&&(n[e]=t.name)})});for(var i in n){locval=n[i];var s={key:locval,values:[]};for(var o in r){indval=r[o];if(jQuery.inArray(i,e[o].locs))for(var u in e[o].locs[i].years){var a=indval;a.indexOf("–")!==-1&&(a=indval.split("–")[1]);var f={label:a,value:e[o].locs[i].years[u]};s.values.push(f);break}}t.push(s)}return t.length<1?null:t};this.visualize=function(e){var t=this,e=t.format_data(e);if(!e){this.remove();return!1}nv.addGraph(function(){var n=nv.models.discreteBarChart().x(function(e){return e.label}).y(function(e){return e.value}).staggerLabels(!0).tooltips(!0).showValues(!0).transitionDuration(350).color(["#aec7e8","#7b94b5","#486192"]);d3.select('section[data-indicator="'+t.indicator+'"][data-vis-type="'+t.type+'"] svg').datum(e).call(n);nv.utils.windowResize(n.update);return n})}}function OipaLineChart(){this.type="OipaLineChart";this.y_name=null;this.y_format=null;this.x_name=null;this.x_format=null;this.limit=5;this.format_data=function(e){var t=this,n=[];$.each(e[t.indicator].locs,function(e,r){var i=[];$.each(r.years,function(e,t){i.push({x:e,y:t})});var s=t.getRandomColor();n.push({values:i,key:r.name,color:s})});return n};this.visualize=function(e){var t=this;e=t.format_data(e);if(!e){this.remove();return!1}nv.addGraph(function(){var n=nv.models.lineChart().margin({left:100}).useInteractiveGuideline(!0).transitionDuration(350).showLegend(!1).showYAxis(!0).showXAxis(!0);n.xAxis.axisLabel(t.x_name).tickFormat(t.x_format);n.yAxis.axisLabel(t.y_name).tickFormat(t.y_format);d3.select('section[data-indicator="'+t.indicator+'"][data-vis-type="'+t.type+'"] svg').datum(e).call(n);nv.utils.windowResize(function(){n.update()});t.chart=n;return n})}}function OipaBubbleChart(){this.type="OipaBubbleChart"}function OipaRadarChart(){this.type="OipaRadarChart";this.data=null;this.name=null;this.indicator=null;this.limit=null;this.init=function(){var e='<li><section class="container-box" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><header class="heading-holder"><h3>'+this.name+"</h3></header>";e+='<div class="box-content"><a href="#" class="btn-vis-zoom" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a><a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a><div class="widget"><div class="radar-chart" style="height:350px; width: 350px;"></div></div><a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';e+="</div></section></li>";$(this.chartwrapper).append(e);this.load_listeners();this.refresh();this.check_if_in_favorites()};this.format_data=function(e){var t=[],n=[],r=[];$.each(e,function(e,t){$.inArray(t.indicator_friendly,r)<0&&(r[e]=t.indicator_friendly);$.each(t.locs,function(e,t){$.inArray(t.id,n)<0&&(n[e]=t.name)})});for(var i in n){locval=n[i];var s=[];for(var o in r){indval=r[o];var u=null;for(var a in e[o].locs[i].years){u=e[o].locs[i].years[a];break}s.push({axis:indval,value:u})}t.push(s)}return t.length<1?null:t};this.visualize=function(e){var t=200,n=200,r=d3.scale.category10(),i={w:t,h:n,maxValue:1,levels:10,ExtraWidthX:300};e=this.format_data(e);if(!e){this.remove();return!1}RadarChart.draw('section[data-indicator="'+this.indicator+'"][data-vis-type="'+this.type+'"] .radar-chart',e,i)}}function OipaSimpleMapVis(){this.type="OipaSimpleMapVis";this.name=null;this.geotype=null;this.geo_location=null;this.indicator=null;this.basemap="zimmerman2014.hmpkg505";this.id=null;this.map=null;this.map_div=null;this.chartwrapper="#visualisation-maps-block-wrapper";this.init=function(){this.map_div="simple-map-chart-"+this.indicator;var e='<li><section class="container-box grayed-and-inactive" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'" data-geo-location="'+this.geo_location+'"><header class="heading-holder"><h3>'+this.name+"</h3></header>";e+='<div class="box-content"><a href="#" class="btn-vis-zoom" data-vis-type="'+this.type+'" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-zoom-in"></i></a><a href="#" class="btn-vis-save" data-indicator="'+this.indicator+'"><i class="glyphicon glyphicon-star-empty"></i></a><div class="widget"><div id="'+this.map_div+'" class="simple-map-chart" style="height:350px; width: 350px;"></div></div><a href="#" class="btn-close btn-vis-close"><i class="glyphicon glyphicon-remove"></i></a>';e+="</div></section></li>";var t=this.map_div;$(this.chartwrapper).append(e);var n={attributionControl:!1,scrollWheelZoom:!1,zoom:3,minZoom:2,maxZoom:12,continuousWorld:"false"};n.zoomControl=!1;jQuery("#"+t).css("min-height","200px");this.map=L.map(t,n).setView([10.505,25.09],2);this.tl=L.tileLayer("https://{s}.tiles.mapbox.com/v3/"+this.basemap+"/{z}/{x}/{y}.png",{maxZoom:12}).addTo(this.map);this.load_listeners();this.refresh();this.check_if_in_favorites()};this.get_url=function(){var e="";this.geo_location!="exact_loc"&&(this.geo_location=="city"?e="cities":this.geo_location=="country"?e="countries":this.geo_location=="region"&&(e="regions"));return search_url+e+"/"+this.id+"/?format=json"};this.format_data=function(e){};this.visualize=function(e){if(this.geotype=="point"){var t=null,n=null;if(this.geo_location!="exact_loc")if(this.geo_location=="city"){var r=geo_point_to_latlng(e.location);t=r[0];n=r[1];this.map.setView(r,6)}else if(this.geo_location=="country"){var r=geo_point_to_latlng(e.center_longlat);t=r[0];n=r[1];this.map.setView(r,4)}else this.geo_location=="region";curmarker=L.marker([t,n]).addTo(this.map);this.marker=curmarker}}}OipaTableChart.prototype=new OipaVis;OipaColumnChart.prototype=new OipaVis;OipaLineChart.prototype=new OipaVis;OipaBubbleChart.prototype=new OipaVis;OipaRadarChart.prototype=new OipaVis;OipaSimpleMapVis.prototype=new OipaVis;
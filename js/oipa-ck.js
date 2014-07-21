function OipaSelection(e,t){this.cities=[];this.countries=[];this.regions=[];this.sectors=[];this.budgets=[];this.query=[];this.indicators=[];this.reporting_organisations=[];this.start_actual_years=[];this.start_planned_years=[];this.donors=[];this.query="";this.country="";this.region="";this.group_by="";this.url=null;e===1&&(this.url=new OipaUrl);t===1&&Oipa.default_organisation_id&&this.reporting_organisations.push({id:Oipa.default_organisation_id,name:Oipa.default_organisation_name})}function OipaIndicatorSelection(e){this.cities=[];this.countries=[];this.regions=[];this.indicators=[];this.url=null;e&&(this.url=new OipaUrl)}function OipaList(){this.offset=0;this.limit=10;this.amount=0;this.order_by=null;this.order_asc_desc=null;this.selection=null;this.list_div="#oipa-list";this.pagination_div="#oipa-list-pagination";this.activity_count_div="#project-list-amount";this.init=function(){var e=this;$(this.pagination_div).bootpag({total:5,page:1,maxVisible:6}).on("page",function(t,n){e.go_to_page(n)});this.update_pagination();this.load_listeners();this.extra_init()};this.extra_init=function(){};this.refresh=function(e){if(!e){var t=this.get_url();this.get_data(t)}else{this.update_list(e);this.update_pagination(e);this.load_listeners()}};this.reset_pars=function(){this.selection.query=null;this.offset=0;this.limit=10;this.amount=0;this.order_by=null;this.order_asc_desc=null;this.refresh()};this.get_url=function(){return search_url+"activity-list/?format=json&limit=10"};this.get_data=function(e){var t=this;$.support.cors=!0;if(window.XDomainRequest){var n=new XDomainRequest;n.open("get",e);n.onprogress=function(){};n.ontimeout=function(){};n.onerror=function(){};n.onload=function(){t.refresh(n.responseText)};setTimeout(function(){n.send()},0)}else $.ajax({type:"GET",url:e,dataType:"html",success:function(e){t.refresh(e)}})};this.update_list=function(e){$(this.list_div).html(e)};this.load_listeners=function(){};this.update_pagination=function(e){var t=$(this.list_div+" .list-amount-input").val();this.amount=t;var n=Math.ceil(this.amount/this.limit),r=Math.ceil(this.offset/this.limit)+1;$(this.pagination_div).bootpag({total:n})};this.go_to_page=function(e){this.offset=e*this.limit-this.limit;this.refresh()}}function OipaMainStats(){this.reporting_organisation=null;this.get_total_projects=function(e,t){if(t)$("#homepage-total-projects").text(t[e]);else{var n=search_url+"activity-aggregate-any/?format=json&group_by=reporting-org",r=this;$.support.cors=!0;if(window.XDomainRequest){var i=new XDomainRequest;i.open("get",n);i.onprogress=function(){};i.ontimeout=function(){};i.onerror=function(){};i.onload=function(){var t=$.parseJSON(i.responseText);if(t===null||typeof t=="undefined"){t=$.parseJSON(t.firstChild.textContent);r.get_total_projects(e,t)}};setTimeout(function(){i.send()},0)}else $.ajax({type:"GET",url:n,contentType:"application/json",dataType:"json",success:function(t){r.get_total_projects(e,t)}})}};this.get_total_budget=function(e,t){if(t)$("#homepage-total-budget").text("US$"+comma_formatted(t[e]));else{var n=search_url+"activity-aggregate-any/?format=json&group_by=reporting-org&aggregation_key=total-budget",r=this;$.support.cors=!0;if(window.XDomainRequest){var i=new XDomainRequest;i.open("get",n);i.onprogress=function(){};i.ontimeout=function(){};i.onerror=function(){};i.onload=function(){var t=$.parseJSON(i.responseText);if(t===null||typeof t=="undefined"){t=$.parseJSON(t.firstChild.textContent);r.get_total_budget(e,t)}};setTimeout(function(){i.send()},0)}else $.ajax({type:"GET",url:n,contentType:"application/json",dataType:"json",success:function(t){r.get_total_budget(e,t)}})}}}function OipaProjectList(){this.only_regional=!1;this.only_country=!1;this.get_url=function(){var e=get_activity_based_parameters_from_selection(this.selection);Oipa.pageType=="activities"?project_path="/projects":project_path="/projects-on-detail";var t="",n="";this.only_country==1?t="&countries__code__gte=0":this.only_regional==1?t="&regions__code__gte=0":this.only_global==1?t="&activity_scope=1":this.only_other==1&&(t="&regions=None&countries=None&activity_scope=None");this.order_asc_desc=="desc"&&(n="-");this.order_by&&(t+="&order_by="+n+this.order_by);var r=site_url+ajax_path+project_path+"/?format=json&limit="+this.limit+"&offset="+this.offset+e+t;r=replaceAll(r," ","%20");return r}}function OipaCountryList(){this.get_url=function(){var e=get_activity_based_parameters_from_selection(this.selection),t="";this.order_by&&(t+="&order_by="+this.order_by);this.order_asc_desc&&(t+="&order_asc_desc="+this.order_asc_desc);return site_url+ajax_path+"/countries/?format=json&limit="+this.limit+"&offset="+this.offset+e+t}}function OipaRegionList(){this.get_url=function(){var e=get_activity_based_parameters_from_selection(this.selection),t="";this.order_by&&(t+="&order_by="+this.order_by);this.order_asc_desc&&(t+="&order_asc_desc="+this.order_asc_desc);return site_url+ajax_path+"/regions/?format=json&limit="+this.limit+"&offset="+this.offset+e+t}}function OipaSectorList(){this.get_url=function(){var e=get_activity_based_parameters_from_selection(this.selection),t="";this.order_by&&(t+="&order_by="+this.order_by);this.order_asc_desc&&(t+="&order_asc_desc="+this.order_asc_desc);return site_url+ajax_path+"/sectors/?format=json&limit="+this.limit+"&offset="+this.offset+e+t}}function OipaDonorList(){this.get_url=function(){var e=get_activity_based_parameters_from_selection(this.selection),t="";this.order_by&&(t+="&order_by="+this.order_by);this.order_asc_desc&&(t+="&order_asc_desc="+this.order_asc_desc);this.query&&(t+="&query="+this.query);return site_url+ajax_path+"/donors/?format=json&limit="+this.limit+"&offset="+this.offset+e+t}}function OipaMap(){this.map=null;this.selection=null;this.slider=null;this.basemap="zimmerman2014.hmpkg505";this.tl=null;this.compare_left_right=null;this.circles={};this.markers=[];this.vistype="circles";this.selected_year=null;typeof standard_basemap!="undefined"&&(this.basemap=standard_basemap);this.set_map=function(e,t){var n={attributionControl:!1,scrollWheelZoom:!1,zoom:3,minZoom:2,maxZoom:12,continuousWorld:"false"};t&&(n.zoomControl=!1);$("#"+e).css("min-height","200px");this.map=L.map(e,n).setView([10.505,25.09],2);t&&(new L.Control.Zoom({position:t})).addTo(this.map);this.tl=L.tileLayer("https://{s}.tiles.mapbox.com/v3/"+this.basemap+"/{z}/{x}/{y}.png",{maxZoom:12}).addTo(this.map)};this.refresh=function(e){if(!e)if(this.compare_left_right=="left")filter.selection.left.cities.length>0&&this.set_city(filter.selection.left.cities[0].id);else if(this.compare_left_right=="right")filter.selection.right.cities.length>0&&this.set_city(filter.selection.right.cities[0].id);else{var t=this.get_url();this.get_data(t)}else this.show_data_on_map(e)};this.get_url=function(){var e=get_activity_based_parameters_from_selection(this.selection),t="activities";this.selection.group_by=="activity"?t="activities":this.selection.group_by=="country"?t="country-activities":this.selection.group_by=="region"?t="region-activities":this.selection.group_by=="global"&&(t="global-activities");return search_url+t+"/?format=json"+e};this.get_data=function(e){var t=this;e===null&&t.refresh(1);$.support.cors=!0;if(window.XDomainRequest){var n=new XDomainRequest;n.open("get",e);n.onprogress=function(){};n.ontimeout=function(){};n.onerror=function(){};n.onload=function(){var e=$.parseJSON(n.responseText);if(e===null||typeof e=="undefined"){e=$.parseJSON(e.firstChild.textContent);t.refresh(e)}};setTimeout(function(){n.send()},0)}else $.ajax({type:"GET",url:e,contentType:"application/json",dataType:"json",success:function(e){t.refresh(e)}})};this.delete_markers=function(){for(var e=0;e<this.markers.length;e++)this.map.removeLayer(this.markers[e])};this.show_data_on_map=function(e){this.delete_markers();if(this.selection.group_by!="activity")if(this.selection.group_by=="country")for(var t=0;t<e.objects.length;t++){if(e.objects[t].id===null)continue;if(e.objects[t].latitude!==null||e.objects[t].longitude!==null){curmarker=L.marker([e.objects[t].latitude,e.objects[t].longitude],{icon:L.divIcon({className:"country-marker-icon",html:e.objects[t].total_projects,iconSize:[36,44],iconAnchor:[18,34]})}).bindPopup('<div class="country-marker-popup-header"><a href="'+site_url+"/country/?country_id="+e.objects[t].id+'">'+e.objects[t].name+'</a></div><table><tr><td>YEAR:</td><td>ALL</td></tr><tr><td>PROJECTS:</td><td><a href="'+site_url+"/country/?country_id="+e.objects[t].id+'">'+e.objects[t].total_projects+"</a></td></tr><tr><td>BUDGET:</td><td>US$"+comma_formatted(e.objects[t].total_budget)+'</td></tr></table><a class="country-marker-popup-zoom" name="'+e.objects[t].id+'" country_name="'+e.objects[t].name+'" latitude="'+e.objects[t].latitude+'" longitude="'+e.objects[t].longitude+'" onclick="map.zoom_on_dom(this);">+ ZOOM IN</a>',{minWidth:300,maxWidth:300,offset:L.point(173,69),closeButton:!1,className:"country-popup"}).addTo(this.map);this.markers.push(curmarker)}}else if(this.selection.group_by=="region"){this.map.setView([10.505,25.09],2);for(var t=0;t<e.objects.length;t++){curmarker=L.marker([e.objects[t].latitude,e.objects[t].longitude],{icon:L.divIcon({className:"global-marker-icon",html:'<div class="region-map-item-wrapper"><div class="region-map-activity-count">'+e.objects[t].total_projects+'</div><div class="region-map-name">'+e.objects[t].name+"</div></div>",iconSize:[150,44],iconAnchor:[18,34]})}).bindPopup('<table><tr><td>YEAR:</td><td>ALL</td></tr><tr><td>PROJECTS:</td><td><a href="'+site_url+"/region/?region_id="+e.objects[t].id+'">'+e.objects[t].total_projects+"</a></td></tr><tr><td>BUDGET:</td><td>US$"+comma_formatted(e.objects[t].total_budget)+"</td></tr></table>",{minWidth:300,maxWidth:300,offset:L.point(215,134),closeButton:!1,className:"region-popup"}).addTo(this.map);this.markers.push(curmarker)}}else if(this.selection.group_by=="global"){this.map.setView([10.505,25.09],2);curmarker=L.marker([25,-90],{icon:L.divIcon({className:"region-marker-icon",html:'<div class="global-map-item-wrapper"><div class="global-map-activity-count">'+e.objects[0].total_projects+'</div><div class="global-map-name">Global projects</div></div>',iconSize:[150,44],iconAnchor:[18,34]})}).addTo(this.map);this.markers.push(curmarker)}else if(this.selection.group_by=="other"){this.map.setView([10.505,25.09],2);curmarker=L.marker([60,-41.31],{icon:L.divIcon({className:"other-projects-marker-icon",html:'<div class="other-projects-map-inner">OTHER PROJECTS<br>US$ </div>',iconSize:[150,44],iconAnchor:[18,34]})}).addTo(this.map);this.markers.push(curmarker)}this.load_map_listeners()};this.load_map_listeners=function(){};this.update_indicator_timeline=function(){$(".slider-year").removeClass("slider-active");for(var e=1950;e<2051;e++){var t="y"+e;$.each(indicator_data,function(n,r){if(r.years&&t in r.years){$("#year-"+e).addClass("slider-active");return!1}})}};this.change_basemap=function(e){this.tl._url="https://{s}.tiles.mapbox.com/v3/"+e+"/{z}/{x}/{y}.png";this.tl.redraw()};this.set_city=function(e){var t=new OipaCity;t.id=e;var n=this;url=search_url+"cities/?format=json&id="+e;$.support.cors=!0;if(window.XDomainRequest){var r=new XDomainRequest;r.open("get",url);r.onprogress=function(){};r.ontimeout=function(){};r.onerror=function(){};r.onload=function(){var e=$.parseJSON(r.responseText);if(e==null||typeof e=="undefined"){e=$.parseJSON(data.firstChild.textContent);t.set_compare_data(e,n.compare_left_right)}};setTimeout(function(){r.send()},0)}else $.ajax({type:"GET",url:url,contentType:"application/json",dataType:"json",success:function(e){t.set_compare_data(e,n.compare_left_right)}});return t};this.zoom_on_dom=function(e){var t=e.getAttribute("latitude"),n=e.getAttribute("longitude"),r=e.getAttribute("name"),i=e.getAttribute("country_name");this.map.setView([t,n],6);Oipa.mainSelection.countries.push({id:r,name:i});Oipa.refresh_maps();Oipa.refresh_lists()}}function OipaCity(){this.id=null;this.name=null;this.latlng=null;this.set_compare_data=function(e,t){this.name=e.objects[0].name;this.latlng=geo_point_to_latlng(e.objects[0].location);t=="left"?OipaCompare.item1=this:t=="right"&&(OipaCompare.item2=this);OipaCompare.refresh_state++;if(OipaCompare.refresh_state>1){OipaCompare.refresh_state=0;OipaCompare.refresh_comparison()}}}function OipaFilters(){this.data=null;this.selection=null;this.firstLoad=!0;this.perspective=null;this.filter_wrapper_div="my-tab-content";this.init=function(){this.update_selection_object();var e=this.get_url();this.get_data(e)};this.save=function(e){e||this.update_selection_object();Oipa.refresh_maps();Oipa.refresh_lists();Oipa.refresh_visualisations()};this.update_selection_object=function(){this.selection.sectors=this.get_checked_by_filter("sectors");this.selection.countries=this.get_checked_by_filter("countries");this.selection.budgets=this.get_checked_by_filter("budgets");this.selection.regions=this.get_checked_by_filter("regions");this.selection.indicators=this.get_checked_by_filter("indicators");this.selection.cities=this.get_checked_by_filter("cities");this.selection.start_planned_years=this.get_checked_by_filter("start_planned_years");this.selection.donors=this.get_checked_by_filter("donors");Oipa.default_organisation_id||(this.selection.reporting_organisations=this.get_checked_by_filter("reporting_organisations"))};this.get_selection_object=function(){var e=new OipaSelection;e.sectors=this.get_checked_by_filter("sectors");e.countries=this.get_checked_by_filter("countries");e.budgets=this.get_checked_by_filter("budgets");e.regions=this.get_checked_by_filter("regions");e.indicators=this.get_checked_by_filter("indicators");e.cities=this.get_checked_by_filter("cities");e.start_planned_years=this.get_checked_by_filter("start_planned_years");e.donors=this.get_checked_by_filter("donors");Oipa.default_organisation_id||(e.reporting_organisations=this.get_checked_by_filter("reporting_organisations"));return e};this.get_checked_by_filter=function(e){var t=[];if(e==="indicators"){$("#"+e+"-filters input:checked").each(function(e,n){var r=$(this).attr("selection_type");r===undefined&&(r=null);t.push({id:n.value,name:n.name,type:r})});return t}$("#"+e+"-filters input:checked").each(function(e,n){t.push({id:n.value,name:n.name})});return t};this.get_url=function(e,t){};this.get_data=function(e){var t=this;$.support.cors=!0;if(window.XDomainRequest){var n=new XDomainRequest;n.open("get",e);n.onprogress=function(){};n.ontimeout=function(){};n.onerror=function(){};n.onload=function(){var e=$.parseJSON(n.responseText);if(e===null||typeof e=="undefined"){e=$.parseJSON(e.firstChild.textContent);t.process_filter_options(e);t.data=e}};setTimeout(function(){n.send()},0)}else $.ajax({type:"GET",url:e,contentType:"application/json",dataType:"json",success:function(e){t.process_filter_options(e);t.data=e}})};this.process_filter_options=function(e){var t=4,n=this;$.each(e,function(e,r){if(!$.isEmptyObject(r)){$.inArray(e,["sectors"])&&(t=2);n.create_filter_attributes(r,t,e)}});var r=this.get_budget_filter_options();this.initialize_filters()};this.get_budget_filter_options=function(){var e=[];e.push(["0-20000",{name:"&lt;US$20K"}]);e.push(["20000-100000",{name:"US$20K-US$100K"}]);e.push(["100000-1000000",{name:"US$100K-US$1M"}]);e.push(["1000000-5000000",{name:"US$1M-US$5M"}]);e.push(["5000000",{name:">US$5M"}]);return e};this.initialize_filters=function(e){if(!e)var e=this.selection;$("#map-filter-overlay input:checked").prop("checked",!1);typeof e.sectors!="undefined"&&this.init_filters_loop(e.sectors);typeof e.countries!="undefined"&&this.init_filters_loop(e.countries);typeof e.budgets!="undefined"&&this.init_filters_loop(e.budgets);typeof e.regions!="undefined"&&this.init_filters_loop(e.regions);typeof e.indicators!="undefined"&&this.init_filters_loop(e.indicators);typeof e.cities!="undefined"&&this.init_filters_loop(e.cities);typeof e.reporting_organisations!="undefined"&&this.init_filters_loop(e.reporting_organisations)};this.init_filters_loop=function(e){for(var t=0;t<e.length;t++)$(":checkbox[value="+e[t].id+"]").prop("checked",!0)};this.create_filter_attributes=function(e,t,n){if(n==="indicators"){this.create_indicator_filter_attributes(e,t);return!0}var r="",i=6,s=[];for(var o in e)s.push([o,e[o]]);s.sort(function(e,t){var n=e[1].toString().toLowerCase(),r=t[1].toString().toLowerCase();return n<r?-1:n>r?1:0});var u=1;r+='<div class="row filter-page filter-page-1">';for(var a=0;a<s.length;a++){a%i==0&&(t==2?r+='<div class="col-md-6 col-sm-6 col-xs-12">':r+='<div class="col-md-3 col-sm-3 col-xs-6">');var f=s[a][1];t==4&&f.length>32?f=f.substr(0,28)+"...":t==3&&f.length>40&&(f=f.substr(0,36)+"...");r+='<div class="checkbox">';r+='<label><input type="checkbox" value="'+s[a][0]+'" id="'+s[a][1].toString().replace(/ /g,"").replace(",","").replace("&","").replace("%","perc")+'" name="'+s[a][1]+'" />'+f+"</label></div>";a%i==i-1&&(r+="</div>");if(a+1>u*i*t-1){r+="</div>";u+=1;r+='<div class="row filter-page filter-page-'+u+'">'}}u>1&&(r+="</div>");$("#"+n+"-pagination").html(this.paginate(1,u));$("#"+n+"-filters").html(r);this.load_paginate_listeners(n,u);this.update_selection_after_filter_load()};this.update_selection_after_filter_load=function(){};this.paginate=function(e,t){var n=2,r="";e==1?r+='<a href="#" class="pagination-btn-previous btn-prev"></a>':r+='<a href="#" class="pagination-btn-previous btn-prev">&lt; previous</a>';r+="<ul>";e>1+n&&(r+="<li><a href='#'>1</a></li>");e>2+n&&(r+="<li>...</li>");for(var i=e-n;i<e+n+1;i++)i>0&&i<=t&&(i==e?r+="<li class='active'><a>"+i+"</a></li>":r+="<li><a href='#'>"+i+"</a></li>");e<t-(1+n)&&(r+="<li>...</li>");e<t-n&&(r+="<li><a href='#' class='page'><span>"+t+"</span></a></li>");r+="</ul>";e!=t?r+='<a href="#" class="pagination-btn-next btn-next">next &gt;</a>':r+='<a href="#" class="pagination-btn-next btn-next"></a>';return r};this.load_paginate_listeners=function(e,t){$("#"+e+"-pagination ul a").click(function(n){n.preventDefault();var r=$(this).text();$("#"+e+"-pagination").html(filter.paginate(r,t));filter.load_paginate_page(e,r);filter.load_paginate_listeners(e,t)});$("#"+e+"-pagination .pagination-btn-next").click(function(n){n.preventDefault();var r=$("#"+e+"-pagination .active a").text();r=parseInt(r)+1;$("#"+e+"-pagination").html(filter.paginate(r,t));filter.load_paginate_page(e,r);filter.load_paginate_listeners(e,t)});$("#"+e+"-pagination .pagination-btn-previous").click(function(n){n.preventDefault();var r=$("#"+e+"-pagination .active a").text();r=parseInt(r)-1;$("#"+e+"-pagination").html(filter.paginate(r,t));filter.load_paginate_page(e,r);filter.load_paginate_listeners(e,t)})};this.load_paginate_page=function(e,t){$("#"+e+"-filters .filter-page").hide();$("#"+e+"-filters .filter-page-"+t).show()};this.reload_specific_filter=function(e,t){if(!t){filters=this;selection=this.get_selection_object();if(e==="left-cities")var n=this.get_url(null,"&indicators__in="+get_parameters_from_selection(selection.indicators)+"&countries__in="+get_parameters_from_selection(selection.left.countries));if(e==="right-cities")var n=this.get_url(null,"&indicators__in="+get_parameters_from_selection(selection.indicators)+"&countries__in="+get_parameters_from_selection(selection.right.countries));if(e==="indicators")var n=this.get_url(null,"&regions__in="+get_parameters_from_selection(selection.regions)+"&countries__in="+get_parameters_from_selection(selection.countries)+"&cities__in="+get_parameters_from_selection(selection.cities));if(e==="regions")var n=this.get_url(null,"&indicators__in="+get_parameters_from_selection(selection.indicators));if(e==="countries")var n=this.get_url(null,"&indicators__in="+get_parameters_from_selection(selection.indicators)+"&regions__in="+get_parameters_from_selection(selection.regions));if(e==="cities")var n=this.get_url(null,"&indicators__in="+get_parameters_from_selection(selection.indicators)+"&regions__in="+get_parameters_from_selection(selection.regions)+"&countries__in="+get_parameters_from_selection(selection.countries));$.support.cors=!0;if(window.XDomainRequest){var r=new XDomainRequest;r.open("get",n);r.onprogress=function(){};r.ontimeout=function(){};r.onerror=function(){};r.onload=function(){var t=$.parseJSON(r.responseText);if(t===null||typeof t=="undefined"){t=$.parseJSON(t.firstChild.textContent);filters.reload_specific_filter(e,t)}};setTimeout(function(){r.send()},0)}else $.ajax({type:"GET",url:n,contentType:"application/json",dataType:"json",success:function(t){filters.reload_specific_filter(e,t)}})}else{columns=4;e==="left-cities"&&this.create_filter_attributes(t.cities,columns,"left-cities");e==="right-cities"&&this.create_filter_attributes(t.cities,columns,"right-cities");if(e==="indicators"&&Oipa.pageType=="compare"){this.create_filter_attributes(t.countries,columns,"left-countries");this.create_filter_attributes(t.countries,columns,"right-countries");this.create_filter_attributes(t.cities,columns,"left-cities");this.create_filter_attributes(t.cities,columns,"left-cities")}e==="regions"&&this.create_filter_attributes(t.regions,2,"regions");e==="countries"&&this.create_filter_attributes(t.countries,columns,"countries");e==="cities"&&this.create_filter_attributes(t.cities,columns,"cities");e==="indicators"&&Oipa.pageType=="indicators"&&this.create_filter_attributes(t.indicators,2,"indicators");this.initialize_filters(selection)}};this.reset_filters=function(){$("#"+this.filter_wrapper_div+" input[type=checkbox]").attr("checked",!1);filter.selection.search="";filter.selection.country="";filter.selection.region="";filter.save()}}function OipaProjectFilters(){function e(e,t){var n="",r=20,i=[];for(var s in e){e[s].name===null&&(e[s].name="Unknown");i.push([s,e[s]])}i.sort(function(e,t){var n=e[1].name.toString().toLowerCase(),r=t[1].name.toString().toLowerCase();return n<r?-1:n>r?1:0});var o=1;n+='<div class="filter-page filter-page-1">';for(var u=0;u<i.length;u++){u%r==0&&(n+='<div class="span'+12/t+'">');var a=i[u][1].name;t===4&&a.length>32?a=a.substr(0,28)+"...":t===3&&a.length>46&&(a=a.substr(0,42)+"...");var f=i[u][1].total.toString();n+='<div class="squaredThree"><div>';n+='<input type="checkbox" value="'+i[u][0]+'" id="'+i[u][0]+i[u][1].name.toString().replace(/ /g,"").replace(",","").replace("&","").replace("%","perc")+'" name="'+i[u][1].name+'" />';n+='<label class="map-filter-cb-value" for="'+i[u][0]+i[u][1].name.toString().replace(/ /g,"").replace(",","").replace("&","").replace("%","perc")+'"></label>';n+='</div><div class="squaredThree-fname"><span>'+a+" ("+f+")</span></div></div>";u%r===r-1&&(n+="</div>");if(u+1>o*r*t-1){n+="</div>";o+=1;n+='<div class="filter-page filter-page-'+o+'">'}}n+='<div class="filter-total-pages" name="'+o+'"></div>';o>1&&(n+="</div>");return n}this.get_url=function(e,t){var n=get_activity_based_parameters_from_selection(this.selection),r="";this.perspective!==null&&(r="&perspective="+this.perspective);var i=search_url+"activity-filter-options/?format=json"+r+n;return i}}function OipaUrl(){this.get_selection_from_url=function(){var e=window.location.search.substring(1);if(e!==""){var t=e.split("&");for(var n=0;n<t.length;n++){var r=t[n].split("="),i=r[1].split(",");current_selection[r[0]]=[];for(var s=0;s<i.length;s++)r[0]!=="query"?this[r[0]].push({id:i[s],name:"unknown"}):this[r[0]].push({id:i[s],name:i[s]})}}};this.set_current_url=function(){var e=document.URL.toString().split("?")[0]+build_parameters();history.pushState&&history.pushState(null,null,e)};this.build_parameters=function(e){var t="?p=";typeof oipaSelection.sectors!="undefined"&&(t+=this.build_current_url_add_par("sectors",oipaSelection.sectors));exclude_countries||typeof oipaSelection.countries!="undefined"&&(t+=this.build_current_url_add_par("countries",oipaSelection.countries));typeof oipaSelection.budgets!="undefined"&&(t+=this.build_current_url_add_par("budgets",oipaSelection.budgets));typeof oipaSelection.regions!="undefined"&&(t+=this.build_current_url_add_par("regions",oipaSelection.regions));typeof oipaSelection.indicators!="undefined"&&(t+=this.build_current_url_add_par("indicators",oipaSelection.indicators));typeof oipaSelection.cities!="undefined"&&(t+=this.build_current_url_add_par("cities",oipaSelection.cities));typeof oipaSelection.reporting_organisations!="undefined"&&(t+=this.build_current_url_add_par("reporting_organisations",oipaSelection.reporting_organisations));typeof oipaSelection.offset!="undefined"&&(t+=this.build_current_url_add_par("offset",oipaSelection.offset));typeof oipaProjectList.limit!="undefined"&&(t+=this.build_current_url_add_par("limit",oipaProjectList.limit));typeof oipaProjectList.order_by!="undefined"&&(t+=this.build_current_url_add_par("order_by",oipaProjectList.order_by));typeof oipaProjectList.query!="undefined"&&(t+=this.build_current_url_add_par("query",oipaProjectList.query));if(t==="?p=")return"";t=t.replace("?p=&","?");return t};this.build_current_url_add_par=function(e,t,n){n===undefined&&(n=",");if(t.length===0)return"";var r="&"+e+"=";for(var i=0;i<t.length;i++)r+=t[i].id.toString()+n;r=r.substr(0,r.length-1);return r}}function OipaExport(e,t){function n(){}this.visualisation=e;this.filetype=t}function OipaEmbed(e){this.visualisation=e}function geo_point_to_latlng(e){e=e.replace("POINT (","");e=e.substring(0,e.length-1);lnglat=e.split(" ");latlng=[lnglat[1],lnglat[0]];return latlng}function get_parameters_from_selection(e){dlmtr=",";var t="";if(e.length>0){for(var n=0;n<e.length;n++)t+=e[n].id+dlmtr;t=t.substring(0,t.length-1)}return t}function make_parameter_string_from_budget_selection(e){var t="",n="",r="";if(e.length>0){t="99999999999";n="0";for(var i=0;i<e.length;i++){curid=e[i].id;lower_higher=curid.split("-");lower_higher[0]<t&&(t=lower_higher[0]);lower_higher.length>1&&lower_higher[1]>n&&(n=lower_higher[1])}}t!=""&&t!="99999999999"&&(r+="&total_budget__gte="+t);n!=""&&n!="0"&&(r+="&total_budget__lte="+n);return r}function get_indicator_parameters_from_selection(e){dlmtr=",";var t="",n="&selection_type__in=";if(e.length>0){for(var r=0;r<e.length;r++){t+=e[r].id+dlmtr;e[r].selection_type&&(n+=e[r].selection_type+dlmtr)}t=t.substring(0,t.length-1)}return t+n}function make_parameter_string_from_selection(e,t){var n=get_parameters_from_selection(e);return n!==""?"&"+t+"="+n:""}function make_parameter_string_from_query_selection(e,t){if(e!="")var e="&"+t+"="+e;else var e="";return e}function get_activity_based_parameters_from_selection(e){var t=make_parameter_string_from_selection(e.regions,"regions__in"),n=make_parameter_string_from_selection(e.countries,"countries__in"),r=make_parameter_string_from_budget_selection(e.budgets),i=make_parameter_string_from_selection(e.start_planned_years,"start_planned__in"),s=make_parameter_string_from_selection(e.donors,"participating_organisations__in"),o=make_parameter_string_from_selection(e.reporting_organisations,"reporting_organisation__in"),u=make_parameter_string_from_query_selection(e.query,"query"),a=make_parameter_string_from_query_selection(e.country,"country"),f=make_parameter_string_from_query_selection(e.region,"region");return t+n+r+i+s+o+u+a+f}function comma_formatted(e){return e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):"-"}function replaceAll(e,t,n,r){var i="";r===1?i="g":i="gi";var s=new RegExp(t,i);ns=e.replace(s,n);return ns}var Oipa={default_organisation_id:null,default_organisation_name:null,pageType:null,mainSelection:new OipaSelection(1),maps:[],refresh_maps:function(){for(var e=0;e<this.maps.length;e++)this.maps[e].refresh()},visualisations:[],refresh_visualisations:function(){this.visualisations=[];$("#visualisation-block-wrapper").empty();Oipa.create_visualisations()},create_visualisations:function(){var e=this;data=this.mainSelection.indicators;$.each(data,function(t,n){var r=new OipaLineChart;r.selection=new OipaIndicatorSelection;r.selection.cities=e.mainSelection.cities;r.selection.countries=e.mainSelection.countries;r.selection.regions=e.mainSelection.regions;r.selection.indicators.push({id:n.id,name:n.name,type:n.type});r.indicator=n.id;r.name=n.name;r.y_name=n.name;r.y_format=d3.format(",r");r.x_name="Time (Years)";r.x_format=d3.format("r");r.init();e.visualisations.push(r)})},lists:[],refresh_lists:function(){for(var e=0;e<this.lists.length;e++)this.lists[e].refresh()}};OipaProjectList.prototype=new OipaList;OipaCountryList.prototype=new OipaList;OipaRegionList.prototype=new OipaList;OipaSectorList.prototype=new OipaList;OipaDonorList.prototype=new OipaList;OipaProjectFilters.prototype=new OipaFilters;var OipaSelectionBox={fill_selection_box:function(){var e="",t="";typeof current_selection.sectors!="undefined"&&current_selection.sectors.length>0&&(e+=fill_selection_box_single_filter("SECTORS",current_selection.sectors));typeof current_selection.countries!="undefined"&&current_selection.countries.length>0&&(e+=fill_selection_box_single_filter("COUNTRIES",current_selection.countries));typeof current_selection.budgets!="undefined"&&current_selection.budgets.length>0&&(e+=fill_selection_box_single_filter("BUDGETS",current_selection.budgets));typeof current_selection.regions!="undefined"&&current_selection.regions.length>0&&(e+=fill_selection_box_single_filter("REGIONS",current_selection.regions));typeof current_selection.cities!="undefined"&&current_selection.cities.length>0&&(e+=fill_selection_box_single_filter("CITIES",current_selection.cities));typeof current_selection.indicators!="undefined"&&current_selection.indicators.length>0&&(t=fill_selection_box_single_filter("INDICATORS",current_selection.indicators));typeof current_selection.reporting_organisations!="undefined"&&current_selection.reporting_organisations.length>0&&(t=fill_selection_box_single_filter("REPORTING_ORGANISATIONS",current_selection.reporting_organisations));typeof current_selection.query!="undefined"&&current_selection.query.length>0&&(e+=fill_selection_box_single_filter("QUERY",current_selection.query));$("#selection-box").html(e);$("#selection-box-indicators").html(t);this.init_remove_filters_from_selection_box()},fill_selection_box_single_filter:function(e,t){var n='<div class="select-box" id="selected-'+e.toLowerCase()+'">';n+='<div class="select-box-header">';e==="INDICATORS"&&selected_type==="cpi"&&(e="DIMENSIONS");e==="QUERY"&&(e="SEARCH");e==="REPORTING_ORGANISATIONS"&&(e="REPORTING ORGANISATIONS");n+=e;n+="</div>";for(var r=0;r<t.length;r++){n+='<div class="select-box-selected">';n+='<div id="selected-'+t[r].id.toString().replace(/ /g,"").replace(",","").replace("&","").replace("%","perc")+'" class="selected-remove-button"></div>';t[r].name.toString()=="unknown"&&(t[r].name=$(":checkbox[value="+t[r].id+"]").attr("name"));n+="<div>"+t[r].name+"</div>";if(e=="INDICATORS"||e=="DIMENSIONS")n+='<div class="selected-indicator-color-filler"></div><div class="selected-indicator'+(r+1).toString()+'-color"></div>';n+="</div>"}n+="</div>";return n},init_remove_filters_from_selection_box:function(){$(".selected-remove-button").click(function(){var e=$(this).attr("id");e=e.replace("selected-","");var t=$(this).parent().parent().attr("id");t=t.replace("selected-","");var n=current_selection[t];for(var r=0;r<n.length;r++)if(n[r].id===e){$('input[name="'+n[r].name+'"]').attr("checked",!1);break}this.save_selection()})}};
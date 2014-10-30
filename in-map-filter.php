<div id="map-indicator-filter-wrapper">
    <div class="sort-holder">
        <div class="map-indicator-header">
            <a href="javascript:void(0)"><i class="glyphicon glyphicon-align-justify"></i> MAP FILTERS</a>
            <a href="#" id="reset-filters" class="btn btn-default reset-button">Reset</a></div>
        <ul class="sort-list">
            <li class="Cityprosperity-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-yellow " style="border-color: rgba(253, 190, 44, 1);"></i>
                    <a name="Cityprosperity" class="opener filter-open" href="#"><label class="top">City prosperity</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Cityprosperity-list subul">
                </ul>
            </li>
            <li class="Slumdwellers-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-green" style="border-color: rgba(164, 215, 42, 1);"></i>
                    <a name="Slumdwellers" class="opener filter-open" href="#"><label class="top">Slum dwellers</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Slumdwellers-list subul">
                </ul>
            </li>
            <li class="Population-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(23, 131, 251, 1);"></i>
                    <a name="Population" class="opener filter-open" href="#"><label class="top">Population</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Population-list subul">
                </ul>
            </li>
            <li class="Streets-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(22, 220, 250, 1)"></i>
                    <a name="Streets" class="opener filter-open" href="#"><label class="top">Streets</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Streets-list subul">
                </ul>
            </li>
            <li class="Transport-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(253, 23, 130, 1)"></i>
                    <a name="Transport" class="opener filter-open" href="#"><label class="top">Transport</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Transport-list subul">
                </ul>
            </li>
            <li class="Health-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(254, 31, 23, 1)"></i>
                    <a name="Health" class="opener filter-open" href="#"><label class="top">Health</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Health-list subul">
                </ul>
            </li>
            <li class="Resilience-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(23, 255, 31, 1)"></i>
                    <a name="Resilience" class="opener filter-open" href="#"><label class="top">Resilience</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Resilience-list subul">
                </ul>
            </li>
            <li class="Education-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(248, 255, 23, 1)"></i>
                    <a name="Education" class="opener filter-open" href="#"><label class="top">Education</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Education-list subul">
                </ul>
            </li>
            <li class="Crime-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-blue" style="border-color: rgba(0, 0, 0, 1)"></i>
                    <a name="Crime" class="opener filter-open" href="#"><label class="top">Crime</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Crime-list subul">
                </ul>
            </li>
            <li class="Landarea-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-grey" style="border-color: rgba(182, 182, 182, 1)"></i>
                    <a name="Landarea" class="opener filter-open" href="#"><label class="top">Landarea</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Landarea-list subul">
                </ul>
            </li>
            <li class="Other-li main-li">
                <div>
                    <i class="map-indicator-filter-icon icon-grey" style="border-color: rgba(182, 182, 182, 1)"></i>
                    <a name="Other" class="opener filter-open" href="#"><label class="top">Other data</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="Other-list subul">
                </ul>
            </li>
     <?php if (isset($SHOW_FILTER_GEO) && $SHOW_FILTER_GEO): ?>
            <li class="regions-li">
                <div>
                    <i class="map-indicator-filter-icon icon-white" style="border-color: rgba(182, 182, 182, 1)"></i>
                    <a name="regions" class="opener filter-open" href="#"><label class="top">REGION</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="regions-list subul">
                </ul>
            </li>
            <li class="countries-li">
                <div>
                    <i class="map-indicator-filter-icon icon-white" style="border-color: rgba(182, 182, 182, 1)"></i>
                    <a name="countries" class="opener filter-open" href="#"><label class="top">COUNTRY</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="countries-list subul">
                </ul>
            </li>
            <li class="cities-li">
                <div>
                    <i class="map-indicator-filter-icon icon-white" style="border-color: rgba(182, 182, 182, 1)"></i>
                    <a name="cities" class="opener filter-open" href="#"><label class="top">CITY</label><span class="glyphicon glyphicon-chevron-down"></span><span class="counts"></span></a>
                </div>
                <ul class="cities-list subul">
                </ul>
            </li>
            <?php endif; ?>
        </ul>
    </div>
</div>
<?php
/*
Template Name: Datasets
*/
get_header(); the_post(); ?>
<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/datasets.css" />
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.1/angular.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.1/angular-route.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/unhabitat/app.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/unhabitat/controllers.js"></script>
<div id="main" ng-app="datasetsApp">
    <!-- container-map -->
    <div class="container-map">
        <!-- container-sort -->
        <div class="container-sort">
            <div class="container">
<br />
                <h1>Urban Numbers City Datasets</h1>
                <hr />
                <ul class="menu">
                  <li id="countries-li"><a href="#/countries/1">Countries</a></li>
                  <li id="cities-li"><a href="#/cities/1">Cities</a></li>
                  <li id="indicators-li"><a href="#/indicators/1">Indicators</a></li>
                </ul>
                <hr />
                <div class="ng-view"></div>
            </div>
        </div>
    </div>
</div>


<div id="countries_controller" style="display: none">
    <nav class="pagination-nav">
        <ul class="pagination">
            <li ng-repeat="page in pagination.pages" ng-class="{active: pagination.current == page}"><a href="#/{{ page_type }}/{{ page }}">{{ page }}</a></li>
        </ul>
    </nav>
    <hr />
    <table class="table table-condensed table-bordered table-striped">
        <thead>
            <tr><th>{{ page_title }}</th><th>&nbsp;</th><th>&nbsp;</th></tr>
        </thead>
        <tr ng-repeat="object in page_data">
            <td class="col-md-10">
                <a href="/compare-cities/country-pages/?countries={{ object.code }}" target="_blank">{{ object.name }}</a>
            </td>
            <td class="col-md-1">
                <a href="<?php echo get_template_directory_uri(); ?>/download.php?type={{ page_type }}&code={{ object.code }}&format=csv" class="save-btn"><i class="glyphicon glyphicon-save"></i> csv</a></td>
            <td class="col-md-1">
                <a href="<?php echo get_template_directory_uri(); ?>/download.php?type={{ page_type }}&code={{ object.code }}&format=json" class="save-btn"><i class="glyphicon glyphicon-save"></i> json</a></td>
        </tr>
    </table>
    <nav class="pagination-nav">
        <ul class="pagination">
            <li ng-repeat="page in pagination.pages" ng-class="{active: pagination.current == page}"><a href="#/{{ page_type }}/{{ page }}">{{ page }}</a></li>
        </ul>
    </nav>
    <hr />
</div>



<?php get_template_part("footer", "scripts"); ?>

<?php get_footer(); ?>
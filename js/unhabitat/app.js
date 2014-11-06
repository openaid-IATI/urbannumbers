var datasetsApp = angular.module('datasetsApp', ['ngRoute', 'datasetsControllers']);

datasetsApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/countries/:pageId', {
                template: function() {
                    return document.getElementById('countries_controller').innerHTML;
                },
                controller: 'CountryListCtrl'
            }).
            when('/cities/:pageId', {
                template: function() {
                    return document.getElementById('countries_controller').innerHTML;
                },
                controller: 'CityListCtrl'
            }).
            when('/indicators/:pageId', {
                template: function() {
                    return document.getElementById('countries_controller').innerHTML;
                },
                controller: 'IndicatorListCtrl'
            }).
            //when('/phones/:phoneId', {
            //    templateUrl: 'partials/phone-detail.html',
            //    controller: 'PhoneDetailCtrl'
            //}).
            otherwise({
                redirectTo: '/countries/1'
            });
  }]);

var BASE_API_URL = 'http://149.210.163.126/api/v3';

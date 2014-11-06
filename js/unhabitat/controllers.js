var datasetsControllers = angular.module('datasetsControllers', []);

var global_data;

function get_global_data(page_name, $http, callback) {
    if (global_data == undefined) {

        var url =  BASE_API_URL + '/indicator-filter-options/?format=json';
        $http.get(url).success(function(data) {
            global_data = {};
            for (var key in data) {
                global_data[key] = [];

                for (var code in data[key]) {
                    if (key == 'indicators') {
                        data[key][code].code = code;
                        global_data[key].push(data[key][code]);
                    } else {
                        global_data[key].push({
                            code: code,
                            name: data[key][code]
                        });
                    }
                }
            }

            callback(global_data[page_name]);
        });
    } else {
        callback(global_data[page_name]);
    }
}


function showPage(page_name, id, $scope, $http) {
    get_global_data(page_name, $http, function(data) {
        if ($scope.pagination == undefined) {
            $scope.pagination = initPagination(id, data.length);
        }

        $scope.page_data = [];

        var start = ($scope.pagination.current - 1) * $scope.pagination.limit;
        var end = $scope.pagination.current * $scope.pagination.limit;

        $scope.page_data = data.slice(start, end);

        $('ul.menu li').removeClass('active');
        $('#' + $scope.page_type + '-li').addClass('active');

    });
}

function initPagination(current, count, limit) {
    limit = limit !== undefined ? limit : 20;
    var pages = [];
    for (var page=1; page <= Math.ceil(count / limit); page++) {
        pages.push(page);
    }

    return {
        prev: false,
        next: false,
        limit: limit,
        current: current,
        pages: pages
    };
}

datasetsControllers.controller('CountryListCtrl', function ($scope, $routeParams, $http) {
    $scope.page_type = 'countries';
    $scope.page_title = 'Country';

    showPage('countries', $routeParams.pageId, $scope, $http);

});


datasetsControllers.controller('CityListCtrl', function ($scope, $routeParams, $http) {
    $scope.page_type = 'cities';
    $scope.page_title = 'City';

    showPage('cities', $routeParams.pageId, $scope, $http);
});

datasetsControllers.controller('IndicatorListCtrl', function ($scope, $routeParams, $http) {
    $scope.page_type = 'indicators';
    $scope.page_title = 'Indicator';

    showPage('indicators', $routeParams.pageId, $scope, $http);
});

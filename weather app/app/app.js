'use strict';

// Declare app level module which depends on views, and components
const myApp = angular.module('myApp', []);

myApp.controller('jsonReader', function ($scope, $http) {
    $http.get('usaCities.json').success(function (cities) {
        $scope.cities = cities;
    })
});
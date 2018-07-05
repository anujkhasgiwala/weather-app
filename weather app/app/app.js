'use strict';

const myApp = angular.module('myApp', []);

myApp.controller('jsonReader', function ($scope, $http) {

    $scope.selectedCity = "";
    $scope.selectedCity1 = "";

    $scope.currentWeather = {
        icon: "",
        temperature:"",
        humidity:"",
        windSpeed:""
    };
    $scope.threeHourWeather = {
        time: "",
        icon: "",
        temperature:"",
        humidity:"",
        windSpeed:""
    };
    $scope.fiveDayWeathers = {};

    $scope.byCity = {
        value : false
    };
    $scope.byZip = {
        value : false
    };

    $http.get('usaCities.json').success(function (cities) {
        $scope.cities = cities;
    })

    $scope.getSelectedCityWeather = function() {
        //API call for current weather
        $http.get("http://api.openweathermap.org/data/2.5/weather?q="+$scope.selectedCity.city+",us&APPID=d9fe31cc351de14a1bbc4cb4f203af4f&units=imperial").success(function (weatherData) {
            $scope.currentWeather.icon = "wi wi-owm-"+weatherData.weather[0].id;
            $scope.currentWeather.temperature = weatherData.main.temp;
            $scope.currentWeather.humidity = weatherData.main.humidity;
            $scope.currentWeather.windSpeed = weatherData.wind.speed;
        });

        //API call for 3 hour weather
        $http.get("http://api.openweathermap.org/data/2.5/forecast?q="+$scope.selectedCity.city+",us&APPID=d9fe31cc351de14a1bbc4cb4f203af4f&units=imperial").success(function (weatherData) {
            $scope.threeHourWeather.time = weatherData.list[1].dt_txt + " UTC";
            $scope.threeHourWeather.icon = "wi wi-owm-"+weatherData.list[1].weather[0].id;
            $scope.threeHourWeather.temperature = weatherData.list[1].main.temp;
            $scope.threeHourWeather.humidity = weatherData.list[1].main.humidity;
            $scope.threeHourWeather.windSpeed = weatherData.list[1].wind.speed;
        });
    }

    $scope.searchWeatherByCity = function() {
        $scope.byCity.value = true;
        $scope.byZip.value = false;
    }

    $scope.searchWeatherByZip = function() {
        $scope.byCity.value = false;
        $scope.byZip.value = true;
    }

    //API call for 5 day weather
    $scope.getSelectedCityDayWeather = function() {
        $http.get("http://api.openweathermap.org/data/2.5/forecast?q="+$scope.selectedCity1.city+",us&units=imperial&APPID=d9fe31cc351de14a1bbc4cb4f203af4f").success(function (weatherData) {
            $scope.fiveDayWeathers = weatherData;
            angular.forEach($scope.fiveDayWeathers.list, function(value, key) {
                $scope.fiveDayWeathers.list[key].weather[0].icon = "wi wi-owm-"+value.weather[0].id;
            });
        });
    }

    $scope.zip;
    $scope.getSelectedZipDayWeather = function() {
        $http.get("http://api.openweathermap.org/data/2.5/forecast?zip=" + $scope.zip + ",us&APPID=d9fe31cc351de14a1bbc4cb4f203af4f&units=imperial").success(function (weatherData) {
            $scope.fiveDayWeathers = weatherData;
            angular.forEach($scope.fiveDayWeathers.list, function(value, key) {
                $scope.fiveDayWeathers.list[key].weather[0].icon = "wi wi-owm-"+value.weather[0].id;
            });
        });
    }
});
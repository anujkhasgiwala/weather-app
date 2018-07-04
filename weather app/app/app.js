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
    $scope.fiveDayWeather = {
        date: "",
        icon: "",
        temperature:"",
        humidity:"",
        windSpeed:""
    };

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
        $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $scope.selectedCity.city + ",us&APPID=d9fe31cc351de14a1bbc4cb4f203af4f&units=imperial&cnt=5").success(function (weatherData) {
            $scope.fiveDayWeather.date = "";
            $scope.fiveDayWeather.icon = "wi wi-owm-" + weatherData.list[0].weather[0].id;
            $scope.fiveDayWeather.temperature = weatherData.list[0].main.temp;
            $scope.fiveDayWeather.humidity = weatherData.list[0].main.humidity;
            $scope.fiveDayWeather.windSpeed = weatherData.list[0].wind.speed;
        });
    }

    $scope.zip;
    $scope.getSelectedZipDayWeather = function() {
        $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + $scope.zip + ",us&APPID=d9fe31cc351de14a1bbc4cb4f203af4f&units=imperial&cnt=5").success(function (weatherData) {
            $scope.fiveDayWeather.date = "";
            $scope.fiveDayWeather.icon = "wi wi-owm-" + weatherData.list[0].weather[0].id;
            $scope.fiveDayWeather.temperature = weatherData.list[0].main.temp;
            $scope.fiveDayWeather.humidity = weatherData.list[0].main.humidity;
            $scope.fiveDayWeather.windSpeed = weatherData.list[0].wind.speed;
        });
    }
});
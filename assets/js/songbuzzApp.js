'use strict';

var songbuzzApp = angular.module('songbuzz', ['ngRoute', 'ngSanitize', 'restangular', 'ui.sortable']);

songbuzzApp.config(['$routeProvider', '$locationProvider', 'RestangularProvider', function ($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider.when("/playlists", {
        templateUrl: "/partials/playlist-detail.html",
        controller: 'PlaylistDetailController'
    }).when("/playlists/:playlistId", {
            templateUrl: "/partials/playlist-detail.html",
            controller: 'PlaylistDetailController'
        }).when("/people", {
            templateUrl: "/partials/people-detail.html",
            controller: "PeopleController"
        }).when("/people/:personId", {
            templateUrl: "/partials/people-detail.html",
            controller: "PeopleController"
        }).when("/index", {
            templateUrl: "/partials/home.html",
            controller: "HomeController"
        }).otherwise({
            redirectTo: '/playlists'
        })
    //$locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('');
}]);

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

// Broadcast the YouTube event to the PlayerService.
window.onYouTubeIframeAPIReady = function () {
    var checkAngularReady = function () {
        var scope = angular.element(document).scope();
        if (scope == undefined) {
            setTimeout(checkAngularReady, 250);
        } else {
            scope.$broadcast('ytPlayerAPIReady');
        }
    }
    checkAngularReady();
}

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onload = function () {
    var frames = document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
        frames[i].src += "&wmode=transparent";
    }
}

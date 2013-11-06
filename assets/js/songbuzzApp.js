'use strict';

var songbuzzApp = angular.module('songbuzz', ['ngRoute', 'restangular', 'ui.sortable']);

songbuzzApp.config(['$routeProvider', '$locationProvider', 'RestangularProvider', function($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider.when("/playlists", {
        templateUrl: "/partials/playlist-detail.html",
        controller: 'PlaylistDetailController'
    }).when("/playlists/:playlistId", {
        templateUrl: "/partials/playlist-detail.html",
        controller: 'PlaylistDetailController'
    }).when("/people", {
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
window.onYouTubeIframeAPIReady = function() {
    var checkAngularReady = function() {
        var scope = angular.element(document).scope();
        if(scope == undefined) {
            console.log("Angular wasn't ready in time for YouTube.");
            setTimeout(checkAngularReady, 250);
        } else {
            scope.$broadcast('ytPlayerAPIReady');
        }
    }
}

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

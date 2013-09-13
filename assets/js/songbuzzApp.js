'use strict';
  
var songbuzzApp = angular.module('songbuzz', ['restangular', 'ui']);

songbuzzApp.config(['$routeProvider', '$locationProvider', 'RestangularProvider', function($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider.when("/playlists", {
        templateUrl: "partials/playlist-general.html"
    }).when("/playlists/:playlistId", {
        templateUrl: "/partials/playlist-detail.html",
        controller: 'PlaylistDetailCtrl'
    }).when("/index", {
        templateUrl: "/partials/home.html",
        controller: "HomeCtrl"
    }).otherwise({
        redirectTo: '/playlists'
    })
    //$locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('');
}]);

songbuzzApp.directive('ytAutocomplete', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<input id="appendedInputButton" type="search" placeholder="search for new songs..." class="span2" size="200" ng-model="ytSearchParameter" />',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.list, function(value) {
                element.autocomplete({
                    source: value,
                    delay: 500,
                    minLength: 3,
                    select: function(event, ui) {
                        scope[attrs.selection] = ui.item;
                        scope.$apply();
                        
                        //console.log("logging scope in link function.");
                        //console.log(scope);
                        //console.log(JSON.stringify(ui.item));
                        
                        element.val( ui.item.title );
                        return false;
                    },
                    focus: function( event, ui ) {
                        element.val( ui.item.title );
                        return false;
                    },
                }).data( "autocomplete" )._renderItem = function( ul, item ) {
                    var minutes = Math.floor(item.duration / 60);
                    var seconds = item.duration - minutes * 60;
                    var duration = '';
                    
                    if(minutes > 0) {
                        duration = duration + minutes +'m';
                    }
                    
                    duration = duration + ' ' + seconds + 's';
                    
                    return $( "<li>" )
                        .data( "item.autocomplete", item )
                        .append( "<a><span class='ytAutoMatchFont'><img src='"+ item.thumbUrl +"' width='48' heigth='48'/>" + item.title + " <strong>" + duration + "</strong></a>" )
                        .appendTo( ul );
                };
            });
        }
    };
});

songbuzzApp.directive('playerView', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div id="playerContainer"><center><div id="player"></div></center></div>',
        link: function(scope, element, attrs) {
          var playerContainer = $('#playerContainer');
          
          scope.$on('ytPlayerLoaded', function() {
            scope.$broadcast('playerVisibilityChanged');
          });
          
          scope.$on('playerVisibilityChanged', function() {
            if(scope.playerVisible === true) {
              playerContainer.show();
            } else if(scope.playerVisible === false) {
               playerContainer.hide();
            }
          });
        }
    };
});

// Broadcast the YouTube event to the PlayerService.
window.onYouTubeIframeAPIReady = function() {
    var scope = angular.element(document).scope();
    scope.$broadcast('ytPlayerAPIReady');
}

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

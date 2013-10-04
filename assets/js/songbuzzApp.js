'use strict';
  
var songbuzzApp = angular.module('songbuzz', ['ngRoute', 'restangular', 'ui.sortable']);

songbuzzApp.config(['$routeProvider', '$locationProvider', 'RestangularProvider', function($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider.when("/playlists", {
        templateUrl: "partials/playlist-general.html"
    }).when("/playlists/:playlistId", {
        templateUrl: "/partials/playlist-detail.html",
        controller: 'PlaylistDetailCtrl'
    }).when("/people", {
      templateUrl: "/partials/people-detail.html",
      controller: "PeopleController"
    }).when("/index", {
        templateUrl: "/partials/home.html",
        controller: "HomeCtrl"
    }).otherwise({
        redirectTo: '/playlists'
    })
    //$locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('');
}]);

songbuzzApp.directive('ytSelect', function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      scope.ytSelectSelected = false;
      element.select2({
        placeholder: "Search for music...",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
          //url: "https://gdata.youtube.com/feeds/api/videos",
          url: "https://www.googleapis.com/youtube/v3/search",
          dataType: "jsonp",
          quietMillis: 100,
          data: function(term, page) {
            return {
              q: term,
              "maxResults": 10,
              "type": "video",
              "part": "snippet",
              //"key": "AI39si5fQp3u-rWZRzNeycrh-4zMK2tV2yq4_eI72kf2gH0fQzl1NJgZjwFkiUwvoxPmYeKWa3Q2-2bWLE2FYY-TZISue6WswA"
              "key": "AIzaSyAXB4il29n0I0fUQYJdYPX0nkIlOIGC-wI"
             // "alt": "json-in-script"
            };
          },
          results: function(data, page) {
            console.log("LOGGING THE RESULTS DATA");
            console.log(data);
            console.log(page);
            var more = (page*10) < data.total;
            return { results: data.items, more: more };
          }
        },
        formatResult: function(video) {

          var markup = "<table>";
            markup += "<tr>";
              markup += "<td><img src=\"" + video.snippet.thumbnails.default.url + "\"></td>";
              markup += "<td>" + video.snippet.title + "</td>";
            markup += "</tr>";
          markup += "</table>";
          return markup;
        },
        formatSelection: function(video) {
          return video.snippet.title;
        }
      });

      element.on("select2-selecting", function(e) { 
        scope.ytSelectSelected = true;
        scope.ytSelectVideo = e.object;
        scope.$apply();
      });

      element.on("select2-removed", function(e) {
        scope.ytSelectSelected = false;
        scope.ytSelectVideo = null;
        scope.$apply();
      });

      scope.$on("ytSelectSongAdded", function() {
        element.select2("val", "");
        scope.ytSelectSelected = false;
        scope.ytSelectVideo = null;
      });
    }
  };
});

//songbuzzApp.directive('ytAutocomplete', function() {
//    return {
//        restrict: 'E',
//        replace: true,
//        transclude: true,
//        template: '<input id="appendedInputButton" type="search" placeholder="search for new songs..." class="form-control input-sm" size="200" ng-model="ytSearchParameter" />',
//        link: function(scope, element, attrs) {
//            scope.$watch(attrs.list, function(value) {
//                element.autocomplete({
//                    source: value,
//                    delay: 500,
//                    minLength: 3,
//                    select: function(event, ui) {
//                        scope[attrs.selection] = ui.item;
//                        scope.$apply();
//                        
//                        //console.log("logging scope in link function.");
//                        //console.log(scope);
//                        //console.log(JSON.stringify(ui.item));
//                        
//                        element.val( ui.item.title );
//                        return false;
//                    },
//                    focus: function( event, ui ) {
//                        element.val( ui.item.title );
//                        return false;
//                    },
//                }).data( "autocomplete" )._renderItem = function( ul, item ) {
//                    var minutes = Math.floor(item.duration / 60);
//                    var seconds = item.duration - minutes * 60;
//                    var duration = '';
//                    
//                    if(minutes > 0) {
//                        duration = duration + minutes +'m';
//                    }
//                    
//                    duration = duration + ' ' + seconds + 's';
//                    
//                    return $( "<li>" )
//                        .data( "item.autocomplete", item )
//                        .append( "<a><span class='ytAutoMatchFont'><img src='"+ item.thumbUrl +"' width='48' heigth='48'/>" + item.title + " <strong>" + duration + "</strong></a>" )
//                        .appendTo( ul );
//                };
//            });
//        }
//    };
//});

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

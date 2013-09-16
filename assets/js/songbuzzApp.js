'use strict';
  
var songbuzzApp = angular.module('songbuzz', ['ngRoute', 'restangular', 'ui.sortable']);

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
          url: "https://gdata.youtube.com/feeds/api/videos",
          dataType: "jsonp",
          quietMillis: 100,
          data: function(term, page) {
            return {
              q: term,
              "max-results": 10,
              "start-index": page * 10 + 1,
              "key": "AI39si5fQp3u-rWZRzNeycrh-4zMK2tV2yq4_eI72kf2gH0fQzl1NJgZjwFkiUwvoxPmYeKWa3Q2-2bWLE2FYY-TZISue6WswA",
              "category": "Music",
              "alt": "json-in-script"
            };
          },
          results: function(data, page) {
            console.log("LOGGING THE RESULTS DATA");
            console.log(data);
            var more = (page*10) < data.total;
            return { results: data.feed.entry, more: more };
          }
        },
        formatResult: function(video) {
          var foundThumb = false;
          var thumbUrl = "";
          video.media$group.media$thumbnail.forEach(function(element, index, array) {
            if (element.height == 90 && !foundThumb) {
              thumbUrl = element.url;
            }
          });

          var minutes = Math.floor(video.media$group.yt$duration.seconds / 60);
          var seconds = video.media$group.yt$duration.seconds - minutes * 60;
          var duration = '';
          if(minutes > 0) {
            duration = duration + minutes +'m';
          }
          duration = duration + ' ' + seconds + 's';


          var markup = "<table>";
            markup += "<tr>";
              markup += "<td><img src=\"" + thumbUrl + "\"></td>";
              markup += "<td>" + video.title.$t + "</td>";
              markup += "<td>" + duration + "</td>";
            markup += "</tr>";
          markup += "</table>";
          return markup;
        },
        formatSelection: function(video) {
          return video.title.$t;
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

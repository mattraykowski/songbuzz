'use strict';

songbuzzApp.directive('ytSelect', ['PlayerService', function (PlayerService) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            scope.ytSelectSelected = false;
            element.select2({
                placeholder: "Search for music...",
                minimumInputLength: 3,
                allowClear: true,
                id: function(song) { return song.videoId; },
                ajax: {
                    url: "/search/songs",
                    dataType: "json",
                    quietMillis: 100,
                    data: function (term, page, context) {
                        return {
                            q: term,
                            pageToken: context
                        };
                    },
                    results: function (data, page) {
                        var more = (data.nextPageToken?true:false);
                        return { results: data.songs, more: more, context: data.nextPageToken };
                    }
                },
                formatResult: function (song) {
                    var markup = "<table>";
                    markup += "<tr>";
                    markup += "<td><img src=\"" + song.thumbUrl + "\"></td>";
                    markup += "<td>" + song.title;

                    // Determine if the song is already in the current playlist.
                    var found = false;
                    for(var i= 0, len=PlayerService.currentPlaylist.songs.length ; i<len ; i++) {
                        var s = PlayerService.currentPlaylist.songs[i];
                        if(song.videoId == s.videoId) {
                            found = true;
                            break;
                        }
                    }

                    if(found) {
                        markup += "<br/><span class='badge'>In Playlist</span></td>";
                    } else {
                        markup += "</td>";
                    }

                    markup += "</tr>";
                    markup += "</table>";
                    return markup;
                },
                formatSelection: function (song) {
                    return song.title;
                }
            });

            element.on("select2-selecting", function (e) {
                scope.ytSelectSelected = true;
                scope.ytSelectVideo = e.object;
                scope.$apply();
            });

            element.on("select2-removed", function (e) {
                scope.ytSelectSelected = false;
                scope.ytSelectVideo = null;
                scope.$apply();
            });

            scope.$on("ytSelectSongAdded", function () {
                element.select2("val", "");
                scope.ytSelectSelected = false;
                scope.ytSelectVideo = null;
            });
        }
    };
}]);
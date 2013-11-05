'use strict';

songbuzzApp.directive('ytSelect', function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            scope.ytSelectSelected = false;
            element.select2({
                placeholder: "Search for music...",
                minimumInputLength: 3,
                allowClear: true,
                ajax: {
                    //url: "https://gdata.youtube.com/feeds/api/videos",
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
                    markup += "<td>" + song.title + "</td>";
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
});
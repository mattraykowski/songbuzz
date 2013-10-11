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
                    url: "https://www.googleapis.com/youtube/v3/search",
                    dataType: "jsonp",
                    quietMillis: 100,
                    data: function (term, page) {
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
                    results: function (data, page) {
                        console.log("LOGGING THE RESULTS DATA");
                        console.log("dataL "+JSON.stringify(data));
                        console.log(page);
                        var more = (page * 10) < data.total;
                        return { results: data.items, more: more };
                    }
                },
                formatResult: function (video) {

                    var markup = "<table>";
                    markup += "<tr>";
                    markup += "<td><img src=\"" + video.snippet.thumbnails.default.url + "\"></td>";
                    markup += "<td>" + video.snippet.title + "</td>";
                    markup += "</tr>";
                    markup += "</table>";
                    return markup;
                },
                formatSelection: function (video) {
                    return video.snippet.title;
                }
            });

            element.on("select2-selecting", function (e) {
                scope.ytSelectSelected = true;
                console.log("START ytSelected Song");
                console.log(JSON.stringify(e.object));
                console.log("END ytSelected Song");
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
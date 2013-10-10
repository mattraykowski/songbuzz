'use strict';

songbuzzApp.controller('PlaylistDetailCtrl', ['$rootScope',
    '$scope',
    '$timeout',
    '$routeParams',
    'PlayerService',
    'Restangular',
    function ($rootScope, $scope, $timeout, $routeParams, PlayerService, Restangular) {
        $scope.playlistId = $routeParams.playlistId;
        $scope.searchResults = '';
        $scope.playingSong = {};
        $scope.player = {};
        $scope.songDone = true;
        $scope.progress = 0;

        $scope.playlist = PlayerService.currentPlaylist;

        //@tested
        $scope.$on('changePlaylist', function () {
            $scope.playlist = PlayerService.currentPlaylist;
        });

        $scope.formatYtSong = function (vid) {
            var title = vid.snippet.title;
            var viewCount = 0;
            var videoId = vid.id.videoId;
            var thumbUrl = vid.snippet.thumbnails.default.url;
            //var duration = vid.media$group.yt$duration.seconds;

            var entry = {
                title: title,
                viewCount: viewCount,
                videoId: videoId,
                thumbUrl: thumbUrl,
            };

            return entry;
        };

        $scope.doAddSelectedSong = function () {
            console.log($scope.ytSelectVideo);
            if ($scope.ytSelectVideo == undefined || $scope.ytSelectVideo == null) {
                return; // Can't do anything if the button was erroneously clicked.
            }

            // Songs aren't a default part of the object so force the array on if it's not defined.
            if ($scope.playlist != undefined && $scope.playlist.songs == undefined) {
                $scope.playlist.songs = [];
            }

            // Set the song settings
            $scope.playlist.songs.push($scope.formatYtSong($scope.ytSelectVideo));

            // Save the playlist.
            $scope.playlist.put();

            $rootScope.$broadcast("ytSelectSongAdded");
        };

        $scope.removeSong = function (idx) {
            $scope.playlist.songs.splice(idx, 1);
            $scope.playlist.put();
        };

        $scope.friendlyDuration = function (songDuration) {
            var minutes = Math.floor(songDuration / 60);
            var seconds = Math.floor(songDuration - minutes * 60);
            var duration = '';

            if (minutes > 0) {
                duration = duration + minutes + 'm';
            }

            duration = duration + ' ' + seconds + 's';

            return duration;
        };

        $scope.playSong = function (songIndex) {
            PlayerService.playIndex(songIndex);
        };

        $scope.onPlaylistSorted = function () {
            $scope.playlist.put();
        }
    }]);
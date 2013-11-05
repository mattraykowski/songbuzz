'use strict';

songbuzzApp.controller('PlaylistDetailController', ['$rootScope',
    '$scope',
    '$timeout',
    '$routeParams',
    'PlayerService',
    'PlaylistRestService',
    function ($rootScope, $scope, $timeout, $routeParams, PlayerService, PlaylistRestService) {
        $scope.playlistId = $routeParams.playlistId;
        $scope.searchResults = '';
        $scope.playingSong = {};
        $scope.player = {};
        $scope.songDone = true;
        $scope.progress = 0;

        //@tested
        $scope.$on('changePlaylist', function () {
            $scope.fetchPlaylist(PlayerService.currentPlaylist.id);
        });

        $scope.fetchPlaylist = function(playlistId) {
            PlaylistRestService.get(playlistId).then(function(playlist) {
                $scope.playlist = playlist;
                PlayerService.changePlaylist($scope.playlist);
            });

        };

        /**
         * Performs the initial controller creation fetch.
         *
         * 1. if there's a playlist ID in the URL, fetch that, otherwise...
         * 2. if there's a currently playing playlist, fetch that, otherwise...
         * 3. if there's a currently selected playlist, fetch that..
         * 4. default object to null (view hides/shows based on this.)
         */
        $scope.initialFetch = function() {
            if ($routeParams.playlistId) {
                $scope.fetchPlaylist($routeParams.playlistId);
            } else if (PlayerService.playingPlaylist != undefined && !_.isEmpty(PlayerService.playingPlaylist)) {
                $scope.fetchPlaylist(PlayerService.playingPlaylist.id);
            } else if (PlayerService.currentPlaylist != undefined && !_.isEmpty(PlayerService.currentPlaylist)) {
                $scope.fetchPlaylist(PlayerService.currentPlaylist.id);
            } else {
                $scope.playlist = null;
            }
        };
        $scope.initialFetch();


        /**
         * Takes a video entry from the YouTube Search API and formats it to
         * the SongBuzz internal format.
         *
         * @param vid {Object} YouTube Video Search Result (single)
         * @returns {{title: String, viewCount: number, videoId: String, thumbUrl: String}}
         */
        $scope.formatYtSong = function (vid) {
            var title = vid.snippet.title;
            var viewCount = 0;
            var videoId = vid.id.videoId;
            var thumbUrl = vid.snippet.thumbnails.default.url;

            var entry = {
                title: title,
                viewCount: viewCount,
                videoId: videoId,
                thumbUrl: thumbUrl
            };

            return entry;
        };

        /**
         * Adds the currently selected song from the search component to the
         * end of the currently selected playlist. It then broadcasts 'ytSelectSongAdded'
         * so that the ytSelect directive can react.
         */
        $scope.doAddSelectedSong = function () {
            if ($scope.ytSelectVideo == undefined || $scope.ytSelectVideo == null) {
                return; // Can't do anything if the button was erroneously clicked.
            }

            // Songs aren't a default part of the object so force the array on if it's not defined.
            if ($scope.playlist != undefined && $scope.playlist.songs == undefined) {
                $scope.playlist.songs = [];
            }

            // Set the song settings
            $scope.playlist.songs.push($scope.ytSelectVideo);

            // Save the playlist.
            $scope.playlist.put();

            $rootScope.$broadcast("ytSelectSongAdded");
        };

        /**
         * Using an index it finds a song in the current playlist
         * and removes it from the songs array.
         *
         * @param idx {Number} Index location of the song to remove.
         */
        $scope.removeSong = function (idx) {
            $scope.playlist.songs.splice(idx, 1);
            $scope.playlist.put();
        };

        /**
         * Takes a duration in seconds and converts it into a human
         * readable format, for example 125 seconds will format to
         * '2m 5s'.
         *
         * @param songDuration {Number} Amount of time in seconds.
         * @returns {string} a human ready friendly time format.
         */
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

        /**
         * Receives the 'update' event from ui-sortable and saves the playlist.
         *
         * @param e {Object} jQuery event
         * @param ui {Object} jQuery UI object
         */
        $scope.onPlaylistSorted = function (e, ui) {
            $scope.playlist.put();
        };

        /**
         * Determines if the 'song' parameter is the currently playing song.
         *
         * @param song {Object} a playlist song object
         * @returns {boolean} true if the current song and the parameter match.
         */
        $scope.isPlayingSong = function(song) {
            if(PlayerService.currentSong == song) {
                return true;
            }

            return false;
        };

        /**
         * Retrieves the text for the current state of the player.
         *
         * @returns {String} the player state as a human readable string
         */
        $scope.playingBadgeText = function() {
            return PlayerService.PlayerState.stateToString(PlayerService.currentPlayerState);
        }
    }]);
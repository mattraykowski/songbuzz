'use strict';

songbuzzApp.controller('PlaylistDetailController', ['$rootScope',
    '$scope',
    '$routeParams',
    'PlayerService',
    'PlaylistRestService',
    function ($rootScope, $scope, $routeParams, PlayerService, PlaylistRestService) {
        $scope.playlistId = $routeParams.playlistId;
        $scope.searchResults = '';
        $scope.playingSong = {};
        $scope.player = {};
        $scope.songDone = true;
        $scope.progress = 0;
        $scope.prepSong = {};
        $scope.playlistToCopy = '';
        $scope.initialPlay = false;

        //@tested
        $scope.$on('changePlaylist', function () {
            $scope.fetchPlaylist(PlayerService.currentPlaylist.id);
        });

        $scope.fetchPlaylist = function(playlistId) {
            PlaylistRestService.get(playlistId).then(function(playlist) {
                $scope.playlist = playlist;
                PlayerService.changePlaylist($scope.playlist);

                if($scope.initialPlay) {
                    PlayerService.playIndex(0);
                }
            });

        };


        /**
         * Retrieves a list of playlists from the server - same method as the playlist list.
         */
        $scope.fetchPlaylists = function() {
            PlaylistRestService.getAll().then(
                function (playlists) {
                    $scope.playlists = playlists;
                });
        }

        /**
         * Performs the initial controller creation fetch.
         *
         * 1. if there's a playlist ID in the URL, fetch that, otherwise...
         * 2. if there's a currently playing playlist, fetch that, otherwise...
         * 3. if there's a currently selected playlist, fetch that..
         * 4. default object to null (view hides/shows based on this.)
         */
        $scope.initialFetch = function() {
            // First save the state of the initial play parameter.
            if($routeParams.play && $routeParams.play == true) {
                $scope.initialPlay = true;
            }

            // Determine the correct initial playlist to load.
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
         * @param song {Object} a song object.
         */
        $scope.removeSong = function (song) {
            bootbox.confirm("Are you sure you want to remove this song?", function (result) {
                if (result === true) {
                    var idx = $scope.findSongInPlaylist(song.videoId);
                    $scope.playlist.songs.splice(idx, 1);
                    $scope.playlist.put();
                }
            });
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

        $scope.findSongInPlaylist = function(videoId) {
            for(var i = 0, len=$scope.playlist.songs.length ; i < len ; i++) {
                if($scope.playlist.songs[i].videoId == videoId) {
                    return i;
                }
            }
            return 0;
        };

        $scope.playSong = function (song) {
            PlayerService.playIndex($scope.findSongInPlaylist(song.videoId));
        };

        /**
         * Receives the 'update' event from ui-sortable and saves the playlist.
         *
         * @param e {Object} jQuery event
         * @param ui {Object} jQuery UI object
         */
        $scope.onPlaylistSorted = function (e, ui) {
            if($scope.songFilter != undefined && $scope.songFilter.length != 0) {
                if(ui) {
                    ui.item.parent().sortable('cancel');
                }
            } else {
                $scope.playlist.put();
            }

        };

        /**
         * Determines if the 'song' parameter is the currently playing song.
         *
         * @param song {Object} a playlist song object
         * @returns {boolean} true if the current song and the parameter match.
         */
        $scope.isPlayingSong = function(song) {
            if(PlayerService.currentSong.videoId == song.videoId) {
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
        };

        /**
         * Returns whether or not the playlist can be modified by the current user.
         *
         * @returns {boolean} true if the playlist can be modified.
         */

        $scope.isPlaylistModifiable = function() {
            //playlist == null && playlist.owner != currentUser.id
            if($scope.playlist == null) {
                return false;
            } else if($scope.playlist.owner != $scope.currentUser.id) {
                return false;
            }

            return true;
        };


        // TODO test this
        $scope.prepSongToCopyMove = function(song) {
            $scope.prepSong = song;
            $scope.fetchPlaylists();
        };

        // TODO implement this.
        $scope.copySongToPlaylist = function() {
            //console.log("playlist id: " + $scope.playlistToCopy);
            // Get playlist as target playlist
            PlaylistRestService.get($scope.playlistToCopy).then(function(targetPlaylist) {
                //console.log(targetPlaylist);
                // put prepSong on the playlist
                if(targetPlaylist.songs === undefined) {
                    targetPlaylist.songs = [];
                }

                //console.log("pushing song: " + $scope.prepSong.title + " to playlist (" + $scope.playlistToCopy + ") :: " + targetPlaylist.title);
                targetPlaylist.songs.push($scope.prepSong);
                //console.log("saving song")
                targetPlaylist.put();
                //console.log("saved")
            });
        };

        $scope.moveSongToPlaylist = function() {
            $scope.copySongToPlaylist();

            // splice the song out of the current playlist
            var idx = $scope.findSongInPlaylist($scope.prepSong.videoId);
            $scope.playlist.songs.splice(idx, 1);

            // save both playlists.
            $scope.playlist.put();
        };

        // moveCopyPlaylistId
    }]);

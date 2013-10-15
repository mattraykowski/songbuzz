'use strict';

songbuzzApp.factory('PlayerService', function ($rootScope) {
    var playerService = {
        ytPlayer: {}, // this will hold the youtube API.
        // Player States
        PlayerState: {
            UNSTARTED: -1,
            ENDED: 0,
            PLAYING: 1,
            PAUSED: 2,
            BUFFERING: 3,
            CUED: 5,

            stateToString: function (state) {
                switch (state) {
                    case this.UNSTARTED:
                        return "unstarted";
                    case this.ENDED:
                        return "ended";
                    case this.PLAYING:
                        return "playing";
                    case this.PAUSED:
                        return "paused";
                    case this.BUFFERING:
                        return "buffering";
                    case this.CUED:
                        return "video cued";
                    default:
                        return "unknown!";
                }
            }
        },

        // Should represent the currently selected playlist.
        currentPlaylist: {},

        // Should represent the playlist that is currently playing (regardless of selected playlist).
        playingPlaylist: {},

        currentSongIndex: 0,
        currentSong: {},
        currentPlayerState: -1,

        // PLAYER STATE MANAGEMENT

        /**
         * Initializes the YouTube PlayerService
         *
         * It declares a function whose purpose is to announce to Angular that the
         * player API is fully loaded. This is different from the 'ytPlayerAPIReady'
         * event that is emitted globally, which denotes that the YouTube API script
         * has fully loaded (and is usable.) That event gets caught by PlayerControler
         * which in turn calls this initialize method to build the actual YT Player.
         *
         * When the player is fully loaded it will emit a 'ytPlayerLoaded' event.
         *
         */
        init: function () {
            var plrFn = function () {
                $rootScope.$broadcast('ytPlayerLoaded');
            };

            this.ytPlayer = new YT.Player('player', {
                height: '200',
                width: '200',
                videoId: 'vmnWJBRrVYo',
                playerVars: {
                    //autohide: 1,
                    controls: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': plrFn,
                    'onStateChange': this.setPlayerStateChange
                }
            });
        },

        /**
         * This function is used by the YouTube Player to send player state
         * and other event changes into the Angular application. Because the
         * player exists outside of the Angular application this must use Angular
         * injection to insert the event data into PlayerService. Then it emits
         * a 'ytPlayerStateChanged' event so that all controllers and services
         * may act on the state change, if necessary.
         * @param event {Object} YouTube API Event
         */
        setPlayerStateChange: function (event) {
            // This code is actually served up by the YT API, we need the actual service.
            var injector = angular.element(document).injector();
            var playerService = injector.get('PlayerService');
            playerService.currentPlayerState = event.data;
            $rootScope.$broadcast('ytPlayerStateChanged');
        },

        // PLAYER VCR CONTROLS

        /** Tells the YT player to cue the current song and then play it. */
        play: function () {
            this.ytPlayer.cueVideoById(this.currentSong.videoId);
            this.ytPlayer.playVideo();
        },

        /** Switches the current song index and playing playlist and then plays that index/playlist */
        playIndex: function (songIndex) {
            this.currentSongIndex = songIndex;
            this.playingPlaylist = this.currentPlaylist;
            this.playCurrentIndex();
        },

        /** Using the current song index, pull the song to play up from the playlist and then play it. */
        playCurrentIndex: function () {
            this.currentSong = this.playingPlaylist.songs[this.currentSongIndex];
            this.play();
        },

        /** Updates the song index and plays the next song. */
        playNext: function () {
            this.currentSongIndex++;
            if (this.currentSongIndex < this.playingPlaylist.songs.length) {
                this.playCurrentIndex();
            } else {
                this.currentSongIndex = 0;
                if (this.ytPlayer.getPlayerState() != this.PlayerState.ENDED) {
                    this.stop();
                }
                $rootScope.$broadcast('plrPlaylistEnded');
            }
        },

        /** Updates the song index and plays the previous next song. */
        playPrevious: function () {
            this.currentSongIndex--;
            if (this.currentSongIndex >= 0) {
                this.playCurrentIndex();
            } else {
                this.currentSongIndex = 0;
                if(this.ytPlayer.getPlayerState() == this.PlayerState.PLAYING) {
                    this.playCurrentIndex();
                } else {
                    this.stop();
                }
            }


        },

        /** This function makes the YT API stop the video playback. */
        stop: function () {
            this.ytPlayer.stopVideo();
        },

        /** This function makes the YT API pause the video playback. */
        pause: function () {
            this.ytPlayer.pauseVideo();
        },

        /** This function makes the YT API pause the video playback. */
        unpause: function () {
            this.ytPlayer.playVideo();
        },

        /**
         * This passes the requested time position in to the YouTube Player
         * @param time_position {number} time in seconds to seek to.
         */
        seekTime: function(time_position) {
            this.ytPlayer.seekTo(time_position);
        },

        /**
         * Changes the current playlist, initializes the song array (if necessary) and
         * emits a 'changePlaylist' event.
         *
         * @param playlist {Object} A playlist object.
         */
        changePlaylist: function (playlist) {
            this.currentPlaylist = playlist;
            // fix up in case songs aren't on there.
            if (this.currentPlaylist.songs == undefined) {
                this.currentPlaylist.songs = [];
            }
            $rootScope.$broadcast('changePlaylist');
        },

        // Misc. Player Utilities

        /**
         * Retrieves the current song duration.
         *
         * @return {number} the current song duration or 0 if uninitialized.
         */
        getPlayerDuration: function () {
            if (this.ytPlayer.getDuration == undefined) {
                return 0;
            }
            return this.ytPlayer.getDuration();
        },

        /**
         * Retrieves the current song time position.
         *
         * @returns {number} the current song position or 0 if unitialized.
         */
        getPlayerCurrentTime: function () {
            if (this.ytPlayer.getCurrentTime == undefined) {
                return 0;
            }
            return this.ytPlayer.getCurrentTime();
        }
    };

    return playerService;
});
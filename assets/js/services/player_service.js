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

        init: function () {
            var plrFn = function () {
                $rootScope.$broadcast('ytPlayerLoaded');
            };

            this.ytPlayer = new YT.Player('player', {
                height: '360',
                width: '480',
                videoId: 'Ys9sIqv42lo',
                autohide: 0,
                events: {
                    'onReady': plrFn,
                    'onStateChange': this.setPlayerStateChange
                }
            });
        },

        setPlayerStateChange: function (event) {
            // This code is actually served up by the YT API, we need the actual service.
            var injector = angular.element(document).injector();
            var playerService = injector.get('PlayerService');
            playerService.currentPlayerState = event.data;
            $rootScope.$broadcast('ytPlayerStateChanged');
        },

        // PLAYER VCR CONTROLS

        // This function makes the YT API play a new video ID.
        play: function () {
            console.log(this.currentSong.videoId);
            this.ytPlayer.cueVideoById(this.currentSong.videoId);
            this.ytPlayer.playVideo();
        },

        // This is used to play a song and switch playlists.
        playIndex: function (songIndex) {
            this.currentSongIndex = songIndex;
            this.playingPlaylist = this.currentPlaylist;
            this.playCurrentIndex();
        },

        playCurrentIndex: function () {
            this.currentSong = this.playingPlaylist.songs[this.currentSongIndex];
            this.play();
        },

        // Updates the song index and plays the next song.
        playNext: function () {
            this.currentSongIndex++;
            if (this.currentSongIndex < this.playingPlaylist.songs.length) {
                console.log("playing next");
                this.playCurrentIndex();
            } else {
                console.log("end of playlist");
                this.currentSongIndex = 0;
                if (this.ytPlayer.getPlayerState() != this.PlayerState.ENDED) {
                    console.log("stopping player");
                    this.stop();
                }
                $rootScope.$broadcast('plrPlaylistEnded');
            }
        },

        // Updates the song index and plays the previous next song.
        playPrevious: function () {

        },

        // This function makes the YT API stop the video playback.
        stop: function () {
            this.ytPlayer.stopVideo();
        },

        // This function makes the YT API pause the video playback.
        pause: function () {
            this.ytPlayer.pauseVideo();
        },

        // This function makes the YT API pause the video playback.
        unpause: function () {
            this.ytPlayer.playVideo();
        },

        changePlaylist: function (playlist) {
            console.log(playlist);
            this.currentPlaylist = playlist;
            // fix up in case songs aren't on there.
            if (this.currentPlaylist.songs == undefined) {
                this.currentPlaylist.songs = [];
            }
            $rootScope.$broadcast('changePlaylist');
        },

        // Misc. Player Utilities

        getPlayerDuration: function () {
            if (this.ytPlayer.getDuration == undefined) {
                return 0;
            }
            return this.ytPlayer.getDuration();
        },

        getPlayerCurrentTime: function () {
            if (this.ytPlayer.getCurrentTime == undefined) {
                console.log("ytPlayer is messed up");
                return 0;
            }
            return this.ytPlayer.getCurrentTime();
        }
    };

    return playerService;
});
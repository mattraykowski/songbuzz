'use strict';

/* Services */

//songbuzzApp.factory('PlaylistService', function($resource) {
//    return $resource('/playlist/:playlistId', {
//        playlistId: "@id",
//        callback: 'JSON_CALLBACK',
//        'save':   {method:'PUT'},
//        'create':   {method:'POST'}
//    });
//});

songbuzzApp.factory('YouTubeAPI', function($http) {
    var ytApi = {
        apiKey: 'AI39si5fQp3u-rWZRzNeycrh-4zMK2tV2yq4_eI72kf2gH0fQzl1NJgZjwFkiUwvoxPmYeKWa3Q2-2bWLE2FYY-TZISue6WswA',
        execQuery: function(searchTerm, response) {
            return $http.jsonp('https://gdata.youtube.com/feeds/api/videos', {
                params: {
                    'alt': 'json-in-script',
                    'category': 'Music',
                    'key': this.apiKey,
                    'q': searchTerm,
                    'callback': 'JSON_CALLBACK'
                }
            }).success(function(data, status, headers, config) {
                var retArray = data.feed.entry.map(function(vid) {
                    var title = vid.title.$t;
                    var viewCount = vid.yt$statistics.viewCount;
                    var videoId = vid.id.$t.slice(vid.id.$t.lastIndexOf('/') + 1, vid.id.$t.length);
                    var linkUrl = '';
                    var thumbUrl = '';
                    var duration = vid.media$group.yt$duration.seconds;

                    vid.link.forEach(function(element, index, array) {
                        if (element.rel == 'alternate') {
                            linkUrl = element.href;
                        }
                    });
                    
                    var foundThumb = false;
                    vid.media$group.media$thumbnail.forEach(function(element, index, array) {
                        if (element.height == 90 && !foundThumb) {
                            thumbUrl = element.url;
                        }
                    });

                    var entry = {
                        title: title,
                        viewCount: viewCount,
                        videoId: videoId,
                        url: linkUrl,
                        thumbUrl: thumbUrl,
                        duration: duration
                    };

                    return entry;

                });

                response(retArray);
            }).error(function(data, status, headers, config) {
                response([]);
            });
        }
    };

    return ytApi;
});

//songbuzzApp.factory('PlayerService', function($rootScope) {
//    var playerService = {
//        // Contains the YouTube Player API object.
//        ytPlayer: {},
//
//        // Should represent the currently selected playlist.
//        currentPlaylist: {},
//        
//        // Should represent the playlist that is currently playing (regardless of selected playlist).
//        playingPlaylist: {},
//        currentSongIndex: 0,
//        
//        changePlaylist: function(playlist) {
//            this.currentPlaylist = playlist;
//            $rootScope.$broadcast('changePlaylist');
//        },
//        
//        requestSongChange: function(songIndex) {
//            this.currentSongIndex = songIndex;
//            this.playingPlaylist = this.currentPlaylist;
//            $rootScope.$broadcast('requestSongChange');
//        },
//
//        // This method is invooked when the YouTube Player API has completely loaded.
//        setPlayerAPIReady: function() {
//            this.ytPlayer = new YT.Player('player', {
//                height: '200',
//                width: '200',
//                videoId: 'u1zgFlCw8Aw',
//                autohide: 0,
//                events: {
//                    'onReady': this.setPlayerReady,
//                    'onStateChange': this.setPlayerStateChange
//                }
//            });
//        },
//
//        setPlayerReady: function() {
//            $rootScope.$broadcast('ytPlayerLoaded');
//        },
//
//        setPlayerStateChange: function(event) {
//            if (event.data == YT.PlayerState.ENDED) {
//                $rootScope.$broadcast('ytPlayerEnded');
//            }
//        }
//    };
//    
//    return playerService;
//});

songbuzzApp.factory('PlayerService', function($rootScope) {
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

            stateToString: function(state) {
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

        init: function() {
            var plrFn = function() {
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

        setPlayerStateChange: function(event) {
            // This code is actually served up by the YT API, we need the actual service.
            var injector = angular.element(document).injector();
            var playerService = injector.get('PlayerService');
            playerService.currentPlayerState = event.data;
            $rootScope.$broadcast('ytPlayerStateChanged');
        },

        // PLAYER VCR CONTROLS

        // This function makes the YT API play a new video ID.
        play: function() {
            this.ytPlayer.cueVideoById(this.currentSong.videoId);
            this.ytPlayer.playVideo();
        },
        
        // This is used to play a song and switch playlists.
        playIndex: function(songIndex) {
            this.currentSongIndex = songIndex;
            this.playingPlaylist = this.currentPlaylist;
            this.playCurrentIndex();
        },
        
        playCurrentIndex: function() {
            this.currentSong = this.playingPlaylist.songs[this.currentSongIndex];
            this.play();
        },
        
        // Updates the song index and plays the next song.
        playNext: function() {
            this.currentSongIndex++;
            if(this.currentSongIndex < this.playingPlaylist.songs.length) {
                console.log("playing next");
                this.playCurrentIndex();
            } else {
                console.log("end of playlist");
                this.currentSongIndex = 0;
                if(this.ytPlayer.getPlayerState() != this.PlayerState.ENDED) {
                    console.log("stopping player");
                    this.stop();
                }
                $rootScope.$broadcast('plrPlaylistEnded');
            }
        },
        
        // Updates the song index and plays the previous next song.
        playPrevious: function() {
            
        },
        
        // This function makes the YT API stop the video playback.
        stop: function() {
            this.ytPlayer.stopVideo();
        },
        
        // This function makes the YT API pause the video playback.
        pause: function() {
            this.ytPlayer.pauseVideo();
        },
        
        // This function makes the YT API pause the video playback.
        unpause: function() {
            this.ytPlayer.playVideo();
        },
        
        changePlaylist: function(playlist) {
            console.log(playlist);
            this.currentPlaylist = playlist;
            // fix up in case songs aren't on there.
            if(this.currentPlaylist.songs == undefined) {
              this.currentPlaylist.songs = [];
            }
            $rootScope.$broadcast('changePlaylist');
        },
        
        // Misc. Player Utilities
        
        getPlayerDuration: function() {
            if(this.ytPlayer.getDuration == undefined) {
              return 0;
            }
            return this.ytPlayer.getDuration();
        },
        
        getPlayerCurrentTime: function() {
            if(this.ytPlayer.getCurrentTime == undefined) {
                console.log("ytPlayer is messed up");
              return 0;
            } 
            return this.ytPlayer.getCurrentTime();
        }
    };

    return playerService;
});

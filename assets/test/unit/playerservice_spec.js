describe("PlayerService", function() {
    var scope;
    var $controller;
    var rootScope;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function(_$rootScope_, _PlayerService_) {
        PlayerService = _PlayerService_;
        rootScope = _$rootScope_;

        // Set up the mock data.
        PlayerService.currentSongIndex = 0;
        PlayerService.playingPlaylist =  samplePlaylists[0];
        PlayerService.currentPlaylist = samplePlaylists[1];

        // Stub the YouTube API for spies.
        PlayerService.ytPlayer = {
            cueVideoById: function(a) {},
            playVideo: function() {},
            stopVideo: function() {},
            pauseVideo: function() {},
            getPlayerState: function() {},
            getDuration: function() {},
            getCurrentTime: function() {},
            seekTo: function(time_position) {}
        };
    }));

    describe("VCR Controls", function() {
        describe("play", function() {
            it("should request the YouTube API to cue the currentSong by videoId", function() {
                PlayerService.currentSong = { videoId: 'abc' };
                spyOn(PlayerService.ytPlayer, 'cueVideoById');
                spyOn(PlayerService.ytPlayer, 'playVideo');

                PlayerService.play();
                expect(PlayerService.ytPlayer.cueVideoById).toHaveBeenCalledWith('abc');
                expect(PlayerService.ytPlayer.playVideo).toHaveBeenCalled();
            });
        });

        describe("playIndex", function() {
            it("should set the current song index", function() {
                spyOn(PlayerService, 'playCurrentIndex');

                expect(PlayerService.currentSongIndex).toBe(0);
                PlayerService.playIndex(1);
                expect(PlayerService.currentSongIndex).toBe(1);
            });
            it("should set the playing playlist to the one currently selected", function() {
                spyOn(PlayerService, 'playCurrentIndex');

                expect(PlayerService.playingPlaylist).toNotBe(PlayerService.currentPlaylist);
                PlayerService.playIndex(1);
                expect(PlayerService.playingPlaylist).toBe(PlayerService.currentPlaylist);
            });
            it("should call playCurrentIndex to begin playback", function() {
                spyOn(PlayerService, 'playCurrentIndex');

                PlayerService.playIndex(0);
                expect(PlayerService.playCurrentIndex).toHaveBeenCalled();
            });
        });

        describe("playCurrentIndex", function() {
            it("should set the current song to the song indicated by current song index", function() {
                spyOn(PlayerService, 'play');

                // In setup the current song index is 0
                PlayerService.currentSong = PlayerService.playingPlaylist.songs[1];
                PlayerService.playCurrentIndex();
                expect(PlayerService.currentSong).toNotBe(PlayerService.playingPlaylist.songs[1]);
                expect(PlayerService.currentSong).toBe(PlayerService.playingPlaylist.songs[0]);
            });

            it("should call the play method in order to begin YT playback", function() {
                spyOn(PlayerService, 'play');

                PlayerService.playCurrentIndex();
                expect(PlayerService.play).toHaveBeenCalled();
            });
        });

        describe("playNext", function() {
            describe("when there are more songs to play", function() {
                it("should increment the current song index", function() {
                    spyOn(rootScope, '$broadcast');
                    spyOn(PlayerService, 'playCurrentIndex');

                    // We'll need a playlist from the sample data with more than 1 song.
                    PlayerService.playingPlaylist = samplePlaylists[8];

                    expect(PlayerService.currentSongIndex).toBe(0);
                    PlayerService.playNext();
                    expect(PlayerService.currentSongIndex).toBe(1);
                });

                it("should call playCurrentIndex to play the next song", function() {
                    spyOn(rootScope, '$broadcast');
                    spyOn(PlayerService, 'playCurrentIndex');

                    // We'll need a playlist from the sample data with more than 1 song.
                    PlayerService.playingPlaylist = samplePlaylists[8];

                    PlayerService.playNext();
                    expect(PlayerService.playCurrentIndex).toHaveBeenCalled();
                });
            });

            describe("when at the end of the playlist", function() {
                beforeEach(function() {
                    // We'll need a playlist from the sample data with more than 1 song.
                    PlayerService.playingPlaylist = samplePlaylists[8];

                    // We'll want to fast-forward to the last song.
                    PlayerService.currentSongIndex = PlayerService.playingPlaylist.songs.length - 1;
                });

                it("should set the currentSongIndex back to 0", function() {
                    spyOn(rootScope, '$broadcast');
                    spyOn(PlayerService, 'playCurrentIndex');

                    PlayerService.playNext();
                    expect(PlayerService.currentSongIndex).toBe(0);
                });

                it("should stop the player if it is playing", function() {
                    spyOn(rootScope, '$broadcast');
                    spyOn(PlayerService, 'stop');

                    // Return playing so it should try to stop the player.
                    spyOn(PlayerService.ytPlayer, 'getPlayerState').andReturn(PlayerService.PLAYING);

                    PlayerService.playNext();
                    expect(PlayerService.stop).toHaveBeenCalled();
                });

                it("should emit a plrPlaylistEnded event", function() {
                    spyOn(rootScope, '$broadcast');
                    spyOn(PlayerService, 'stop');

                    // Return playing so it should try to stop the player.
                    spyOn(PlayerService.ytPlayer, 'getPlayerState').andReturn(PlayerService.PlayerState.PLAYING);

                    PlayerService.playNext();
                    expect(rootScope.$broadcast).toHaveBeenCalledWith('plrPlaylistEnded');
                });
            });
        });

        describe("playPrevious", function() {
            describe("when not at the beginning of the playlist", function() {
                beforeEach(function() {
                    // We'll need a playlist from the sample data with more than 1 song.
                    PlayerService.playingPlaylist = samplePlaylists[8];

                    // We'll want to fast-forward to the last song.
                    PlayerService.currentSongIndex = PlayerService.playingPlaylist.songs.length - 1;
                });

                it("should decrement the currentSongIndex", function() {
                    var previousIndex = PlayerService.currentSongIndex;
                    spyOn(PlayerService, 'playCurrentIndex');

                    PlayerService.playPrevious();
                    expect(PlayerService.currentSongIndex).toBe(previousIndex-1);
                });

                it("should call playCurrentIndex to play the new song", function() {
                    spyOn(PlayerService, 'playCurrentIndex');

                    PlayerService.playPrevious();
                    expect(PlayerService.playCurrentIndex).toHaveBeenCalled();
                });
            });

            // Note that the default sample playlist has 1 song.
            describe("when at the beginning of the playlist", function() {
                it("should set the currentSongIndex to 0", function() {
                    spyOn(PlayerService, 'playCurrentIndex');

                    PlayerService.playPrevious();
                    expect(PlayerService.currentSongIndex).toBe(0);
                });
                describe("when already playing", function() {
                    it("should restart the song", function() {
                        spyOn(PlayerService, 'playCurrentIndex');
                        // Return playing so it should restart the track.
                        spyOn(PlayerService.ytPlayer, 'getPlayerState').andReturn(PlayerService.PlayerState.PLAYING);

                        PlayerService.playPrevious();
                        expect(PlayerService.playCurrentIndex).toHaveBeenCalled();
                    });
                });
                describe("when not playing", function() {
                    it("should stop the player", function() {
                        spyOn(PlayerService, 'playCurrentIndex');
                        spyOn(PlayerService, 'stop');
                        // Return playing so it should restart the track.
                        spyOn(PlayerService.ytPlayer, 'getPlayerState').andReturn(PlayerService.PlayerState.BUFFERING);

                        PlayerService.playPrevious();
                        expect(PlayerService.stop).toHaveBeenCalled();
                    });
                });
            });
        });

        describe("stop", function() {
            it("should call the YouTube API to stop playback", function() {
                spyOn(PlayerService.ytPlayer, 'stopVideo');

                PlayerService.stop();
                expect(PlayerService.ytPlayer.stopVideo).toHaveBeenCalled();
            });
        });

        describe("pause", function() {
            it("should call the YouTube API to pause playback", function() {
                spyOn(PlayerService.ytPlayer, 'pauseVideo');

                PlayerService.pause();
                expect(PlayerService.ytPlayer.pauseVideo).toHaveBeenCalled();
            });
        });

        describe("unpause", function() {
            it("should call the YouTube API to start playback", function() {
                spyOn(PlayerService.ytPlayer, 'playVideo');

                PlayerService.unpause();
                expect(PlayerService.ytPlayer.playVideo).toHaveBeenCalled();
            });
        });

        describe("seekTime", function() {
            it("should call the YouTube API to seek to a time position", function() {
                spyOn(PlayerService.ytPlayer, 'seekTo');

                PlayerService.seekTime(100);
                expect(PlayerService.ytPlayer.seekTo).toHaveBeenCalledWith(100);
            })
        })
    });

    describe("player utilities", function() {
        describe("changePlaylist", function() {
            it("should chnage the current playlist object", function() {
                spyOn(rootScope, '$broadcast');

                expect(PlayerService.currentPlaylist).toBe(samplePlaylists[1]);
                PlayerService.changePlaylist(samplePlaylists[2]);
                expect(PlayerService.currentPlaylist).toBe(samplePlaylists[2]);
            });

            it("should default the songs object to an empty array if not defined", function() {
                spyOn(rootScope, '$broadcast');
                PlayerService.changePlaylist(samplePlaylists[1]);
                expect(samplePlaylists[1].songs).toBeDefined();
            });
        });

        describe("getPlayerDuration", function() {
            it("should return 0 if the player is not ready", function() {
                delete PlayerService.ytPlayer.getDuration;

                expect(PlayerService.getPlayerDuration()).toBe(0);
            });

            it("should return the duration from the YouTube player", function() {
                spyOn(PlayerService.ytPlayer, 'getDuration').andReturn(100);

                expect(PlayerService.getPlayerDuration()).toBe(100);
            });
        });

        describe("getPlayerCurrentTime", function() {
            it("should return 0 if the player is not ready", function() {
                delete PlayerService.ytPlayer.getCurrentTime;

                expect(PlayerService.getPlayerCurrentTime()).toBe(0);
            });

            it("should return the current play-time from the YouTube player", function() {
                spyOn(PlayerService.ytPlayer, 'getCurrentTime').andReturn(100);

                expect(PlayerService.getPlayerCurrentTime()).toBe(100);
            });
        });
    });
});
describe("PlaylistDetailController", function () {
    var scope;
    var $controller;
    var playerCtrl;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$routeParams_, _PlayerService_, _PlaylistRestService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        PlayerService = _PlayerService_;

        playlistDetailCtrl = $controller('PlaylistDetailController', {
            $scope: scope,
            $routeParams: _$routeParams_,
            PlayerService: _PlayerService_,
            PlaylistRestService: _PlaylistRestService_
        });
    }));

    describe("friendlyDuration", function () {
        it("should return a friendly human readable duration", function () {
            expect(scope.friendlyDuration(66)).toBe("1m 6s");
            expect(scope.friendlyDuration(300)).toBe("5m 0s");
        });
    });

    describe("findSongInPlaylist", function() {
        beforeEach(function() {
            scope.playlist = {
                songs: [
                    { videoId: '1234'},
                    { videoId: '5678'}
                ]
            };
        });

        it("should find a song based on its videoId and return its index", function(){
            expect(scope.findSongInPlaylist(scope.playlist.songs[1].videoId)).toBe(1);
        });

        it("should return the the initial index if the song is not found", function() {
            expect(scope.findSongInPlaylist(scope.playlist.songs[1].videoId + "1")).toBe(0);
        })
    });

    describe("removeSong", function () {
        beforeEach(function() {
            scope.playlist = {
                put: function() {},
                songs: [
                    { videoId: '1234'},
                    { videoId: '5678'}
                ]
            };

            // We'll need to spy on bootbox to override its confirm method.
            spyOn(bootbox, 'confirm').andCallFake(function(msg,cb) { cb(true); });
        });

        it("should remove a song based on its videoId", function () {
            spyOn(scope.playlist.songs, 'splice');
            scope.removeSong(scope.playlist.songs[1]);

            expect(scope.playlist.songs.splice).toHaveBeenCalledWith(1,1);
        });

        it("should save the playlist", function() {
            spyOn(scope.playlist, 'put');

            scope.removeSong(scope.playlist.songs[0]);
            expect(scope.playlist.put).toHaveBeenCalled();
        })
    });

    describe("playSong", function() {
        beforeEach(function() {
            spyOn(PlayerService,'playIndex');
            scope.playlist = {
                songs: [
                    { videoId: '1234'},
                    { videoId: '5678'}
                ]
            };
        });

        it("should play the song by index", function() {
            scope.playSong({videoId: scope.playlist.songs[1].videoId});
            expect(PlayerService.playIndex).toHaveBeenCalledWith(1);
        });
    })

    describe("onPlaylistSorted", function () {
        it("should save a playlist", function () {
            scope.songFilter = "";
            scope.playlist = {
                put: function () {}
            };
            spyOn(scope.playlist, 'put');

            scope.onPlaylistSorted(null, null);
            expect(scope.playlist.put).toHaveBeenCalled();
        });

        it("should cancel sorting if the list is filtered", function() {
            scope.playlist = {
                put: function () {}
            };
            var ui = {
                item: {
                    sortable: function() { },
                    parent: function() { return { sortable: this.sortable } }
                }
            };
            spyOn(ui.item, 'sortable');
            scope.songFilter = "something";

            scope.onPlaylistSorted(null, ui);
            expect(ui.item.sortable).toHaveBeenCalled();
        });
    });

    describe("changePlaylist event handler", function () {
        it("should receive 'changePlaylist' call the fetch method", inject(function ($rootScope) {
            spyOn(scope, 'fetchPlaylist');
            PlayerService.currentPlaylist = samplePlaylists[0];

            $rootScope.$broadcast('changePlaylist');

            expect(scope.fetchPlaylist).toHaveBeenCalledWith(samplePlaylists[0].id);
        }));
    });

    describe("fetchPlaylist", function() {
        it("should fetch the current playlist by ID.", inject(function ($rootScope, PlaylistRestService) {
            spyOn(PlaylistRestService, 'get').andReturn(getThenObject(samplePlaylists[1]))
            scope.fetchPlaylist(samplePlaylists[1].id);
            expect(PlaylistRestService.get).toHaveBeenCalledWith(samplePlaylists[1].id);
        }));
    })

    describe("doAddSelectedSong", function () {
        it("should add new songs to playlists from the search results", function () {
            scope.playlist = {
                songs: [],
                put: function () {
                }
            };
            scope.ytSelectVideo = sampleYouTubeAPISongEntry;

            spyOn(scope.playlist, 'put');

            scope.doAddSelectedSong();

            expect(scope.playlist.songs.length).toBe(1);
            expect(scope.playlist.songs[0].videoId).toBe(sampleYouTubeAPISongEntry.videoId);
            expect(scope.playlist.put).toHaveBeenCalled();
        });

        it("should initialize the playlist songs array if not defined.", function () {
            // explicitly define playlists without the 'songs' array.
            scope.playlist = {
                put: function() {}
            };
            scope.ytSelectVideo = sampleYouTubeAPISongEntry;

            expect(scope.playlist.songs).toBeUndefined();
            scope.doAddSelectedSong();
            expect(scope.playlist.songs.length).toBe(1);
        });

        it("should not do anything if ytSelectVideo isn't in the scope", function () {
            // TODO: implement this test.
        });
    });

    describe("isPlayingSong", function() {
        it("should return true if 'song' is playing", function() {
            var sample_song = samplePlaylists[0].songs[0];
            PlayerService.currentSong = sample_song;

            expect(scope.isPlayingSong(sample_song)).toBeTruthy();
        });
    });

    describe("playingBadgeText", function() {
        it("should return the playing state string", function() {
            spyOn(PlayerService.PlayerState, 'stateToString').andReturn('playing');
            PlayerService.currentPlayerState = PlayerService.PlayerState.PLAYING;

            expect(scope.playingBadgeText()).toBe('playing');
        });
    })
});

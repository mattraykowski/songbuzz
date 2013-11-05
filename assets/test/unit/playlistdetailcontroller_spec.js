describe("PlaylistDetailController", function () {
    var scope;
    var $controller;
    var playerCtrl;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$timeout_, _$routeParams_, _PlayerService_, _PlaylistRestService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        PlayerService = _PlayerService_;

        playlistDetailCtrl = $controller('PlaylistDetailController', {
            $scope: scope,
            $timeout: _$timeout_,
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

    describe("formatYtSong", function () {
        it("should convert a YT search result to a local song object", function () {
            // TODO: implement this.
        });
    });

    describe("removeSong", function () {
        it("should remove a song based on its array index", function () {
            // TODO: implement this.
        });
    });

    describe("onPlaylistSorted", function () {
        it("should save a playlist", function () {
            // TODO: implement this.
        });
    });

    describe("changePlaylist event handler", function () {
        it("should receive 'changePlaylist' call the fetch method", inject(function ($rootScope, $timeout) {
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
            expect(scope.playlist.songs[0].videoId).toBe("4vTyEy7Dn70");
            expect(scope.playlist.put).toHaveBeenCalled();
        });

        it("should initialize the playlist songs array if not defined.", function () {
            // TODO: implement this test.
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

describe("PlaylistDetailController", function () {
    var scope;
    var $controller;
    var playerCtrl;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$timeout_, _$routeParams_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;

        playlistDetailCtrl = $controller('PlaylistDetailCtrl', {
            $scope: scope,
            $timeout: _$timeout_,
            $routeParams: _$routeParams_,
            PlayerService: PlayerServiceMock,
            PlaylistService: PlaylistServiceMock,
            YouTubeAPI: YouTubeAPIMock
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
        it("should receive 'changePlaylist' and update the the current playlist.", inject(function ($rootScope, $timeout) {
            scope.playlist = samplePlaylists[0];
            PlayerServiceMock.currentPlaylist = samplePlaylists[1];

            $rootScope.$broadcast('changePlaylist');

            expect(scope.playlist).toBe(samplePlaylists[1]);
        }));
    });

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
});

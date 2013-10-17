describe("PlaylistDetailController", function () {
    var scope;
    var $controller;
    var playerCtrl;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$timeout_, _$routeParams_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;

        playlistDetailCtrl = $controller('PlaylistDetailController', {
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
        it("should receive 'changePlaylist' call the fetch method", inject(function ($rootScope, $timeout) {
            spyOn(scope, 'fetchPlaylist');
            PlayerServiceMock.currentPlaylist = samplePlaylists[0];

            $rootScope.$broadcast('changePlaylist');

            expect(scope.fetchPlaylist).toHaveBeenCalledWith(samplePlaylists[0].id);
        }));
    });

    describe("fetchPlaylist", function() {
        it("should fetch the current playlist by ID.", inject(function ($rootScope, $httpBackend) {
            // It's going to try and retrieve the default playlist first. Get that out of the way.
            $httpBackend.expectGET('/playlist/509ad256be436abe20000002').respond(samplePlaylists[0]);
            $rootScope.$digest();

            // Now begin testing the fetch method.
            $httpBackend.expectGET("/playlist/" + samplePlaylists[1].id).respond(samplePlaylists[1]);

            scope.fetchPlaylist(samplePlaylists[1].id);

            $rootScope.$digest();

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
});

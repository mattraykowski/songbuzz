describe("PlaylistListController", function() {
	var scope;
	var $controller;
    var PlaylistRestService;

	beforeEach(module('songbuzz'));
	beforeEach(inject(function(_$rootScope_, _$controller_, _$timeout_, _$location_, _PlaylistRestService_) {
        var rootScope = _$rootScope_;
		scope = _$rootScope_.$new();
		$controller = _$controller_;
        PlaylistRestService = _PlaylistRestService_;

		var playlistListCtrl = $controller('PlaylistListController', {
			$scope: scope,
			$timeout: _$timeout_,
            $location: _$location_,
			PlayerService: PlayerService,
            PlaylistRestService: _PlaylistRestService_
		});
	}));

    describe("updatePlaylists", function() {
        it("should get the playlists via REST", function() {
            spyOn(PlaylistRestService, 'getAll').andReturn(getThenObject(samplePlaylists));
            scope.updatePlaylists();
            expect(PlaylistRestService.getAll).toHaveBeenCalled();
        });
    });

    describe("addNewPlaylist", function() {
        it("should add a new playlist via REST and then request an update", function() {
            scope.playlistTitle = "Test XYZ";
            spyOn(PlaylistRestService, "create").andReturn(getThenObject({}));
            spyOn(scope, 'updatePlaylists');

            scope.addNewPlaylist();
            expect(PlaylistRestService.create).toHaveBeenCalledWith({title: scope.playlistTitle});
            expect(scope.updatePlaylists).toHaveBeenCalled();
        });
    });

    describe("deletePlaylist", function() {
        it("remove the playlist via REST", function() {
            // Mock up the sample playlists and select one to delete.
            scope.playlists = samplePlaylists;
            var toDeletePlaylist = samplePlaylists[0];

            // Catch the call to Restangular remove.
            spyOn(toDeletePlaylist, 'remove').andReturn({ then: function(cb) { cb(); } });
            // Spy on the updatePlaylists method - the callback should request an update.
            spyOn(scope, 'updatePlaylists');

            scope.deletePlaylist(toDeletePlaylist);

            // fix this expectation. It should match but does not, even though the code works.
            expect(toDeletePlaylist.remove).toHaveBeenCalled();
            expect(scope.updatePlaylists).toHaveBeenCalled();
        });
    });

    describe("changePlaylist", function(){
        it("should change location to the detailed view",  inject(function($location) {
            var idx = 1;
            scope.playlists = samplePlaylists;

            scope.changePlaylist(idx);
            expect($location.path()).toBe('/playlists/' + samplePlaylists[idx].id);
        }));
    });

    describe("isPlaying", function() {
        beforeEach(function() {
            PlayerService.playingPlaylist = {
                id: '1234',
                title: 'test'
            };
        });

        it("should return true if the playlist ID matches", function() {
            //console.log(typeof PlayerService.playingPlaylist.id)
            expect(scope.isPlaying(PlayerService.playingPlaylist.id)).toBeTruthy();
        });

        it("should return false if the playlist ID does not match", function() {
            expect(scope.isPlaying(PlayerService.playingPlaylist.id + "1")).toBeFalsy();
        });
    })
});

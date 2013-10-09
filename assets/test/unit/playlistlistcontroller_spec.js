describe("PlaylistListController", function() {
	var scope;
	var $controller;
	var playerCtrl;

	beforeEach(module('songbuzz'));
	beforeEach(inject(function(_$rootScope_, _$controller_, _$timeout_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;

		playlistListCtrl = $controller('PlaylistListCtrl', {
			$scope: scope,
			$timeout: _$timeout_,
			PlayerService: PlayerServiceMock,
            PlaylistService: PlaylistServiceMock
		});
	}));
    
    it("should call the PlaylistService and populate the playlists immediately", function() {
        expect(scope.playlists).toBe(samplePlaylists);
    });
    
    it("should request the PlayerService change playlists", function() {
        spyOn(PlayerServiceMock, 'changePlaylist');
        
        var idx = 1;
        var playlist = samplePlaylists[idx];
        
        scope.changePlaylist(idx);
        expect(PlayerServiceMock.changePlaylist).toHaveBeenCalledWith(playlist);
    })
    
    it("TODO should create a new playlist entry and save it and then request an update", inject(function($rootScope, $timeout) {
        spyOn(PlaylistServiceMock, '$save');
        spyOn(scope, 'updatePlaylists');
        
        scope.playlistTitle = "Test XYZ";
        //expect(PlaylistServiceMock.$save).toHaveBeenCalled();
        
        //expect(scope.updatePlaylists).toHaveBeenCalled();
    }));
    
});

describe("PlaylistDetailController", function() {
	var scope;
	var $controller;
	var playerCtrl;

	beforeEach(module('songbuzz'));
	beforeEach(inject(function(_$rootScope_, _$controller_, _$timeout_, _$routeParams_) {
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
    
    it("should return a friendly human readable duration", function() {
        expect(scope.friendlyDuration(66)).toBe("1m 6s");
        expect(scope.friendlyDuration(300)).toBe("5m 0s");
    });
    
    it("should receive 'changePlaylist' and update the the current playlist.", inject(function($rootScope, $timeout) {
        scope.playlist = samplePlaylists[0];
        PlayerServiceMock.currentPlaylist = samplePlaylists[1];
        
        $rootScope.$broadcast('changePlaylist');
        
        expect(scope.playlist).toBe(samplePlaylists[1]);
    }));
    
    it("should add new songs to playlists from the search results", function() {
        scope.playlist = {
            songs: [],
            $save: function() { }
        };
        scope.selectedSong = sampleYouTubeAPISongEntry;
        
        spyOn(scope.playlist, '$save');
        
        scope.doAddSelectedSong();
        
        expect(scope.playlist.songs.length).toBe(1);
        expect(scope.playlist.songs[0].videoId).toBe("GSQUA9HPtrw");
        expect(scope.playlist.$save).toHaveBeenCalled();
    })
    
});


/*


    
    
    
    */
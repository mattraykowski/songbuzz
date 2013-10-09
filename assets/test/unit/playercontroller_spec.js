describe("PlayerController", function() {
	var scope;
	var $controller;
	var playerCtrl;

	beforeEach(module('songbuzz'));
	beforeEach(inject(function(_$rootScope_, _$controller_, _$timeout_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;

		playerCtrl = $controller('PlayerCtrl', {
			$rootScope: _$rootScope_,
			$scope: scope,
			$timeout: _$timeout_,
			PlayerService: PlayerServiceMock
		});
	}));

    it("should initialize the PlayerService when the YT API is ready for use", inject(function($rootScope) {
		spyOn(PlayerServiceMock, 'init');
        spyOn(PlayerServiceMock.PlayerState, 'stateToString').andReturn('unknown!');
        
		$rootScope.$broadcast('ytPlayerAPIReady');
		expect(PlayerServiceMock.init).toHaveBeenCalled();
	}));
    
    it("should continuously update the progress percentage", inject(function($rootScope, $timeout) {
        // Set up spy.
        //spyOn(scope, '$timeout');                
        //expect(angular.$timeout).toHaveBeenCalled();
        
        spyOn(scope, 'getCurrentDuration').andReturn(500);
        spyOn(scope, 'getTotalDuration').andReturn(1000);
        
        scope.updateSongProgress();
        
        expect(scope.progress).toBe(50);
        
        $timeout.cancel(scope.songProgressTimer);
    }));
    
    it("should return the song title or return 'none' by default", function() {
        // When there's no song it should return 'none'
        //PlayerServiceMock.currentSong.title = undefined;
        expect(scope.getSongTitle()).toBe("none");
        
        PlayerServiceMock.currentSong.title = "Test ABC";
        expect(scope.getSongTitle()).toBe("Test ABC");
    });
    
    it("should return a friendly human readable duration", function() {
        expect(scope.friendlyDuration(66)).toBe("1m 6s");
        expect(scope.friendlyDuration(300)).toBe("5m 0s");
    });
    
    it("should toggle the visibility variables and notify the app of the change", function() {
        spyOn(scope, "$broadcast");
        
        scope.playerVisible = false;
        scope.toggleVisible();
        expect(scope.playerVisible).toBeTruthy();
        
        scope.playerVisible = true;
        scope.toggleVisible();
        expect(scope.playerVisible).toBeFalsy();
        expect(scope.$broadcast).toHaveBeenCalledWith('playerVisibilityChanged');
    });
    
    describe("Handle ytPlayerStateChanged...", function() {
        it("should toggle the active flags when the player ends and request the next song", inject(function($rootScope, $timeout) {
            // Set up spy.
            spyOn(scope, 'safeApply');
            spyOn($timeout, 'cancel');
            spyOn(PlayerServiceMock.PlayerState, 'stateToString').andReturn('ended');
            spyOn(PlayerServiceMock, 'playNext');
        
        	// When playing...
		    scope.playState = true;
	    	scope.pauseState = false;
            scope.progressBarPercent = 40;
        
            // Simulate the state change.
            PlayerServiceMock.currentPlayerState = 0;
            $rootScope.$broadcast('ytPlayerStateChanged');
        
            // First it should update the status string.
            expect(PlayerServiceMock.PlayerState.stateToString).toHaveBeenCalledWith(0);//.andReturn('ended');
        
            // And then cancel the progress bar timer.
            expect($timeout.cancel).toHaveBeenCalled();
        
            // Next it should request the next song to be played.
            // Any further reactions should result from future state changes.
            expect(PlayerServiceMock.playNext).toHaveBeenCalled();
        
            // And finally toggle the flags for the play/pause buttons.
            expect(scope.playState).toBeFalsy();
            expect(scope.pauseState).toBeFalsy();
        
    	}));
    
        it("should toggle the active flags when the player pauses", inject(function($rootScope, $timeout) {
            // Set up spy.
            spyOn(scope, 'safeApply');
            spyOn($timeout, 'cancel');
            spyOn(PlayerServiceMock.PlayerState, 'stateToString').andReturn('paused');
        
    	    // When playing...
		    scope.playState = true;
	    	scope.pauseState = false;
            scope.progressBarPercent = 40;
        
            // Simulate the state change.
            PlayerServiceMock.currentPlayerState = 2;
            $rootScope.$broadcast('ytPlayerStateChanged');
        
            // First it should update the status string.
            expect(PlayerServiceMock.PlayerState.stateToString).toHaveBeenCalledWith(2);//.andReturn('ended');
        
            // And then cancel the progress bar timer.
            expect($timeout.cancel).toHaveBeenCalled();
        
            // And finally toggle the flags for the play/pause buttons.
            expect(scope.playState).toBeFalsy();
            expect(scope.pauseState).toBeTruthy();
        
	    }));
    
        it("should toggle the active flags and enable the progress timer when the player starts playing", inject(function($rootScope) {
            // Set up spy.
            spyOn(scope, 'safeApply');
            spyOn(scope, 'updateSongProgress');
            spyOn(PlayerServiceMock.PlayerState, 'stateToString').andReturn('playing');
        
        
            // When playing...
    		scope.playState = false;
		    scope.pauseState = false;
            scope.progressBarPercent = 0;
        
            // Simulate the state change.
            PlayerServiceMock.currentPlayerState = 1;
            $rootScope.$broadcast('ytPlayerStateChanged');
        
            // First it should update the status string.
            expect(PlayerServiceMock.PlayerState.stateToString).toHaveBeenCalledWith(1);
        
            // And then cancel the progress bar timer.
            expect(scope.updateSongProgress).toHaveBeenCalled();
        
            // And finally toggle the flags for the play/pause buttons.
            expect(scope.playState).toBeTruthy();
            expect(scope.pauseState).toBeFalsy();
        
	    }));
    });

	
    
    
});

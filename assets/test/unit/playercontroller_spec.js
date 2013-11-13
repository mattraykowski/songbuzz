describe("PlayerController", function() {
	var scope;
	var $controller;
	var playerCtrl;

	beforeEach(module('songbuzz'));
	beforeEach(inject(function(_$rootScope_, _$controller_, _$interval_, _PlayerService_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;
        PlayerService = _PlayerService_;
        $interval = _$interval_;

		playerCtrl = $controller('PlayerController', {
			$rootScope: _$rootScope_,
			$scope: scope,
			$interval: _$interval_,
			PlayerService: _PlayerService_
		});
	}));

    describe("event handling", function() {
        describe("when 'ytPlayerAPIReady' is emitted", function() {
            it("should initialize the PlayerService when the YT API is ready for use", inject(function($rootScope) {
                spyOn(PlayerService, 'init');
                spyOn(PlayerService.PlayerState, 'stateToString').andReturn('unknown!');

                $rootScope.$broadcast('ytPlayerAPIReady');
                expect(PlayerService.init).toHaveBeenCalled();
            }));
        });
        describe("when 'ytPlayerStateChanged' is emitted", function() {
            it("should toggle the active flags when the player ends and request the next song", inject(function($rootScope) {
                // Set up spy.
                spyOn(scope, 'safeApply');
                spyOn($interval, 'cancel');
                spyOn(PlayerService.PlayerState, 'stateToString').andReturn('ended');
                spyOn(PlayerService, 'playNext');

                // When playing...
                scope.playState = true;
                scope.pauseState = false;
                scope.progressBarPercent = 40;

                // Simulate the state change.
                PlayerService.currentPlayerState = 0;
                $rootScope.$broadcast('ytPlayerStateChanged');

                // First it should update the status string.
                expect(PlayerService.PlayerState.stateToString).toHaveBeenCalledWith(0);//.andReturn('ended');

                // And then cancel the progress bar timer.
                expect($interval.cancel).toHaveBeenCalled();

                // Next it should request the next song to be played.
                // Any further reactions should result from future state changes.
                expect(PlayerService.playNext).toHaveBeenCalled();

                // And finally toggle the flags for the play/pause buttons.
                expect(scope.playState).toBeFalsy();
                expect(scope.pauseState).toBeFalsy();

            }));

            it("should toggle the active flags when the player pauses", inject(function($rootScope) {
                // Set up spy.
                spyOn(scope, 'safeApply');
                spyOn($interval, 'cancel');
                spyOn(PlayerService.PlayerState, 'stateToString').andReturn('paused');

                // When playing...
                scope.playState = true;
                scope.pauseState = false;
                scope.progressBarPercent = 40;

                // Simulate the state change.
                PlayerService.currentPlayerState = 2;
                $rootScope.$broadcast('ytPlayerStateChanged');

                // First it should update the status string.
                expect(PlayerService.PlayerState.stateToString).toHaveBeenCalledWith(2);//.andReturn('ended');

                // And then cancel the progress bar timer.
                expect($interval.cancel).toHaveBeenCalled();

                // And finally toggle the flags for the play/pause buttons.
                expect(scope.playState).toBeFalsy();
                expect(scope.pauseState).toBeTruthy();

            }));

            it("should toggle the active flags and enable the progress timer when the player starts playing", inject(function($rootScope) {
                // Set up spy.
                spyOn(scope, 'safeApply');
                spyOn(scope, 'startSongProgressJob');
                spyOn(PlayerService.PlayerState, 'stateToString').andReturn('playing');


                // When playing...
                scope.playState = false;
                scope.pauseState = false;
                scope.progressBarPercent = 0;

                // Simulate the state change.
                PlayerService.currentPlayerState = 1;
                $rootScope.$broadcast('ytPlayerStateChanged');

                // First it should update the status string.
                expect(PlayerService.PlayerState.stateToString).toHaveBeenCalledWith(1);

                // And then cancel the progress bar timer.
                expect(scope.startSongProgressJob).toHaveBeenCalled();

                // And finally toggle the flags for the play/pause buttons.
                expect(scope.playState).toBeTruthy();
                expect(scope.pauseState).toBeFalsy();
            }));
        });
    });


    describe("helper functions", function() {
        /** @todo make sure this is fully tested. */
        describe("updateSongProgress", function() {
            it("should continuously update the progress percentage", inject(function($rootScope) {
                spyOn(scope, 'getCurrentDuration').andReturn(500);
                spyOn(scope, 'getTotalDuration').andReturn(1000);

                scope.updateSongProgress();

                expect(scope.progress).toBe(50);

                $interval.cancel(scope.songProgressTimer);
            }));
        });

        describe("getSongTitle", function() {
            it("should return 'none' when there's no song or song title available", function() {
                expect(scope.getSongTitle()).toBe("none");
            });

            it("should return the song title", function() {
                PlayerService.currentSong.title = "Test ABC";
                expect(scope.getSongTitle()).toBe("Test ABC");
            });
        });

        /** @todo make sure this is fully tested. */
        describe("friendlyDuration", function() {
            it("should return a friendly human readable duration", function() {
                expect(scope.friendlyDuration(66)).toBe("1m 6s");
                expect(scope.friendlyDuration(300)).toBe("5m 0s");
            });
        });

        describe("getTotalDuration", function() {
            it("should return the YouTube player's duration", function() {
                spyOn(PlayerService, 'getPlayerDuration').andReturn(100);

                expect(scope.getTotalDuration()).toBe(100);
                expect(PlayerService.getPlayerDuration).toHaveBeenCalled();
            });
        });

        describe("getCurrentDuration", function() {
            it("should return the YouTube player's current song position", function() {
                spyOn(PlayerService, 'getPlayerCurrentTime').andReturn(100);

                expect(scope.getCurrentDuration()).toBe(100);
                expect(PlayerService.getPlayerCurrentTime).toHaveBeenCalled();
            });
        });
    });

    describe("VCR control buttons", function() {
        describe("playButton", function() {
            it("should unpause if the song is paused", function() {
                spyOn(PlayerService, 'unpause');
                PlayerService.currentPlayerState = PlayerService.PlayerState.PAUSED;

                scope.playButton();
                expect(PlayerService.unpause).toHaveBeenCalled();
            });

            it("should play if the song is not paused", function() {
                spyOn(PlayerService, 'play');
                PlayerService.currentPlayerState = PlayerService.PlayerState.ENDED;

                scope.playButton();
                expect(PlayerService.play).toHaveBeenCalled();
            });
        });

        describe("playPreviousButton", function() {
            it("should try to play the previous track", function() {
                spyOn(PlayerService, 'playPrevious');

                scope.playPreviousButton();
                expect(PlayerService.playPrevious).toHaveBeenCalled();
            });
        });

        describe("playNextButton", function() {
            it("should try to play the next track", function() {
                spyOn(PlayerService, 'playNext');

                scope.playNextButton();
                expect(PlayerService.playNext).toHaveBeenCalled();
            });
        });

        describe("stopButton", function() {
            it("should try to stop playback", function() {
                spyOn(PlayerService, 'stop');

                scope.stopButton();
                expect(PlayerService.stop).toHaveBeenCalled();
            });
        });

        describe("pauseButton", function() {
            it("should unpause if the song is paused", function() {
                spyOn(PlayerService, 'unpause');
                PlayerService.currentPlayerState = PlayerService.PlayerState.PAUSED;

                scope.pauseButton();
                expect(PlayerService.unpause).toHaveBeenCalled();
            });

            it("should pause if the song is not paused", function() {
                spyOn(PlayerService, 'pause');
                PlayerService.currentPlayerState = PlayerService.PlayerState.ENDED;

                scope.pauseButton();
                expect(PlayerService.pause).toHaveBeenCalled();
            });
        });

    });

    describe("progress bar", function() {
        describe("progressBarClick", function() {
            it("should update the progress based on the click position on the bar", function() {
                spyOn(PlayerService, 'seekTime');
                spyOn(PlayerService, 'getPlayerDuration').andReturn(1000);

                var ev = {
                    offsetX: 10,
                    currentTarget: {
                        clientWidth: 100
                    }
                };

                var seekTo = (ev.offsetX/ev.currentTarget.clientWidth)*1000;
                scope.progressBarClick(ev);
                expect(PlayerService.seekTime).toHaveBeenCalledWith(seekTo);
            });
        });
    });
});

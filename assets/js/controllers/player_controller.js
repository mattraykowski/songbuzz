'use strict';

songbuzzApp.controller('PlayerController', ['$scope', '$timeout', 'PlayerService',

    /** @constructor
     *
     * This is the PlayerController.
     *
     * @param $scope
     * @param $timeout
     * @param PlayerService
     */
    function ($scope, $timeout, PlayerService) {
        $scope.playerService = PlayerService; // save a reference for expressions and children
        $scope.playerStateMsg = PlayerService.PlayerState.stateToString(PlayerService.currentPlayerState);

        // Button states.
        $scope.playState = false;
        $scope.pauseState = false;

        // Update the player data.
        $scope.songProgressTimer = {};
        $scope.progress = 0;

        // Safely apply changes in the scope.
        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            }
            else {
                this.$apply(fn);
            }
        };

        /**
         * Asks the PlayerService to unpause if the YouTube player is paused, otherwise asks
         * the PlayerService to play.
         */
        $scope.playButton = function () {
            if (PlayerService.currentPlayerState == PlayerService.PlayerState.PAUSED) {
                // Unpause the song if one is already playing but paused.
                PlayerService.unpause();
            } else {
                PlayerService.play();
            }
        };

        /** Asks the PlayerService to play the previous song in the playlist. */
        $scope.playPreviousButton = function () {
            PlayerService.playPrevious();
        };

        /** Asks the PlayerService to play the next song in the playlist. */
        $scope.playNextButton = function () {
            PlayerService.playNext();
        };

        /** Asks the PlayerService to stop playback. */
        $scope.stopButton = function () {
            PlayerService.stop();
        };

        /**
         * Asks the PlayerService to unpause if the YouTube player is paused, otherwise asks
         * the PlayerService to pause.
         */
        $scope.pauseButton = function () {
            if (PlayerService.currentPlayerState == PlayerService.PlayerState.PAUSED) {
                // Unpause the song.
                PlayerService.unpause();
            } else {
                PlayerService.pause();
            }
        };

        /**
         * Retrieves the current song title or none if uninitialized.
         * @returns {string} the current song title.
         */
        $scope.getSongTitle = function () {
            var songTitle = PlayerService.currentSong.title;
            if (songTitle === undefined) {
                songTitle = "none";
            }
            return songTitle;
        };

        /**
         * Retrieves the current song duration.
         * @returns {number} the current song duration.
         */
        $scope.getTotalDuration = function () {
            return PlayerService.getPlayerDuration();
        };

        /**
         * Retrieves the current song position.
         * @returns {number} the current song position.
         */
        $scope.getCurrentDuration = function () {
            return PlayerService.getPlayerCurrentTime();
        };

        /**
         * Calculates the new time position and requests the YouTube Player seek to that.
         *
         * The algorithm is simple: (event.click_position/progressbar.width)*song.total_length
         *
         * @param ev {Object} a jquery event object
         */
        $scope.progressBarClick = function(ev) {
            var newTimeOffset = (ev.offsetX/ev.currentTarget.clientWidth)*PlayerService.getPlayerDuration();
            PlayerService.seekTime(newTimeOffset);
        };

        /**
         * Updates the progress variable with the current progress.
         *
         * It first reschedules the timer (running every 250ms) that updates the time
         * progress bar and then updates the progress variable used to mark the progress
         * in percentage.
         */
        $scope.updateSongProgress = function () {
            $scope.songProgressTimer = $timeout($scope.updateSongProgress, 250);
            $scope.progress = ($scope.getCurrentDuration() / $scope.getTotalDuration()) * 100;
        };

        /*********************************
         *   Event broadcast handlers.   *
         *********************************/
        $scope.$on('ytPlayerAPIReady', function () {
            PlayerService.init();
        });

        $scope.$on('ytPlayerStateChanged', function () {
            $scope.playerStateMsg = PlayerService.PlayerState.stateToString(PlayerService.currentPlayerState);

            switch (PlayerService.currentPlayerState) {
                case PlayerService.PlayerState.PLAYING:
                    $scope.playState = true;
                    $scope.pauseState = false;
                    $scope.updateSongProgress();
                    break;
                case PlayerService.PlayerState.PAUSED:
                    $scope.playState = false;
                    $scope.pauseState = true;
                    $timeout.cancel($scope.songProgressTimer);
                    break;
                case PlayerService.PlayerState.ENDED:
                    $timeout.cancel($scope.songProgressTimer);
                    $scope.progress = 0;
                    PlayerService.playNext();
                default:
                    $scope.playState = false;
                    $scope.pauseState = false;
                    break;
            }

            // Apply the state and message changes.
            $scope.safeApply();
        });


        /**
         * Formats a song duration into human readable format.
         *
         * @param songDuration {number} the duration in seconds.
         * @returns {string} a human readable time string, e.g. 1m 5s
         */
        $scope.friendlyDuration = function (songDuration) {
            var minutes = Math.floor(songDuration / 60);
            var seconds = Math.floor(songDuration - minutes * 60);
            var duration = '';

            if (minutes > 0) {
                duration = duration + minutes + 'm';
            }

            duration = duration + ' ' + seconds + 's';

            return duration;
        };
    }]);
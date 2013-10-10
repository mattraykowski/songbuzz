'use strict';

songbuzzApp.controller('PlayerCtrl', ['$scope', '$timeout', 'PlayerService',

    function ($scope, $timeout, PlayerService) {
        $scope.playerService = PlayerService; // save a reference for expressions and children
        $scope.playerVisible = false;
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

        $scope.playButton = function () {
            if (PlayerService.currentPlayerState == PlayerService.PlayerState.PAUSED) {
                // Unpause the song if one is already playing but paused.
                PlayerService.unpause();
            } else {
                PlayerService.play();
            }
        };

        $scope.playPreviousButton = function () {

        }

        $scope.playNextButton = function () {
            PlayerService.playNext();
        }

        $scope.stopButton = function () {
            PlayerService.stop();
        };

        $scope.pauseButton = function () {
            if (PlayerService.currentPlayerState == PlayerService.PlayerState.PAUSED) {
                // Unpause the song.
                PlayerService.unpause();
            } else {
                PlayerService.pause();
            }
        }

        $scope.toggleVisible = function () {
            if ($scope.playerVisible === true) {
                $scope.playerVisible = false;
            }
            else if ($scope.playerVisible === false) {
                $scope.playerVisible = true;
            }

            $scope.$broadcast('playerVisibilityChanged');
        };

        $scope.getSongTitle = function () {
            var songTitle = PlayerService.currentSong.title;
            if (songTitle === undefined) {
                songTitle = "none";
            }
            return songTitle;
        }

        $scope.getTotalDuration = function () {
            return PlayerService.getPlayerDuration();
        }

        $scope.getCurrentDuration = function () {
            return PlayerService.getPlayerCurrentTime();
        }

        $scope.updateSongProgress = function () {
            $scope.songProgressTimer = $timeout($scope.updateSongProgress, 250);
            $scope.progress = ($scope.getCurrentDuration() / $scope.getTotalDuration()) * 100;
        }

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
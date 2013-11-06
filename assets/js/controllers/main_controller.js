'use strict';

songbuzzApp.controller('MainController', ['$scope', '$timeout', 'Restangular', 'PlayerService',
    function ($scope, $timeout, Restangular, PlayerService) {
        $scope.loggedIn = false;
        $scope.currentUser = null;
        $scope.pullAuthenticationStatusTimer = null;

        /**
         * Shows a 'noty' notification message on the bottom right of the screen.
         *
         * @param message {string} A text string containing a message to display for users.
         */
        $scope.sendMessage = function(message) {
            noty({
                text: message,
                layout: 'bottomRight',
                timeout: 1500
            });
        }

        $scope.pullAuthenticationStatus = function () {
            $scope.pullAuthenticationStatusTimer = $timeout($scope.pullAuthenticationStatus, 60000);
            Restangular.all("auth").customGET("authenticated").then(function (status) {
                $scope.loggedIn = status.authenticated;
                $scope.currentUser = status.current;
            });
        }
        $scope.pullAuthenticationStatus();

        $scope.$on('ytPlayerStateChanged', function (event, song, playerState) {
            switch(playerState) {
                case PlayerService.PlayerState.ENDED:
                    $scope.sendMessage("Playback Ended: <br/> " + song.title);
                    break;
                case PlayerService.PlayerState.PLAYING:
                    $scope.sendMessage("Now Playing: " + song.title);
                    break;
            }
        });
    }]);
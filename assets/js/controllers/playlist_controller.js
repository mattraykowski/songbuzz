'use strict';

songbuzzApp.controller('PlaylistListCtrl', ['$scope', '$timeout', 'PlayerService', 'Restangular',
    function ($scope, $timeout, PlayerService, Restangular) {
        $scope.playlists = [];
        $scope.playlistService = Restangular.all('playlist');

        $scope.updatePlaylists = function () {
            //$scope.playlists = PlaylistService.query();
            $scope.playlistService.getList().then(
                function (playlists) {
                    $scope.playlists = playlists;
                });
        };

        $scope.addNewPlaylist = function () {
            $scope.playlistService.post({ title: $scope.playlistTitle})
                .then(function(response) {
                    console.log("HEEELLLPPP");
                    $scope.updatePlaylists();
                }, function() {
                    console.log("There was an error adding a new playlist.");
                });

            //$timeout($scope.updatePlaylists, 250);
        };

        $scope.deletePlaylist = function (playlist) {
            playlist.remove().then(function () {
                $scope.updatePlaylists();
            });
        };

        $scope.changePlaylist = function (idx) {
            PlayerService.changePlaylist($scope.playlists[idx]);
        };

        $scope.updatePlaylists();
    }]);
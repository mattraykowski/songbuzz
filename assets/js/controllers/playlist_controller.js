'use strict';

songbuzzApp.controller('PlaylistListController', ['$scope', '$timeout', '$location', 'PlayerService', 'Restangular',
    function ($scope, $timeout, $location, PlayerService, Restangular) {
        $scope.playlists = [];
        $scope.playlistService = Restangular.all('playlist');

        $scope.updatePlaylists = function () {
            Restangular.all('playlist').getList().then(
                function (playlists) {
                    $scope.playlists = playlists;
                });
        };

        $scope.addNewPlaylist = function () {
            $scope.playlistService.post({ title: $scope.playlistTitle})
                .then(function(response) {
                    $scope.updatePlaylists();
                }, function() {
                    console.log("There was an error adding a new playlist.");
                });
        };

        $scope.deletePlaylist = function (playlist) {
            playlist.remove().then(function () {
                $scope.updatePlaylists();
            });
        };

        $scope.changePlaylist = function (idx) {
            //PlayerService.changePlaylist($scope.playlists[idx]);
            $location.path('/playlists/'+$scope.playlists[idx].id);
        };

        $scope.updatePlaylists();
    }]);
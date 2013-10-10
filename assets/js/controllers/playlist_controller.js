'use strict';

songbuzzApp.controller('PlaylistListCtrl', ['$scope', '$timeout', 'PlayerService', 'Restangular',
    function ($scope, $timeout, PlayerService, Restangular) {
        $scope.playlists = [];

        $scope.updatePlaylists = function () {
            //$scope.playlists = PlaylistService.query();
            Restangular.all('playlist').getList().then(
                function (playlists) {
                    $scope.playlists = playlists;
                    console.log($scope.playlists);
                });
        };

        $scope.addNewPlaylist = function () {
            Restangular.all('playlist').post({ title: $scope.playlistTitle});
            $timeout($scope.updatePlaylists, 250);
        };

//    $scope.deletePlaylist = function() {
//        Restangular.

        $scope.changePlaylist = function (idx) {
            PlayerService.changePlaylist($scope.playlists[idx]);
        };

        $scope.updatePlaylists();
    }]);
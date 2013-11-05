'use strict';

songbuzzApp.controller('PlaylistListController', ['$scope', '$timeout', '$location', 'PlayerService', 'PlaylistRestService',
    function ($scope, $timeout, $location, PlayerService, PlaylistRestService) {
        $scope.playlists = [];

        $scope.updatePlaylists = function () {
            PlaylistRestService.getAll().then(
                function (playlists) {
                    $scope.playlists = playlists;
                });
        };

        $scope.addNewPlaylist = function () {
            PlaylistRestService.create({ title: $scope.playlistTitle})
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
            $location.path('/playlists/'+$scope.playlists[idx].id);
        };

        $scope.updatePlaylists();
    }]);
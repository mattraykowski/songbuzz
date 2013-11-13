'use strict';

songbuzzApp.controller('PlaylistListController', ['$scope', '$location', 'PlayerService', 'PlaylistRestService',
    function ($scope, $location, PlayerService, PlaylistRestService) {
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
            bootbox.confirm("Are you sure you want to delete this playlist?", function (result) {
                if (result === true) {
                    playlist.remove().then(function () {
                        $scope.updatePlaylists();
                        if(playlist.id == PlayerService.currentPlaylist.id) {
                            $location.path('/playlists');
                        }
                    });
                }
            });
        };

        $scope.changePlaylist = function (idx) {
            $location.path('/playlists/'+$scope.playlists[idx].id);
        };

        $scope.isPlaying = function(playlistId) {
            if(PlayerService.playingPlaylist.id == playlistId) {
                return true;
            } else {
                return false;
            }
        }

        $scope.updatePlaylists();
    }]);
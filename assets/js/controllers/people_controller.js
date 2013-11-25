'use strict';

songbuzzApp.controller('PeopleController', ['$scope', '$routeParams', 'PeopleRestService', 'PlaylistRestService', function ($scope, $routeParams, PeopleRestService, PlaylistRestService) {
    $scope.personId = null;
    if($routeParams.personId !== undefined) {
        $scope.personId = $routeParams.personId;
    }

    $scope.peopleLimit = 10;
    $scope.peopleOffset = 0;
    $scope.people = [ ];
    $scope.playlists = [ ];
    $scope.person = { };
    $scope.currentPlaylist = null;

    $scope.fetchPeople = function () {
        PeopleRestService.getAll({limit: $scope.peopleLimit, offset: $scope.peopleOffset})
            .then(function (people) {
                $scope.people = people;
            });
    };

    $scope.fetchPerson = function() {
        PeopleRestService.get($scope.personId).then(function(person) {
            $scope.person = person;

            PeopleRestService.getPlaylistsByUser($scope.personId).then(function(playlists) {
                $scope.playlists = playlists;
            })
        });
    };

    $scope.choosePlaylist = function(playlist) {
        PlaylistRestService.get(playlist.id).then(function(playlistDetail) {
            $scope.currentPlaylist = playlistDetail;
        });
    };

    $scope.addFriend = function (person) {

    };

    $scope.choosePerson = function(person) {
        $scope.personId = person.id;

        $scope.fetchPerson();
    }


    /*
     * Runtime stuff.
     */
    $scope.fetchPeople();
    if($scope.personId !== null) {
        $scope.fetchPerson();
    }
}]);
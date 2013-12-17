'use strict';

songbuzzApp.controller('PeopleController', ['$scope', '$routeParams', 'PeopleRestService', 'PlaylistRestService', function ($scope, $routeParams, PeopleRestService, PlaylistRestService) {
    $scope.personId = null;
    if($routeParams.personId !== undefined) {
        $scope.personId = $routeParams.personId;
    }

    $scope.peopleLimit = 10;
    $scope.peopleOffset = 0;
    $scope.peopleTotal = 0;
    $scope.people = [ ];
    $scope.playlists = [ ];
    $scope.person = { };
    $scope.currentPlaylist = null;

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

    $scope.fetchPeople = function () {
        console.log($scope.peopleLimit, $scope.peopleOffset);
        PeopleRestService.getAll({limit: $scope.peopleLimit, offset: $scope.peopleOffset})
            .then(function (people) {
                $scope.peopleTotal = people.count;
                $scope.people = people.people;
                console.log(people.people);
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
    };

    $scope.searchPrevPage = function() {
        if($scope.peopleOffset < 10) {
            $scope.peopleOffset = 0;
        } else {
            $scope.peopleOffset = $scope.peopleOffset - $scope.peopleLimit;
        }

        $scope.fetchPeople();
    };

    $scope.searchNextPage = function() {
        if($scope.peopleOffset+$scope.peopleLimit < $scope.peopleTotal) {
            $scope.peopleOffset = $scope.peopleOffset + $scope.peopleLimit;
        }

        $scope.fetchPeople();
    };


    /*
     * Runtime stuff.
     */
    $scope.fetchPeople();
    if($scope.personId !== null) {
        $scope.fetchPerson();
    }
}]);
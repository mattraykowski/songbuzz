'use strict';

songbuzzApp.controller('PeopleController', ['$scope', 'PeopleRestService', function ($scope, PeopleRestService) {
    $scope.peopleLimit = 10;
    $scope.peopleOffset = 0;
    $scope.people = [ ];

    $scope.fetchPeople = function () {
        PeopleRestService.getAll({limit: $scope.peopleLimit, offset: $scope.peopleOffset})
            .then(function (people) {
                $scope.people = people;
            });
    };
    $scope.fetchPeople();

    $scope.addFriend = function (index) {
    }
}]);
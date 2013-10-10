'use strict';

songbuzzApp.controller('PeopleController', ['$scope', 'Restangular', function ($scope, Restangular) {
    $scope.peopleLimit = 10;
    $scope.peopleOffset = 0;
    $scope.people = [ ];

    $scope.fetchPeople = function () {
        Restangular.all('people')
            .getList({limit: $scope.peopleLimit, offset: $scope.peopleOffset})
            .then(function (people) {
                $scope.people = people;
                console.log(people);
            });
    };
    $scope.fetchPeople();

    $scope.addFriend = function (index) {
    }
}]);
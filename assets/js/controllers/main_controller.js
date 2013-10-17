'use strict';

songbuzzApp.controller('MainController', ['$scope', '$timeout', 'Restangular', function($scope, $timeout, Restangular) {
    $scope.loggedIn = false;
    $scope.currentUser = null;
    $scope.pullAuthenticationStatusTimer = null;

    $scope.pullAuthenticationStatus = function() {
        $scope.pullAuthenticationStatusTimer = $timeout($scope.pullAuthenticationStatus, 60000);
        Restangular.all("auth").customGET("authenticated").then(function(status) {
            $scope.loggedIn = status.authenticated;
            $scope.currentUser = status.current;
        });
    }
    $scope.pullAuthenticationStatus();


}]);
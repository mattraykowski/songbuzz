'use strict';

songbuzzApp.directive('playerView', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div id="playerContainer"><center><div id="player"></div></center></div>',
        link: function (scope, element, attrs) {
            var playerContainer = $('#playerContainer');

            scope.$on('ytPlayerLoaded', function () {
                scope.$broadcast('playerVisibilityChanged');
            });

            scope.$on('playerVisibilityChanged', function () {
                if (scope.playerVisible === true) {
                    playerContainer.show();
                } else if (scope.playerVisible === false) {
                    playerContainer.hide();
                }
            });
        }
    };
});
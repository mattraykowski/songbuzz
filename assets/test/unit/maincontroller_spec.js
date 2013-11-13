describe("MainController", function () {
    var scope;
    var rootScope;

    //var samplePeople;
    //var PeopleRestService;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$timeout_, _Restangular_, _PlayerService_) {
        rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        PlayerService = _PlayerService_;

        mainCtrl = $controller('MainController', {
            $rootScope: _$rootScope_,
            $scope: scope,
            $timeout: _$timeout_,
            Restangular: _Restangular_,
            PlayerService: _PlayerService_
        });

    }));

    describe("sendMessage", function() {
        it("should create a noty message", function() {
            spyOn(window, 'noty');

            scope.sendMessage("test");
            expect(window.noty).toHaveBeenCalled();
        });
    });

    describe("event handler ytPlayerStateChanged", function() {
        it("should call the playerStateChangeHandler function", function() {
            spyOn(scope, 'playerStateChangeHandler');//.andCallFake(function() {console.log("************************************************")});

            rootScope.$broadcast('ytPlayerStateChanged', {title: "test"}, PlayerService.PlayerState.PLAYING);
            expect(scope.playerStateChangeHandler).toHaveBeenCalled();
        });

        describe("playerStateChangeHandler", function() {
            describe("on ENDED", function() {
                it("should call sendMessage with a 'playback ended' string", function() {
                    spyOn(scope, 'sendMessage');

                    rootScope.$broadcast('ytPlayerStateChanged', {title: "test"}, PlayerService.PlayerState.ENDED);
                    expect(scope.sendMessage).toHaveBeenCalledWith("Playback Ended: <br/> test");
                });
            });
            describe("on PLAYING", function() {
                it("should call sendMessage with an 'now playing' string", function() {
                    spyOn(scope, 'sendMessage');

                    rootScope.$broadcast('ytPlayerStateChanged', {title: "test"}, PlayerService.PlayerState.PLAYING);
                    expect(scope.sendMessage).toHaveBeenCalledWith("Now Playing: test");
                });
            });
            describe("on other playback states", function() {
                it("should do nothing", function() {
                    spyOn(scope, 'sendMessage');
                    rootScope.$broadcast('ytPlayerStateChanged', {title: "test"}, PlayerService.PlayerState.CUED);

                    expect(scope.sendMessage).not.toHaveBeenCalled();
                });
            });
        });
    });

});
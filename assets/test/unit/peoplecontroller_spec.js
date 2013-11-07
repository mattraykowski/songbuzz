describe("PlayerController", function () {
    var scope;
    var samplePeople;
    var PeopleRestService;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function (_$rootScope_, _$controller_, _PeopleRestService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        PeopleRestService = _PeopleRestService_;

        peopleCtrl = $controller('PeopleController', {
            $rootScope: _$rootScope_,
            $scope: scope,
            PeopleRestService: _PeopleRestService_
        });

        samplePeople = [
            { provider: 'google',
                uid: 100000000000000000001,
                name: 'Test User 1',
                picture: 'http://test.com/1/photo.jpg',
                createdAt: "2013-08-22T19:57:38.029Z",
                updatedAt: "2013-08-22T19:57:38.029Z",
                id: '500000000000000000001' },
            { provider: 'google',
                uid: 100000000000000000002,
                name: 'Test User 2',
                picture: 'http://test.com/2/photo.jpg',
                createdAt: "2013-08-22T19:57:38.029Z",
                updatedAt: "2013-08-22T19:57:38.029Z",
                id: '500000000000000000002' }
        ];
    }));

    describe("fetchPeople", function () {
        it("should get all people and assign them to the scope", function () {
            spyOn(PeopleRestService, 'getAll').andReturn(getThenObject(samplePeople));

            scope.fetchPeople();
            expect(PeopleRestService.getAll).toHaveBeenCalled();
        })
    })

});
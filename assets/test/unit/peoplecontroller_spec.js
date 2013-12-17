describe("PeopleController", function () {
    var scope;
    var samplePeople;
    var PeopleRestService;
    var peopleCtrl;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$routeParams_, _PeopleRestService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        PeopleRestService = _PeopleRestService_;

        peopleCtrl = $controller('PeopleController', {
            $rootScope: _$rootScope_,
            $scope: scope,
            $routeParams: _$routeParams_,
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
        });
    });

    describe("when a personId is provided", function() {
        beforeEach(function() {
            scope.personId = samplePeople[0].id;
        });

        it("should get the person and assign them to the scope", function() {
            spyOn(PeopleRestService, 'get').andReturn(getThenObject(samplePeople[0]));

            scope.fetchPerson();
            expect(PeopleRestService.get).toHaveBeenCalled();
        });
    });

    describe("choosePerson", function() {
        it("should set the person ID", function() {
            scope.personId = null;

            scope.choosePerson(samplePeople[0]);

            expect(scope.personId).toBe(samplePeople[0].id);
        });

        it("should call fetchPerson", function() {
            spyOn(scope, 'fetchPerson');

            scope.choosePerson(samplePeople[0]);

            expect(scope.fetchPerson).toHaveBeenCalled();
        });
    });

    describe("searchPrevPage", function() {
        it("should adjust the offset down by 10", function() {
            spyOn(scope, 'fetchPeople');
            scope.peopleOffset = 10;

            scope.searchPrevPage();

            expect(scope.peopleOffset).toBe(0);
        });

        it("should set the offset to 0 if the value is too low", function() {
            spyOn(scope, 'fetchPeople');
            scope.peopleOffset = 5;

            scope.searchPrevPage();

            expect(scope.peopleOffset).toBe(0);
        });

        it("should call fetchPeople", function() {
            spyOn(scope, 'fetchPeople');

            scope.searchPrevPage();

            expect(scope.fetchPeople).toHaveBeenCalled();
        });
    });

    describe("searchNextPage", function() {
        it("should adjust the offset up by 10", function() {
            spyOn(scope, 'fetchPeople');
            scope.peopleTotal = 100;
            scope.peopleOffset = 10;

            scope.searchNextPage();

            expect(scope.peopleOffset).toBe(20);
        });

        it("should not change the offset if it would be larger than the count", function() {
            spyOn(scope, 'fetchPeople');
            scope.peopleOffset = 5;
            scope.peopleTotal = 10;

            scope.searchNextPage();

            expect(scope.peopleOffset).toBe(5);
        });

        it("should call fetchPeople", function() {
            spyOn(scope, 'fetchPeople');

            scope.searchNextPage();

            expect(scope.fetchPeople).toHaveBeenCalled();
        });
    });

});
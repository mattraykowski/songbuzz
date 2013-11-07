'use strict';

describe("PeopleRestService", function() {
    var rootScope;
    var PeopleRestService;
    var Restangular;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function(_$rootScope_, _PeopleRestService_, _Restangular_) {
        PeopleRestService = _PeopleRestService_;
        rootScope = _$rootScope_;
        Restangular = _Restangular_
    }));

    describe("get", function() {
        it("should request by ID", inject(function(_$httpBackend_) {
            _$httpBackend_.expectGET("/people/1234").respond(samplePlaylists[0]);
            PeopleRestService.get("1234");
            rootScope.$digest();
        }));
    });

    describe("getAll", function() {
        it("should request all playlists", inject(function(_$httpBackend_) {
            _$httpBackend_.expectGET("/people").respond(samplePlaylists);
            PeopleRestService.getAll();
            rootScope.$digest();
        }));


        it("should pass the options through to getList", function() {
            var fakeGetList = { getList: function(options) {} };
            spyOn(Restangular, 'all').andReturn(fakeGetList);
            spyOn(fakeGetList, 'getList');
            var options = { test: "option" };

            PeopleRestService.getAll(options);
            expect(fakeGetList.getList).toHaveBeenCalledWith(options);
        });
    });
});
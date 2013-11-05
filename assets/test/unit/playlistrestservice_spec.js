describe("PlaylistRestService", function() {
    var scope;
    var $controller;
    var rootScope;
    var PlaylistRestService;

    beforeEach(module('songbuzz'));
    beforeEach(inject(function(_$rootScope_, _PlaylistRestService_) {
        PlaylistRestService = _PlaylistRestService_;
        rootScope = _$rootScope_;
        //httpBackend = _$httpBackend_;
    }));

    describe("get", function() {
        it("should request by ID", inject(function(_$httpBackend_) {
            _$httpBackend_.expectGET("/playlist/1234").respond(samplePlaylists[0]);
            PlaylistRestService.get("1234");
            rootScope.$digest();
        }));
    });

    describe("getAll", function() {
        it("should request all playlists", inject(function(_$httpBackend_) {
            _$httpBackend_.expectGET("/playlist").respond(samplePlaylists);
            PlaylistRestService.getAll();
            rootScope.$digest();
        }));
    });

    describe("create", function() {
        it("should post to create a new playlist", inject(function(_$httpBackend_) {
            var testTitle = "Test 1234";
            _$httpBackend_.expectPOST("/playlist", '{"title":"' + testTitle + '"}')
                .respond(201, '');
            PlaylistRestService.create({ title: testTitle });
            rootScope.$digest();
        }));
    });
});
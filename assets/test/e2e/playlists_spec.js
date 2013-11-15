describe("songbuzz playlists", function () {
    var randomString = function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    };
    var playlistId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    describe("managing playlists", function() {
        describe("when creating playlists", function() {
            beforeEach(function() {
                browser.get("http://localhost:1337/#/playlists");
            });

            describe("when the playlist title field is invalid", function() {
                it("should disable the 'add' button when failing validation", function() {
                    var playlistInput = element(by.model("playlistTitle"));
                    var playlistAdd = element(by.className("btn-add-playlist"));

                    expect(playlistInput.getText()).toBe("");
                    expect(playlistAdd.isEnabled()).toBeFalsy();
                });
            });


            it("should create a new playlist", function() {

            })
        });

        describe("when deleting playlists", function() {

        });


    });
    describe("with no playlist id in the path", function() {
        it("should recommend choosing a playlist", function() {
            browser.get("http://localhost:1337/#/playlists");
            var noElement = element(by.className("sb-no-playlist"));
            expect(noElement.isDisplayed()).toBe(true);
        });


    });


});
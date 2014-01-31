var Sails = require('sails')
  , barrels = require('barrels');

module.exports = {
    fixtures: {},
    setup: function() {
        var self = this;
        before(function (done) {
            // Lift Sails with test database
            Sails.lift({
                log: {
                    level: 'error'
                },
                adapters: {
                    default: 'test'
                }
            }, function (err, sails) {
                if (err)
                    return done(err);
                // Load fixtures
                barrels.populate(function (err) {
                    done(err, sails);
                });
                // Save original objects in `fixtures` variable
                self.fixtures = barrels.objects;
            });
        });



        // Global after hook
        after(function (done) {
            sails.lower(done);
        });
    }
}

//
//function () {
//
//    , fixtures;
//
//// Global before hook
//
//
//};
//
////// Here goes a module test
////describe('Fruits', function() {
////  describe('#list()', function() {
////    it ('should list the sorts of apples and oranges', function() {
////      // All apples
////      Playlist.find().exec(function(err, playlists) {
////        var gotPlaylists = (fixtures['playlist'].length > 0);
////        var playlistsAreInTheDb = (playlists.length === fixtures['playlist'].length);
////        assert(gotPlaylists && playlistsAreInTheDb, 'There must be something!');
////
////        // All oranges
//////        Oranges.find(function(err, oranges) {
//////          assert.equal(apples.length, oranges.length,
//////            'The amount of varieties of apples and oranges should be equal!');
//////        });
////      });
////    });
////  });
////});

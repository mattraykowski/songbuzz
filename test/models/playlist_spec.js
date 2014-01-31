var assert = require('assert')
   ,sailsSetup = require('../support');

// Call the global sails before/after setup.
sailsSetup.setup();

// Here goes a module test
describe('Playlist', function() {
  describe('#find()', function() {
    it ('should list all of the playlists', function() {
      // All apples
      Playlist.find().exec(function(err, playlists) {
        var gotPlaylists = (sailsSetup.fixtures['playlist'].length > 0);
        var playlistsAreInTheDb = (playlists.length === sailsSetup.fixtures['playlist'].length);
        assert(gotPlaylists && playlistsAreInTheDb, 'There must be something!');
      });
    });
  });
});

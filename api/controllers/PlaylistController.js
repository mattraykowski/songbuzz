/**
 * PlaylistController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

function PlaylistController() {
  this.index = function (req, res) {
    Playlist.find()
      .where({ owner: req.user.id })
      .exec(function(err,playlists) {
        if(err) {
          console.log(err);
        } else {
          res.send(playlists);
        }
      });
  }

  this.create = function (req, res) {
    console.log("ugh. create already!!!");
    var playlist = {};
    playlist.title = req.body.title;
    playlist.owner = req.user.id;

    Playlist.create(playlist).done(function(err,playlist) {
      if(err) {
        res.send("Oops! " + err);
      } else {
        res.send(201);
      }
    });
  }
}

module.exports = new PlaylistController();

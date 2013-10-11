/**
 * PlaylistController
 *
 * @module        :: Controller
 * @description    :: Contains logic for handling requests.
 */

function PlaylistController() {
    this.index = function (req, res) {
        Playlist.find()
            .where({ owner: req.user.id })
            .exec(function (err, playlists) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(playlists);
                }
            });
    };

    this.create = function (req, res) {
        var playlist = {};
        playlist.title = req.body.title;
        playlist.owner = req.user.id;

        Playlist.create(playlist).done(function (err, playlist) {
            if (err) {
                res.send("Oops! " + err);
            } else {
                res.send(201);
            }
        });
    };

    this.destroy = function(req, res) {
        playlistId = req.param('id');

        Playlist.find()
            .where({ owner: req.user.id })
            .where({ _id: playlistId })
            .exec(function(err, playlists) {
                if(err) {
                    res.send("Oops! " + err);
                } else {
                    if(playlists.length != 1) {
                        res.send(500);
                    } else {
                        playlists[0].destroy(function(err) {
                            if(err) {
                                console.log(err);
                                res.send(500);
                            } else {
                                res.send(201);
                            }
                        });
                    }
                }
            });
    };


}

module.exports = new PlaylistController();

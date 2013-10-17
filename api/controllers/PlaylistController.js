/**
 * PlaylistController
 *
 * @module PlaylistController
 * @description    :: Contains logic for handling requests.
 */

module.exports = {
    /**
     * Playlist index action
     *
     * @param {Request} req Request object
     * @param {ServerResponse} res Response object
     *
     */
    index: function (req, res) {
        Playlist.find()
            .where({ owner: req.user.id })
            .exec(function (err, playlists) {
                if (err) {
                    console.log(err);
                } else {
                    var simplePlaylists = playlists.map(function(playlist) {
                        if(playlist.songs) {
                            delete playlist.songs;
                        }
                        return playlist;

                    });
                    res.send(simplePlaylists);
                }
            });
    },

    /**
     * Playlist create action
     *
     * @param {Request} req Request object
     * @param {ServerResponse} res Response object
     */
    create: function (req, res) {
        var playlist = {};
        playlist.title = req.body.title;
        playlist.owner = req.user.id;

        Playlist.create(playlist).done(function (err) {
            if (err) {
                res.send("Oops! " + err);
            } else {
                res.send(201);
            }
        });
    },

    /**
     * Playlist destroy action
     *
     * @param {Request} req Request object
     * @param {ServerResponse} res Response object
     */
    destroy: function (req, res) {
        var playlistId = req.param('id');

        Playlist.find()
            .where({ owner: req.user.id })
            .where({ _id: playlistId })
            .exec(function (err, playlists) {
                if (err) {
                    res.send("Oops! " + err);
                } else {
                    if (playlists.length != 1) {
                        res.send(500);
                    } else {
                        playlists[0].destroy(function (err) {
                            if (err) {
                                console.log(err);
                                res.send(500);
                            } else {
                                res.send(201);
                            }
                        });
                    }
                }
            });
    },

    update: function (req, res) {
        var playlistId = req.param('id');

        Playlist.find()
            .where({ owner: req.user.id })
            .where({ _id: playlistId })
            .exec(function (err, playlists) {
                if (err) {
                    res.send("Oops! " + err);
                } else {
                    if (playlists.length != 1) {
                        res.send(500);
                    } else {
                        var playlist = playlists[0]
                        playlist.title = req.body.title;
                        playlist.songs = req.body.songs
                        playlist.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.send(500);
                            } else {
                                res.send(201);
                            }
                        });
                    }
                }
            });
    }
};

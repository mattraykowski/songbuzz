/**
 * PeopleController
 *
 * @module        :: Controller
 * @description    :: Contains logic for handling requests.
 */

function PeopleController() {
    this.index = function (req, res) {
        var limit = (req.body.limit == undefined ? 10 : req.body.limit);
        var offset = (req.body.offset == undefined ? 0 : req.body.offset);
        User.find({limit: limit, offset: offset})
            .exec(function (err, people) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(people);
                }
            });
    };

    this.find = function (req, res) {
        var personId = req.param('id');
        User.find({id: personId}).exec(function(err, person) {
            if(err) {
                console.log(err);
            } else {
                res.send(person[0]);
            }
        });
    };

    this.playlists = function(req, res) {
        var personId = req.param('id');

        Playlist.find()
            .where({ owner: personId })
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
    }
};

module.exports = new PeopleController();

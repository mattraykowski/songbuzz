/**
 * PeopleController
 *
 * @module        :: Controller
 * @description    :: Contains logic for handling requests.
 */

function PeopleController() {
    this.index = function (req, res) {
        var peopleResults = {
            count: 0,
            limit: (req.query.limit == undefined ? 10 : req.query.limit),
            offset: (req.query.offset == undefined ? 0 : req.query.offset),
            people: []
        };

        User.count().exec(function(err, count) {
            peopleResults.count = count;
        });

        // Grab the entries requested.
        User.find({limit: peopleResults.limit, skip: peopleResults.offset})
            .exec(function (err, people) {
                if (err) {
                    console.log(err);
                } else {
                    peopleResults.people = people;
                    res.send(peopleResults);
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

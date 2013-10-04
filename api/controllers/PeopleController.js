/**
 * PeopleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

function PeopleController() {
  this.index = function(req, res) {
    var limit = (req.body.limit==undefined?10:req.body.limit);
    var offset = (req.body.offset==undefined?0:req.body.offset);
    User.find({limit: limit, offset: offset})
      .exec(function(err,people) {
        if(err) {
          console.log(err);
        } else {
          res.send(people);
        }
      });
  }  
};

module.exports = new PeopleController();

// This is helpful for promises.
var getThenObject = function(response) {
    return { then: function(cb) { cb(response) } };
}
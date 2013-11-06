'use strict';

songbuzzApp.factory('PlaylistRestService', function (Restangular) {
    var playlistRestService = {

        /** the base route for playlists */
        basePath: "playlist",

        /**
         * Retrieve a single specific playlist
         * @param id {string} the unique ID for a playlist
         * @return {Object} Restangular object
         */
        get: function(id) {
            return Restangular.one(this.basePath, id).get();
        },

        getAll: function() {
            return Restangular.all(this.basePath).getList();
        },

        getByUser: function() {
            return Restangular.all(this.basePath);
        },

        create: function(options) {
            return Restangular.all(this.basePath).post(options);
        }

    };

    return playlistRestService;
});
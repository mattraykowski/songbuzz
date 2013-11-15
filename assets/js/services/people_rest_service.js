'use strict';

songbuzzApp.factory('PeopleRestService', function (Restangular) {
    var peopleRestService = {

        /** the base route for people */
        basePath: "people",

        /**
         * Retrieve a single specific person
         * @param id {string} the unique ID for a person
         * @return {Object} Restangular object
         */
        get: function(id) {
            return Restangular.one(this.basePath, id).get();
        },

        getAll: function(options) {
            return Restangular.all(this.basePath).getList(options);
        },

        getPlaylistsByUser: function(id) {
            return Restangular.all(this.basePath + "/" + id + "/playlists").getList();
        }

    };

    return peopleRestService;
});
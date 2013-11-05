var rest = require("request");
var querystring = require("querystring");

/**
 * SongsearchController
 *
 * @module        :: Controller
 * @description    :: Contains logic for handling requests.
 */
module.exports = {

    /**
     * Wraps the YouTube API and sanitizes output to a format used by the frontend.
     *
     * Takes query parameter q and, optionally, pageToken and requests video search from the
     * YouTube API using these parameters and hard-coded defaults. Relies on the environment
     * varaible SB_YT_API_KEY to exist.
     *
     * @param {Request} req Request object
     * @param {ServerResponse} res Response object
     */
    index: function (req, res) {
        // YouTube API Base URL
        var url = "https://www.googleapis.com/youtube/v3/search";

        // Build the basic request parameters.
        var requestParams = {
            q: req.query.q,
            maxResults: 10,
            part: 'snippet',
            type: 'video',
            key: process.env.SB_YT_API_KEY
        }

        // If we were provided a page token, include it in the request parameters.
        if (req.query.pageToken != undefined) {
            requestParams.pageToken = req.query.pageToken;
        }

        // Use 'request' to get the raw data from the YT API.
        rest.get(url, { qs: requestParams }, function (error, response, data) {
            var searchResults = JSON.parse(data);

            if (error || searchResults == undefined || searchResults.pageInfo == undefined) {
                console.log("ERROR: Data returned from YouTube invalid: ");
                res.send(500);
            }

            // Basic SongBuzz Results object.
            var results = {
                nextPageToken: searchResults.nextPageToken,
                totalResults: searchResults.pageInfo.totalResults,
                resultsPerPage: searchResults.pageInfo.resultsPerPage,
                songs: []
            };

            // Helper method for converting YT video results into SongBuzz song entries.
            var formatYtSong = function (vid) {
                var title = vid.snippet.title;
                var viewCount = 0;
                var videoId = vid.id.videoId;
                var thumbUrl = vid.snippet.thumbnails.default.url;

                var entry = {
                    title: title,
                    viewCount: viewCount,
                    videoId: videoId,
                    thumbUrl: thumbUrl
                };

                return entry;
            };

            // Go through each video item, sanitize it to our format and populate the array.
            searchResults.items.forEach(function (value, index) {
                results.songs.push(formatYtSong(value));
            });

            res.send(results);
        });

    }
};

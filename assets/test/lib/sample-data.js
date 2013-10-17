//var samplePlaylist1 = {
//  __v: 5,
//  _id: "509ad256be436abe20000002",
//  owner: "50a3d21fbf625a2560000002",
//  selected: false,
//  songs: [
//    {
//      title: "Hanson - This Time Around",
//      videoId: "hT_dJhtspu4",
//      url: "https://www.youtube.com/watch?v=hT_dJhtspu4&feature=youtube_gdata",
//      thumbUrl: "http://i.ytimg.com/vi/hT_dJhtspu4/3.jpg",
//      duration: 256,
//      _id: "50a280c26e32619d70000006"
//    }
//  ],
//  title: "Hansen"
//};
//
//var samplePlaylist2 = {
//  __v: 3,
//  _id: "509a9b11966a398a4a000002",
//  owner: "50a3d21fbf625a2560000002",
//  selected: false,
//  songs: [
//    {
//      title: "Deadmaus-- Alone With You 1/19",
//      videoId: "gP_L9GLMo9Q",
//      url: "https://www.youtube.com/watch?v=gP_L9GLMo9Q&feature=youtube_gdata",
//      thumbUrl: "http://i.ytimg.com/vi/gP_L9GLMo9Q/3.jpg",
//      duration: 494,
//      _id: "50a2803d6e32619d70000005"
//    },
//    {
//      title: "Deadmau5 - 4x4=12 (Continuous Mix) (FULL 1 Hour 9 Mins)",
//      videoId: "_9IBbMW2o_o",
//      url: "https://www.youtube.com/watch?v=_9IBbMW2o_o&feature=youtube_gdata",
//      thumbUrl: "http://i.ytimg.com/vi/_9IBbMW2o_o/3.jpg",
//      duration: 4195,
//      _id: "50a284476e32619d70000007"
//    },
//    {
//      title: "Deadmau 5 - Ghosts N Stuff",
//      videoId: "9STmQReKXtU",
//      url: "https://www.youtube.com/watch?v=9STmQReKXtU&feature=youtube_gdata",
//      thumbUrl: "http://i.ytimg.com/vi/9STmQReKXtU/3.jpg",
//      duration: 371,
//      _id: "50a47e5e6fe818ac09000002"
//    }
//  ],
//  title: "Test Playlist"
//};


var samplePlaylists = [
    // Has only one song.
    {
        remove: function() {},
        "__v":5,
        "id":"509ad256be436abe20000002",
        "owner":"50a3d21fbf625a2560000002",
        "title":"Hansen",
        "songs": [
            {   "title":"Hanson - This Time Around",
                "videoId":"hT_dJhtspu4",
                "url":"https://www.youtube.com/watch?v=hT_dJhtspu4&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/hT_dJhtspu4/3.jpg",
                "duration":256,
                "_id":"50a280c26e32619d70000006"
            }
        ],
        "selected":false,
        "$$hashKey":"008"
    },
    
    {
        remove: function() {},
        "title":"Techno",
        "id":"50a29a963eb878714d000005",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "selected":false,
        "$$hashKey":"00A"
    },
    
    {
        remove: function() {},
        "title":"Country",
        "id":"50a29a8e3eb878714d000004",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00C"
    },
    
    {
        remove: function() {},
        "title":"Rock N Roll",
        "id":"50a299213eb878714d000002",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00E"
    },
    
    {
        remove: function() {},
        "title":"Dubstep",
        "id":"50a2882e6e32619d70000008",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00G"
    },
    
    {
        remove: function() {},
        "title":"Rap",
        "id":"50a29a7a3eb878714d000003",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00I"
    },
    
    {
        remove: function() {},
        "title":"F",
        "owner":"50a3d21fbf625a2560000002",
        "id":"50a3ecff9274e7b52f000002",
        "__v":0,
        "songs":[],
        "selected":false,
        "$$hashKey":"00K"
    },
    
    {
        remove: function() {},
        "__v":3,
        "id":"509a9b11966a398a4a000002",
        "owner":"50a3d21fbf625a2560000002",
        "title":"Test Playlist",
        "songs": [
            {
                "title":"Deadmaus-- Alone With You 1/19",
                "videoId":"gP_L9GLMo9Q",
                "url":"https://www.youtube.com/watch?v=gP_L9GLMo9Q&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/gP_L9GLMo9Q/3.jpg",
                "duration":494,
                "_id":"50a2803d6e32619d70000005"
            },
            
            {
                "title":"Deadmau5 - 4x4=12 (Continuous Mix) (FULL 1 Hour 9 Mins)",
                "videoId":"_9IBbMW2o_o",
                "url":"https://www.youtube.com/watch?v=_9IBbMW2o_o&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/_9IBbMW2o_o/3.jpg",
                "duration":4195,
                "_id":"50a284476e32619d70000007"
            },
            
            {
                "title":"Deadmau 5 - Ghosts N Stuff",
                "videoId":"9STmQReKXtU",
                "url":"https://www.youtube.com/watch?v=9STmQReKXtU&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/9STmQReKXtU/3.jpg",
                "duration":371,
                "_id":"50a47e5e6fe818ac09000002"
            }
        ],
        "selected":false,
        "$$hashKey":"00M"
    },
    
    {
        remove: function() {},
        "__v":4,
        "_id":"50a5b70fe995d6860a000006",
        "owner":"50a3d21fbf625a2560000002",
        "title":"Knife Party",
        "songs": [
            {
                "title":"Knife Party - Centipede (Official Video)",
                "videoId":"CSemARaqGqE",
                "url":"https://www.youtube.com/watch?v=CSemARaqGqE&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/CSemARaqGqE/3.jpg",
                "duration":245,
                "_id":"50a5b71be995d6860a000007"
            },
            
            {
                "title":"Knife Party - Internet Friends",
                "videoId":"gcejLp72iCE",
                "url":"https://www.youtube.com/watch?v=gcejLp72iCE&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/gcejLp72iCE/3.jpg",
                "duration":186,
                "_id":"50a5b726e995d6860a000008"
            },
            
            {
                "title":"Knife Party - 'Bonfire'",
                "videoId":"e-IWRmpefzE",
                "url":"https://www.youtube.com/watch?v=e-IWRmpefzE&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/e-IWRmpefzE/3.jpg",
                "duration":273,
                "_id":"50a5b72de995d6860a000009"
                },
                
            {
                "title":"Knife Party vs Skrillex Mix",
                "videoId":"3sjN1jPenic",
                "url":"https://www.youtube.com/watch?v=3sjN1jPenic&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/3sjN1jPenic/3.jpg",
                "duration":898,
                "_id":"50a5b73ce995d6860a00000a"
            }
        ],
        "selected":false,
        "$$hashKey":"00O"
    },
        
    {
        remove: function() {},
        "__v":5,
        "_id":"50a53afd4705dd657a000002",
        "owner":"50a3d21fbf625a2560000002",
        "title":"Skrillex",
        "songs": [
            {
                "title":"SKRILLEX - KYOTO (FT. SIRAH)",
                "videoId":"86khmc6y1yE",
                "url":"https://www.youtube.com/watch?v=86khmc6y1yE&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/86khmc6y1yE/3.jpg",
                "duration":201,
                "_id":"50a53b0b4705dd657a000003"
            },
            
            {
                "title":"SKRILLEX - Bangarang feat. Sirah [Official Music Video]",
                "videoId":"YJVmu6yttiw",
                "url":"https://www.youtube.com/watch?v=YJVmu6yttiw&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/YJVmu6yttiw/3.jpg",
                "duration":222,
                "_id":"50a5b4c8e995d6860a000002"
            },
            
            {
                "title":"NERO 'PROMISES' (SKRILLEX AND NERO REMIX)",
                "videoId":"VZMfhtKa-wo",
                "url":"https://www.youtube.com/watch?v=VZMfhtKa-wo&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/VZMfhtKa-wo/3.jpg",
                "duration":269,
                "_id":"50a5b512e995d6860a000003"
            },
            
            {
                "title":"First Of The Year (Equinox) - Skrillex [OFFICIAL]",
                "videoId":"2cXDgFwE13g",
                "url":"https://www.youtube.com/watch?v=2cXDgFwE13g&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/2cXDgFwE13g/3.jpg",
                "duration":195,
                "_id":"50a5b6f0e995d6860a000004"
            },
            
            {
                "title":"Skrillex - Cinema (Official)",
                "videoId":"k6lVhGeyXuw",
                "url":"https://www.youtube.com/watch?v=k6lVhGeyXuw&feature=youtube_gdata",
                "thumbUrl":"http://i.ytimg.com/vi/k6lVhGeyXuw/3.jpg",
                "duration":308,
                "_id":"50a5b706e995d6860a000005"
            }
        ],
        "selected":false,
        "$$hashKey":"00Q"
    }
];

var sampleYouTubeAPISongEntryOLD = {
    "title":"[Mic Test] Aa-apples...",
    "viewCount":"27",
    "videoId":"GSQUA9HPtrw",
    "url":"https://www.youtube.com/watch?v=GSQUA9HPtrw&feature=youtube_gdata",
    "thumbUrl":"http://i.ytimg.com/vi/GSQUA9HPtrw/3.jpg",
    "duration":"91"
};

var sampleYouTubeAPISongEntry = {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/VHDMhgmMSb3zPFE-fOTxK9bij0s\"", "id": {"kind": "youtube#video", "videoId": "4vTyEy7Dn70"}, "snippet": {"publishedAt": "2013-07-22T23:14:58.000Z", "channelId": "UCpko_-a4wgz2u_DgDgd9fqA", "title": "Optical Illusion Test: Are You Easily Fooled?", "description": "Share on Facebook: http://on.fb.me/160rMQ5 Share on Twitter: http://bit.ly/160rSaB Mond-vergleich/wikimedia commons http://en.wikipedia.org/wiki/File:Mond-ve ...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/4vTyEy7Dn70/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/4vTyEy7Dn70/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/4vTyEy7Dn70/hqdefault.jpg"}}, "channelTitle": "BuzzFeedVideo", "liveBroadcastContent": "none"}}


var test = {"kind": "youtube#searchListResponse", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/qGJoGHYtspeC91z33HUzmJapFoQ\"", "nextPageToken": "CAoQAA", "pageInfo": {"totalResults": 1000000, "resultsPerPage": 10}, "items": [
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/VHDMhgmMSb3zPFE-fOTxK9bij0s\"", "id": {"kind": "youtube#video", "videoId": "4vTyEy7Dn70"}, "snippet": {"publishedAt": "2013-07-22T23:14:58.000Z", "channelId": "UCpko_-a4wgz2u_DgDgd9fqA", "title": "Optical Illusion Test: Are You Easily Fooled?", "description": "Share on Facebook: http://on.fb.me/160rMQ5 Share on Twitter: http://bit.ly/160rSaB Mond-vergleich/wikimedia commons http://en.wikipedia.org/wiki/File:Mond-ve ...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/4vTyEy7Dn70/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/4vTyEy7Dn70/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/4vTyEy7Dn70/hqdefault.jpg"}}, "channelTitle": "BuzzFeedVideo", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/JT9dGqm0ppZa7f6isfbP1VcjlKw\"", "id": {"kind": "youtube#video", "videoId": "ikbEBp5BeCM"}, "snippet": {"publishedAt": "2012-06-24T10:35:24.000Z", "channelId": "UCvGMGQC8gNkd4gwxSbABIlw", "title": "THE TEST", "description": "https://twitter.com/#!/RichardWiseman.", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/ikbEBp5BeCM/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/ikbEBp5BeCM/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/ikbEBp5BeCM/hqdefault.jpg"}}, "channelTitle": "Quirkology", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/7oxxozG_5un4dioAm7ti1MbKx5Y\"", "id": {"kind": "youtube#video", "videoId": "gSdQyVNUvTc"}, "snippet": {"publishedAt": "2013-03-05T11:31:11.000Z", "channelId": "UCsAegdhiYLEoaFGuJFVrqFQ", "title": "Crash Testing the 2013 Volvo XC60! - The Downshift Episode 51", "description": "We visit Ruckersville, VA and the Insurance Institute for Highway Safety's Vehicle Research Center. IIHS is crash testing the 2013 Volvo XC60 in one of their...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/gSdQyVNUvTc/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/gSdQyVNUvTc/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/gSdQyVNUvTc/hqdefault.jpg"}}, "channelTitle": "MotorTrend", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/a_FyKfDFwpmAERwVAMRHH2Cr-2I\"", "id": {"kind": "youtube#video", "videoId": "e0TuG9bMEeY"}, "snippet": {"publishedAt": "2013-03-06T20:23:32.000Z", "channelId": "UCG7FhiCr5N0Srzlnn3lJubg", "title": "Test de inteligencia en tres preguntas", "description": "Mida su coeficiente intelectual, que tal inteligente se considera descubralo por medio de este sencillo test. Si quieren saber mas sobre el coeficiente intel...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/e0TuG9bMEeY/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/e0TuG9bMEeY/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/e0TuG9bMEeY/hqdefault.jpg"}}, "channelTitle": "spicus99", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/7DzMC4MKRhzEuelBcmWGGiwL6h4\"", "id": {"kind": "youtube#video", "videoId": "ym_c0gVMMHc"}, "snippet": {"publishedAt": "2013-05-25T02:01:34.000Z", "channelId": "UCVpankR4HtoAVtYnFDUieYA", "title": "Human Test Volume 3 :: Love & Loss", "description": "If you answer yes to 10 or more of these you are a human. if not more tests are needed. music: http://soundcloud.com/brenticus Film Footage courtesy of Shutt...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/ym_c0gVMMHc/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/ym_c0gVMMHc/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/ym_c0gVMMHc/hqdefault.jpg"}}, "channelTitle": "zefrank1", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/F72CtUDBFNQnDG6sDFDPmAA13Z8\"", "id": {"kind": "youtube#video", "videoId": "QX_oy9614HQ"}, "snippet": {"publishedAt": "2009-09-24T21:12:19.000Z", "channelId": "UCsHof0eB6MLRm0tHmpW7ILg", "title": "The Marshmallow Test", "description": "Downloads and DVDs are available at http://www.ignitermedia.com. In this popular test, several kids wrestle with waiting to eat a marshmallow in hopes of a b...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/QX_oy9614HQ/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/QX_oy9614HQ/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/QX_oy9614HQ/hqdefault.jpg"}}, "channelTitle": "IgniterMedia", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/ys1YYd4rahNz6zR9inaV1JimuRk\"", "id": {"kind": "youtube#video", "videoId": "yc86ZXFsriM"}, "snippet": {"publishedAt": "2009-10-13T15:54:46.000Z", "channelId": "UCPDXXXJj9nax0fr0Wfc048g", "title": "Retarded Tests", "description": "If you don't watch this video, you're retarded. See our videos a month earlier at http://www.collegehumor.com and follow us on http://www.twitter.com/college...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/yc86ZXFsriM/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/yc86ZXFsriM/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/yc86ZXFsriM/hqdefault.jpg"}}, "channelTitle": "collegehumor", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/MdsPO9G7m0mimvwdY5A5djbmAns\"", "id": {"kind": "youtube#video", "videoId": "BLZAlp0if3M"}, "snippet": {"publishedAt": "2010-06-05T14:46:40.000Z", "channelId": "UCkDFyzIoAKSg3MBVKwqnPHA", "title": "Personality Test!", "description": "Music 'Chee Zee Beach' Kevin MacLeod (www.incompetech.com) Licensed under Creative Commons \"Attribution 3.0\" ...", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/BLZAlp0if3M/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/BLZAlp0if3M/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/BLZAlp0if3M/hqdefault.jpg"}}, "channelTitle": "twish1999", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/k_ci8YhtpMV1zFbyrhjjPFYK7aA\"", "id": {"kind": "youtube#video", "videoId": "yrAhGfrxaUo"}, "snippet": {"publishedAt": "2013-05-20T19:13:45.000Z", "channelId": "UCay_OLhWtf9iklq8zg_or0g", "title": "The Body-Brain Test", "description": "Know more about your body in less than 2 minutes Music - Do Your Sound by Db http://soundcloud.com/dbspot/do-your-sound.", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/yrAhGfrxaUo/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/yrAhGfrxaUo/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/yrAhGfrxaUo/hqdefault.jpg"}}, "channelTitle": "BuzzFeedYellow", "liveBroadcastContent": "none"}},
    {"kind": "youtube#searchResult", "etag": "\"o_JQzz84t1xSQq_sjCJ9nGgwL_w/sRQz7dGzRGTEO3ZfBHTM-67Jcp4\"", "id": {"kind": "youtube#video", "videoId": "VxcbppCX6Rk"}, "snippet": {"publishedAt": "2013-08-13T14:00:19.000Z", "channelId": "UCC552Sd-3nyi_tk2BudLUzA", "title": "How Old Are Your Ears? (Hearing Test)", "description": "MUST WATCH IN 1080p AND USE HEADPHONES* How high can you hear? Take this 'test' to see how old your ears are! SUBSCRIBE (it's free!)", "thumbnails": {"default": {"url": "https://i.ytimg.com/vi/VxcbppCX6Rk/default.jpg"}, "medium": {"url": "https://i.ytimg.com/vi/VxcbppCX6Rk/mqdefault.jpg"}, "high": {"url": "https://i.ytimg.com/vi/VxcbppCX6Rk/hqdefault.jpg"}}, "channelTitle": "AsapSCIENCE", "liveBroadcastContent": "none"}}
]}
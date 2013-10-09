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
    {   
        "__v":5,
        "_id":"509ad256be436abe20000002",
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
        "title":"Techno",
        "_id":"50a29a963eb878714d000005",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00A"
    },
    
    {   
        "title":"Country",
        "_id":"50a29a8e3eb878714d000004",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00C"
    },
    
    {
        "title":"Rock N Roll",
        "_id":"50a299213eb878714d000002",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00E"
    },
    
    {
        "title":"Dubstep",
        "_id":"50a2882e6e32619d70000008",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00G"
    },
    
    {
        "title":"Rap",
        "_id":"50a29a7a3eb878714d000003",
        "__v":0,
        "owner":"50a3d21fbf625a2560000002",
        "songs":[],
        "selected":false,
        "$$hashKey":"00I"
    },
    
    {
        "title":"F",
        "owner":"50a3d21fbf625a2560000002",
        "_id":"50a3ecff9274e7b52f000002",
        "__v":0,
        "songs":[],
        "selected":false,
        "$$hashKey":"00K"
    },
    
    {
        "__v":3,
        "_id":"509a9b11966a398a4a000002",
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

var sampleYouTubeAPISongEntry = {
    "title":"[Mic Test] Aa-apples...",
    "viewCount":"27",
    "videoId":"GSQUA9HPtrw",
    "url":"https://www.youtube.com/watch?v=GSQUA9HPtrw&feature=youtube_gdata",
    "thumbUrl":"http://i.ytimg.com/vi/GSQUA9HPtrw/3.jpg",
    "duration":"91"
};
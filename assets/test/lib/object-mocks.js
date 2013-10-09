var PlayerServiceMock = {

    // Should represent the currently selected playlist.
    currentPlaylist: {},

    // Should represent the playlist that is currently playing (regardless of selected playlist).
    playingPlaylist: {},
    currentSongIndex: 0,
    currentSong: {},
    
    ytPlayer: {
        // Return 400 seconds.
        getDuration: function() {
            return 400;
        },
        
        cueVideoById: function(videoId) { },
        
        playVideo: function() { }
    },
    
    PlayerState: {
        UNSTARTED: -1,
        ENDED: 0,
        PLAYING: 1,
        PAUSED: 2,
        BUFFERING: 3,
        CUED: 5,
            
        stateToString: function(state) { return ''; }
    },
    
    init: function() {},
    
    playNext: function() {},

    changePlaylist: function(playlist) {
        this.currentPlaylist = playlist;
        //$rootScope.$broadcast('changePlaylist');
    },

    requestSongChange: function(songIndex) {
        this.currentSongIndex = songIndex;
        this.playingPlaylist = this.currentPlaylist;
        //$rootScope.$broadcast('requestSongChange');
    },

};

var PlaylistServiceMock = {
    query: function() { return samplePlaylists; },
    $save: function() { }
};

var YouTubeAPIMock = {
    
};

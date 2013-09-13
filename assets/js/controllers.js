'use strict';

songbuzzApp.controller('MainController', ['$scope', '$timeout', 'Restangular', function($scope, $timeout, Restangular) {
  $scope.loggedIn = false;
  $scope.currentUser = null;
  $scope.pullAuthenticationStatusTimer = null;

  $scope.pullAuthenticationStatus = function() {
    $scope.pullAuthenticationStatusTimer = $timeout($scope.pullAuthenticationStatus, 60000);
    Restangular.all("auth").customGET("authenticated").then(function(status) {
      $scope.loggedIn = status.authenticated;
      $scope.currentUser = status.current;
      console.log(status);
    });
  }
  $scope.pullAuthenticationStatus();


}]);

songbuzzApp.controller('PlayerCtrl', ['$scope', '$timeout', 'PlayerService',

function($scope, $timeout, PlayerService) {
    $scope.playerService = PlayerService; // save a reference for expressions and children
    $scope.playerVisible = false;
    $scope.playerStateMsg = PlayerService.PlayerState.stateToString(PlayerService.currentPlayerState);
    
    // Button states.
    $scope.playState = false;
    $scope.pauseState = false;
    
    // Update the player data.
    $scope.songProgressTimer = {};
    $scope.progress = 0;
    
    // Safely apply changes in the scope.
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        }
        else {
            this.$apply(fn);
        }
    };

    $scope.playButton = function() {
        if(PlayerService.currentPlayerState == PlayerService.PlayerState.PAUSED) {
            // Unpause the song if one is already playing but paused.
            PlayerService.unpause();
        } else {
            PlayerService.play();
        }
    };
    
    $scope.playPreviousButton = function() {
        
    }
    
    $scope.playNextButton = function() {
        PlayerService.playNext();
    }
    
    $scope.stopButton = function() {
        PlayerService.stop();
    };
    
    $scope.pauseButton = function() {
        if(PlayerService.currentPlayerState == PlayerService.PlayerState.PAUSED) {
            // Unpause the song.
            PlayerService.unpause();
        } else {
            PlayerService.pause();
        }
    }
    
    $scope.toggleVisible = function() {
        if ($scope.playerVisible === true) {
            $scope.playerVisible = false;
        }
        else if ($scope.playerVisible === false) {
            $scope.playerVisible = true;
        }

        $scope.$broadcast('playerVisibilityChanged');
    };
    
    $scope.getSongTitle = function() {
        var songTitle = PlayerService.currentSong.title;
        if(songTitle === undefined) {
            songTitle = "none";
        }
        return songTitle;
    }
    
    $scope.getTotalDuration = function() {
        return PlayerService.getPlayerDuration();
    }
    
    $scope.getCurrentDuration = function() {
        return PlayerService.getPlayerCurrentTime();
    }
    
    $scope.updateSongProgress = function() {
        $scope.songProgressTimer = $timeout($scope.updateSongProgress, 250);
        $scope.progress = ($scope.getCurrentDuration()/$scope.getTotalDuration())*100;
    }
    
    /*********************************
     *   Event broadcast handlers.   *
     *********************************/
    $scope.$on('ytPlayerAPIReady', function() {
        PlayerService.init();
    });
    
    $scope.$on('ytPlayerStateChanged', function() {
        $scope.playerStateMsg = PlayerService.PlayerState.stateToString(PlayerService.currentPlayerState);        
        
        switch(PlayerService.currentPlayerState) {
            case PlayerService.PlayerState.PLAYING:
                $scope.playState = true;
                $scope.pauseState = false;
                $scope.updateSongProgress();
                break;
            case PlayerService.PlayerState.PAUSED:
                $scope.playState = false;
                $scope.pauseState = true;
                $timeout.cancel($scope.songProgressTimer);
                break;
            case PlayerService.PlayerState.ENDED:
                $timeout.cancel($scope.songProgressTimer);
                $scope.progress = 0;
                PlayerService.playNext();
            default:
                $scope.playState = false;
                $scope.pauseState = false;
                break;
        }
        
        // Apply the state and message changes.
        $scope.safeApply();
    });
    
    
    $scope.friendlyDuration = function(songDuration) {
        var minutes = Math.floor(songDuration / 60);
        var seconds = Math.floor(songDuration - minutes * 60);
        var duration = '';
                    
        if(minutes > 0) {
            duration = duration + minutes +'m';
        }
                    
        duration = duration + ' ' + seconds + 's';
        
        return duration;
    };
}]);

songbuzzApp.controller('HomeCtrl', ['$route', function($route) {
    // Nothing in this controller. Not sure if I want it anymore since I moved the routes to the config.
}]);

songbuzzApp.controller('PlaylistListCtrl', ['$scope', '$timeout', 'PlayerService', 'Restangular', 
function($scope, $timeout, PlayerService, Restangular) {
    $scope.playlists = [];
    
    $scope.updatePlaylists = function() {
        //$scope.playlists = PlaylistService.query();
        Restangular.all('playlist').getList().then(
          function(playlists) {
            $scope.playlists = playlists; 
            console.log($scope.playlists);
          });
    };
    
    $scope.addNewPlaylist = function() {
        Restangular.all('playlist').post({ title: $scope.playlistTitle});
        $timeout($scope.updatePlaylists, 250);
    };
    
    $scope.changePlaylist = function(idx) {
        PlayerService.changePlaylist($scope.playlists[idx]);
    };
    
    $scope.updatePlaylists();
}]);

songbuzzApp.controller('PlaylistDetailCtrl', ['$rootScope', 
                                               '$scope', 
                                               '$timeout', 
                                               '$routeParams', 
                                               'PlayerService', 
                                               'Restangular', 
                                               'YouTubeAPI',
function($rootScope, $scope, $timeout, $routeParams, PlayerService, Restangular, YouTubeAPI) {
    $scope.playlistId = $routeParams.playlistId;
    $scope.searchResults = '';
    $scope.playingSong = {};
    $scope.player = {};
    $scope.songDone = true;
    $scope.progress = 0;

    $scope.playlist = PlayerService.currentPlaylist;
    
    //@tested
    $scope.$on('changePlaylist', function() {
        $scope.playlist = PlayerService.currentPlaylist;
    });

    $scope.updateSearchResults = function() {
        if ($scope.searhTerms.length == 0) {
            $scope.searchResults = '';
        }
        else {
            YouTubeAPI.execQuery($scope.searhTerms, function(videos) {
                $scope.searchResults = videos;
            });
        }
    };

    $scope.doGetAutocomplete = function(request, response) {
        YouTubeAPI.execQuery($scope.ytSearchParameter, response);
    };

    $scope.doneAutocomplete = function(response) {
        response($scope.autocompleteResult.Suggestions);
        $scope.$apply();
    };
    
    $scope.doAddSelectedSong = function() {
        // Set the song settings
        var song = {
            title: $scope.selectedSong.title,
            videoId: $scope.selectedSong.videoId,
            url: $scope.selectedSong.url,
            thumbUrl: $scope.selectedSong.thumbUrl,
            duration: $scope.selectedSong.duration
        };
        $scope.playlist.songs.push(song);
        
        // Save the playlist.
        $scope.playlist.put();
    };
    
    $scope.removeSong = function(idx) {
        $scope.playlist.songs.splice(idx,1);
        $scope.playlist.put();
    };
    
    $scope.friendlyDuration = function(songDuration) {
        var minutes = Math.floor(songDuration / 60);
        var seconds = Math.floor(songDuration - minutes * 60);
        var duration = '';
                    
        if(minutes > 0) {
            duration = duration + minutes +'m';
        }
                    
        duration = duration + ' ' + seconds + 's';
        
        return duration;
    };
    
    $scope.playSong = function(songIndex) {
        PlayerService.playIndex(songIndex);
    };
    
    $scope.onPlaylistSorted = function() {
        $scope.playlist.put();
    }
}]);

'use strict';

const ApiServices = require('../services/apiServices');
const PlayMedia = require('../classes/PlayMedia');

module.exports = {

    'AUDIOPLAYER': {
        'AudioPlayer.PlaybackStarted': function () {
            console.log('AudioPlayer.PlaybackStarted');
        },

        'AudioPlayer.PlaybackNearlyFinished': function () {
            console.log('AudioPlayer.PlaybackNearlyFinished');
        },

        'AudioPlayer.PlaybackFinished': function () {
            console.log('AudioPlayer.PlaybackFinished');
            
            this.toIntent('AudioFinished');
        },

        'AudioPlayer.PlaybackStopped': function () {
            console.log('AudioPlayer.PlaybackStopped');
        },

        'GoogleAction.Finished': function () {
            console.log('GoogleAction.Finished');

            this.toIntent('AudioFinished');
        },
    },

    'AudioFinished': function() {
        console.log('AudioFinished');
        
        // Add functionality here, for example get next song
        
    },

};

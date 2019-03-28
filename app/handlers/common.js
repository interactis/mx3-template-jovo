'use strict';

const Config = require('../config');
const ApiServices = require('../services/apiServices');
const PlayMedia = require('../classes/PlayMedia');

module.exports = {

    'LAUNCH': function () {
        console.log("LAUNCH INTENT");
        
        // Set the test user, since there is no multi-user in the prototyp, yet.
        this.user().data.id = Config.TEST_USER_ID;
        
        // Hold new launch
        this.user().data.lastLaunchDate = new Date();
		
		// Pass the id of the single:
		ApiServices.getSingle(335152).then((stream) => {
			
			if (stream) {
				PlayMedia.play(stream, 'Test', this);
			}
			else {
				// Error, no stream
			}
			
			
			
			/*
			if (audioData) {
			
				// Set welcome speech
				let sessionsCount = this.user().metaData.sessionsCount;
			
				if (sessionsCount > 0 && !audioData.play_welcome_message) {
					speech = speech.addT("i18n_launch_welcome_message_speech");
				}
				else {
					speech = speech.addT("i18n_launch_first_welcome_message_speech");
				}
			
				PlayMedia.play(this.user(), audioData, speech +" "+ audioData.title, this, ["Weiter", "Mehr zum Thema", "Diesem Thema folgen"]);
			}
			else {
				// required in prototype, remove as soon as stream is endless.
        		speech = speech.addT("i18n_end_of_stream_speech");
        		this.tell(speech);
        	}
        	*/
		});
    },
    
    'HelpIntent': function () {
        console.log("HelpIntent");
		
		let speech = this.speechBuilder().addT("i18n_help_speech");
		this.ask(speech);
		
    },

    'Unhandled': function () {
        // Default response
        console.log("UNHANDLED INTENT");
        
        let speech = this.speechBuilder().addT("i18n_unhandled_speech");
        this.ask(speech);
    }

};

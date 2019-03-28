'use strict';

const Config = require('../config');
const ApiServices = require('../services/apiServices');
const PlayMedia = require('../classes/PlayMedia');

module.exports = {

    'LAUNCH': function () {
        console.log("LAUNCH INTENT");
		
		// Pass the id of a single:
		ApiServices.getSingleToken(335152).then((data) => {
			
			let speech = this.speechBuilder();
			
			if (data) {
				let token = data.response.token.value;
				let streamUrl = Config.API_BASE_URL +'streams/'+ token;
				console.log(" >>> Stream URL = " + streamUrl);
				
				speech = speech.addT("i18n_launch_welcome_message_speech");
				
				/*
				Playback is currently not working.
				The problem is that the streamUrl above requires Basic Authorization.
				But the player cannot handle Basic Authorization.
				The SRG SSR API must be adjusted in order to make the playback work.
				*/	
				
				PlayMedia.play(streamUrl, speech, this);
			}
			else {
				speech = speech.addT("i18n_unhandled_speech");
				this.tell(speech);
			}
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

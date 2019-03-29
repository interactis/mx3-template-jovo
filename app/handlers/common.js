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
				let streamUrl = Config.API_BASE_URL_FOR_STREAMS +'streams/'+ token +'?apikey='+ Config.API_SRGSSR_CONSUMER_KEY;
				console.log(" >>> Stream URL = " + streamUrl);
				
				speech = speech.addT("i18n_launch_welcome_message_speech");
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

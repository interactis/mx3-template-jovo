'use strict';

class PlayMedia {

    static play(url, speech, context) {
    
    	/*
		Playback is currently not working.
		The problem is that the URL of the audio requires Basic Authorization.
		But the player cannot handle Basic Authorization.
		The SRG SSR API must be adjusted in order to make the playback work.
		*/	
		
		console.log(" >>> Start playing ...");
		
        // Play audio depending of the platform
        if (context.getType() === "AlexaSkill") {
            context.alexaSkill().audioPlayer()
                .setOffsetInMilliseconds(0)
                .setTitle('Test Song')
                .setSubtitle('Test Description')
                //.addArtwork(imageUrl)
                .play(url, 'token')
                .tell(speech);
        }
        else {
            context.googleAction().audioPlayer().play(url, 'Test Song', {
                "description": "Test Song",
                // "icon": {"url": imageUrl, "alt": accessibilityText}
            });
         	context.googleAction().showSuggestionChips(['Help']);
            context.googleAction().ask(speech);
        }
    }
}

module.exports = PlayMedia;

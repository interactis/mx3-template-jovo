'use strict';

class PlayMedia {

    static play(url, speech, context) {
    
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

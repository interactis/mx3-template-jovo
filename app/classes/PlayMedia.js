'use strict';

class PlayMedia {

    static play(stream, speech, context) {
		
		console.log(" >>> Start playing ...");
		
        // Play audio depending of the platform
        if (context.getType() === "AlexaSkill") {
            context.alexaSkill().audioPlayer()
                .setOffsetInMilliseconds(0)
                .setTitle('Test Song')
                .setSubtitle('Test Description')
                //.addArtwork(imageUrl)
                .play(stream, 'token')
                .tell(speech);
        }
        else {
            context.googleAction().audioPlayer().play(stream, 'Test Song', {
                "description": "Test Song",
                //"icon": {"url": imageUrl, "alt": accessibilityText}
            });
            context.googleAction().ask(speech);
        }
    }
}

module.exports = PlayMedia;

'use strict';

class PlayMedia {

    static play(user, data, speech, context, suggestionChips) {
		
		user.data.lastPlayed = user.data.nowPlaying;
		user.data.nowPlaying = data;
		
        // Play audio depending of the platform
        if (context.getType() === "AlexaSkill") {
            context.alexaSkill().audioPlayer()
                .setOffsetInMilliseconds(0)
                .setTitle(data.title)
                .setSubtitle(data.type)
                //.addArtwork(data.imageUrl)
                .play(data.url, 'token')
                .tell(speech);
        } else {
            context.googleAction().audioPlayer().play(data.url, data.title, {
                "description": data.type,
                //"icon": {"url": data.imageUrl, "alt": data.accessibilityText}
            });
            context.googleAction().showSuggestionChips(suggestionChips);
            context.googleAction().ask(speech);
        }
    }
}

module.exports = PlayMedia;

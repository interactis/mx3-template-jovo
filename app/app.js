'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');
const en = require('./i18n/en-EN');

let languageResources = {
    'en-EN': en
};

const config = {
    logging: false,
    requestLogging: false,
    responseLogging: false,
    intentMap: {
        'AMAZON.HelpIntent': 'HelpIntent',
        'AMAZON.StopIntent': 'QuitIntent',
        'AMAZON.RepeatIntent': 'RepeatIntent',
        'AMAZON.PauseIntent': 'PauseIntent',
        'AMAZON.ResumeIntent': 'ResumeIntent',
        'AMAZON.CancelIntent': 'QuitIntent',
        'AMAZON.NextIntent': 'NextIntent'
    },
    db: {
        type: 'file',
        localDbFilename: 'db',
    },
    userContext: {
        prev: {
            size: 1,
            request: {
                intent: true,
                state: true,
                inputs: true,
                timestamp: true,
            },
            response: {
                speech: true,
                reprompt: true,
                state: true,
            },
        },
    },
    i18n: {
        resources: languageResources,
        fallbackLng: 'en-EN'
    },
};

const app = new App(config);
app.setLanguageResources(languageResources);
// =================================================================================
// App Logic
// =================================================================================

app.setHandler(

    require('./handlers/common'),

    require('./handlers/audio'),
    
);

module.exports.app = app;

'use strict';

module.exports = Object.freeze({
	
	AWS_CONFIG: {
        "accessKeyId": "",
        "secretAccessKey": "",
        "region":  "eu-west-1"
    },
    
    API_SRGSSR_CONSUMER_KEY: "",
    API_SRGSSR_CONSUMER_SECRET: "",

    AWS_DYNAMODB_TABLE_PROD: "mx3-data-prod",
    AWS_DYNAMODB_TABLE_DEV: "mx3-data-dev",
	
    AWS_SRG_SSR_ACCESS_TOKEN: "srg_ssr_access_token",
    API_SRGSSR_ACCESS_TOKEN_URL: "https://api.srgssr.ch/oauth/v1/accesstoken?grant_type=client_credentials",
    
    API_BASE_URL: 'https://api.srgssr.ch/mx3/v2/'
   
	// If needed, add more configs here
	

});

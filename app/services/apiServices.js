'use strict';

const request = require('request-promise');
const Config = require('../config');
const Utils = require('../classes/utils');
const Dynasty = require('dynasty')(Config.AWS_CONFIG);
const GlobalDdb = Dynasty.table(process.env.STAGE === "prod" ? Config.AWS_DYNAMODB_TABLE_PROD : Config.AWS_DYNAMODB_TABLE_DEV);

class ApiServices
{        

    static async getSingleToken(singleId) 
    {
        let url = Config.API_BASE_URL +'singles/'+ singleId +'/token';
        console.log(" >>> getSingleToken - url = " + url);
        
        let response = await this.doGetRequest(url, true);
    	console.log(JSON.stringify(response));
    	
    	if (!response) {
            return null
        }	
		return response;
    }
    
    /*
    // This function is working, but the player can't handle the response.
    static async getStream(token) 
    {
    	let url = Config.API_BASE_URL +'streams/'+ token;
		console.log(" >>> getStream - url = " + url);
			
        let stream = await this.doGetRequest(url, false);
    
    	if (!stream) {
            return null
        }	
		return stream;
    }
    */
    
  	static async doGetRequest(url, parseJson)
	{
		let accessToken = await this.getAccessToken();
		
		let options = {
			uri: url,
			headers: {
				'Authorization': 'Bearer '+  accessToken,
				'accept': 'application/json'
			},
			json: parseJson // Automatically parses the JSON string in the response
		};
		
		try {
			return await request(options);
		}
		catch (error) {
			return null;
		}
	}
	
    static async getAccessToken()
    {   
    	let token = await this.getAccessTokenFromDB();
    	
    	console.log(" >>> DB TOKEN : " + token);
    	
    	if (!token) {
			let authString = Config.API_SRGSSR_CONSUMER_KEY +':'+ Config.API_SRGSSR_CONSUMER_SECRET;
			let base64String = Buffer.from(authString).toString('base64');
	
			let options = {
				method: 'POST',
				uri: Config.API_SRGSSR_ACCESS_TOKEN_URL,
				headers: {
					'Authorization': 'Basic '+ base64String,
					'Cache-Control': 'no-cache',
					'Content-Length': 0
				},
				json: true // Automatically parses the JSON string in the response
			};
		
			let response = await request(options);

			console.log(" >>> ACCESS TOKEN - JSON : " + JSON.stringify(response));
			
			this.saveAccessTokenToDB(response);
			return response.access_token;
		}
		else {
			return token
		}
    }
    
    static async getAccessTokenFromDB()
    {
    	return GlobalDdb.find(Config.AWS_SRG_SSR_ACCESS_TOKEN)
        	.then(function (response) {
        		console.log(" >>> DB RESPONSE TOKEN : "+ JSON.stringify(response));
                if (Utils.isEmpty(response)) {
                    return false;
                }
                else {
                	let buffer = 86400*2; // 2 days
                	let expireTime = Number(response.expires_at) - buffer;
             	
                	if (Utils.currentTimestamp() > expireTime) {
                		console.log(" >>> TOKEN EXPIRED ");
                		return false;
                	}
                	else {
                		return response.token;
                	}
                }
            });
    }
    
    static saveAccessTokenToDB(tokenJson)
    {
    	GlobalDdb.update(Config.AWS_SRG_SSR_ACCESS_TOKEN, {
    		token: tokenJson.access_token,
    		created_at: Math.round((new Date()).getTime() / 1000),
    		expires_at: Number(Utils.currentTimestamp()) + Number(tokenJson.expires_in),
    	}).then(function(response) {
        	console.log(" >>> ACCESS TOKEN - SAVED : "+ JSON.stringify(response));
    	});
    }
}

module.exports = ApiServices;

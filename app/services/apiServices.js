'use strict';

const request = require('request-promise');
const Config = require('../config');

class ApiServices
{        
    static async getAudio(user)
    {
    	let url = Config.API_URL +'audio/next/'+ user.data.id;
    	console.log(" >>> getAudio - url = " + url);
    	
    	let response = await this.doGetRequest(url);
    	// console.log(JSON.stringify(response));
    	
    	if (!response) {
            return null
        }	
		return response;
    }
    
    static async next(user)
    {
    	let url = Config.API_URL +'audio/skip/'+ user.data.nowPlaying.id;
    	console.log(" >>> skip - url = " + url);
    	
    	let postData = {
    		userId: user.data.id
    	}
    	
    	let response = await this.doPostRequest(url, postData);
    	// console.log(JSON.stringify(response));
    	
    	if (!response) {
            return null
        }	
		return response;
    }
    
    static async more(user)
    {
    	let url = Config.API_URL +'audio/morebyaudioid/'+ user.data.nowPlaying.id;
    	console.log(" >>> more - url = " + url);
    	
    	let postData = {
    		userId: user.data.id
    	}
    	
    	let response = await this.doPostRequest(url, postData);
    	console.log(JSON.stringify(response));
    	
    	if (!response) {
            return null
        }	
		return response;
    }
    
    static async follow(user)
    {
    	let url = Config.API_URL +'audio/follow/'+ user.data.nowPlaying.id;
    	console.log(" >>> follow - url = " + url);
    	
    	let postData = {
    		userId: user.data.id
    	}
    	
    	let response = await this.doPostRequest(url, postData);
    	// console.log(JSON.stringify(response));
    	
    	if (!response) {
            return null
        }	
		return response;
    }
    
    static async audioCompleted(user)
    {
    	let url = Config.API_URL +'audio/completed/'+ user.data.nowPlaying.id;
    	console.log(" >>> audio completed - url = " + url);
    	
    	let postData = {
    		userId: user.data.id
    	}
    	
    	let response = await this.doPostRequest(url, postData);
    	// console.log(JSON.stringify(response));
    	
    	if (!response) {
            return null
        }	
		return response;
    }
	
	static async doGetRequest(url)
	{
		let options = {
			uri: url,
			headers: {
				'accept': 'application/json'
			},
			json: true // Automatically parses the JSON string in the response
		};
		
		try {
			return await request(options);
		}
		catch (error) {
			return null;
		}
	}
	
	static async doPostRequest(url, postData)
	{
		let options = {
			method: 'POST',
			uri: url,
			form: postData,
			json: true // Automatically parses the JSON string in the response
		};
		
		try {
			return await request(options);
		}
		catch (error) {
			return null;
		}
	}
}

module.exports = ApiServices;

require("dotenv").config();


var Twitter = require('twitter');
var keysTwit = require('./keys.js');
var clientTwit = new Twitter(keysTwit.twitter);

var userReq = process.argv[2];

var paramsTwit = {
    count: 20,
    exclude_replies: true,
    include_rts: false
};

if (userReq === "my-tweets") {
    clientTwit.get('statuses/user_timeline', paramsTwit, retData);

    function retData(err, tweets, response) {
        for (var t = 0; t < tweets.length; t++) {
            console.log(` "${tweets[t].text}" on ${tweets[t].created_at} `);
        };
    }
};


var Spotify = require('node-spotify-api');
var keysSpot = require('./keys.js');
var clientSpot = new Spotify(keysSpot.spotify);

// console.log(clientSpot);


require("dotenv").config();

var Twitter = require('twitter');
var keysTwit = require('./keys.js');

var Spotify = require('node-spotify-api');
var keysSpot = require('./keys.js');

var request = require("request");
var fs = require("fs");

var clientTwit = new Twitter(keysTwit.twitter);
var clientSpot = new Spotify(keysSpot.spotify);

var userReq = process.argv[2];
var userSearch = process.argv[3];

var queryURL = ` http://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy `;
var mrNobody = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";


// Twitter
if (userReq === "my-tweets") {
    var paramsTwit = {
        count: 20,
        exclude_replies: true,
        include_rts: false
    };

    clientTwit.get('statuses/user_timeline', paramsTwit, retData);

    function retData(err, tweets) {
        if (err) {
            console.log(` \n${err}: \nPlease revise your program. \n `);

        } else {
            console.log("\n");
            console.log("                           ✧                          ✧                           ");
            console.log("                          ✦     YOUR RECENT TWEETS     ✦                           ");
            console.log("                           ✧                          ✧                           ");
            console.log("\n");

            for (var t = 0; t < tweets.length; t++) {
                // console.log(tweets);
                var tweetContent = tweets[t].text;
                var tweentTimeStamp = tweets[t].created_at;

                console.log(` ${tweentTimeStamp}: \n"${tweetContent}" \n `);
            };
        };
    }


// Spotify
} else if (userReq === "spotify-this-song" && !userSearch) {
    clientSpot.search ({
        type: 'track',
        query: 'The Sign'
    }, function(err, music) {
        if (err) {
            console.log(` \n${err}: \nPlease revise your program. \n `);

        } else {
            console.log("\nRETREIVING SAMPLE RESULTS... \n\n");

            console.log("              ✰                    ✰            ");
            console.log("            ✰     SAMPLE RESULTS     ✰            ");
            console.log("              ✰                    ✰            ");
            console.log("\n");

            var searchInfo = music.tracks.items[7];
            var theSign = searchInfo.album.name;
            var aoB = searchInfo.album.artists[0].name;
            var albumTitle = searchInfo.album.name;
            var prevURL = searchInfo.external_urls.spotify;

            console.log(`                 Song: ${theSign} \n `);
            console.log(`               Artist: ${aoB} \n `);
            console.log(`                Album: ${albumTitle} \n `);
            console.log(`    Log-in to preview: ${prevURL} \n `);
        };
    });

} else if (userReq === "spotify-this-song" && userSearch) {
    clientSpot.search({
        type: 'track',
        query: userSearch
    }, function (err, music) {
        if (err) {
            console.log(` \n${err}: \nPlease revise your program. \n `);

        } else {
            console.log(` \nSEARCHING: '${userSearch}' \n\n`);

            console.log("              ✰                  ✰            ");
            console.log("            ✰     YOUR RESULTS     ✰            ");
            console.log("              ✰                  ✰            ");
            console.log("\n");

            var searchInfo = music.tracks.items[0];
            var artistName = searchInfo.artists[0].name;
            var songTitle = searchInfo.name;
            var albumTitle = searchInfo.album.name;
            var prevURL = searchInfo.external_urls.spotify;


            console.log(`               Artist: ${artistName} \n `);
            console.log(`                 Song: ${songTitle} \n `);
            console.log(`                Album: ${albumTitle} \n `);
            console.log(`    Log-in to preview: ${prevURL} \n `);
        };
    });


// OMDB
} else if (userReq === "movie-this" && !userSearch) {
    request(mrNobody, function (err, response, body) {
        if (err) {
            console.log(` \n${err}: \nPlease revise your program. \n `);

        } else {
            var parseBody = JSON.parse(body);
            var movieTitle = parseBody.Title;
            var moviePlot = parseBody.Plot;
            var movieRel = parseBody.Year;
            var movieAct = parseBody.Actors;
            var movieLang = parseBody.Language;
            var movieOrig = parseBody.Country;
            var movieIMDB = parseBody.imdbRating;
            var rottTom = parseBody.Ratings[1].Value;
            var movieLink = "http://www.imdb.com/title/tt0485947/";

            console.log(` \nYou should watch "${movieTitle}" if you haven't: ${movieLink} \n `);

            console.log("        ✬                     ✬          ");
            console.log("               MOVIE INFO                 ");
            console.log("        ✬                     ✬          ");
            console.log("\n");

            console.log(` Movie:            ${movieTitle} \n `);
            console.log(` Plot:             ${moviePlot} \n `);
            console.log(` Released:         ${movieRel} \n `);
            console.log(` Actors:           ${movieAct} \n `);
            console.log(` Language:         ${movieLang} \n `);
            console.log(` Location:         ${movieOrig} \n `);
            console.log(` IMDB:             ${movieIMDB} \n `);
            console.log(` Rotten Tomatoes:  ${rottTom} \n `);
        };
    });

} else if (userReq === "movie-this" && userSearch) {
    request(queryURL, function (err, response, body) {
        if (err) {
            console.log(` \n${err}: \nPlease revise your program. \n `);

        } else {            
            var parseBody = JSON.parse(body);
            var movieTitle = parseBody.Title;
            var moviePlot = parseBody.Plot;
            var movieRel = parseBody.Year;
            var movieAct = parseBody.Actors;
            var movieLang = parseBody.Language;
            var movieOrig = parseBody.Country;
            var movieIMDB = parseBody.imdbRating;
            var rottTom = parseBody.Ratings[1].Value;

            console.log(` \nYou've search for: "${movieTitle}" \n `);

            console.log("        ✬                     ✬          ");
            console.log("               MOVIE INFO                 ");
            console.log("        ✬                     ✬          ");
            console.log("\n");

            console.log(` Movie:            ${movieTitle} \n `);
            console.log(` Plot:             ${moviePlot} \n `);
            console.log(` Released:         ${movieRel} \n `);
            console.log(` Actors:           ${movieAct} \n `);
            console.log(` Language:         ${movieLang} \n `);
            console.log(` Location:         ${movieOrig} \n `);
            console.log(` IMDB:             ${movieIMDB} \n `);
            console.log(` Rotten Tomatoes:  ${rottTom} \n `);
        };
    });
} else if (userReq === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function(err, data) {
        if (err) {
            console.log(` \n${err}: \nPlease revise your program. \n `);

        } else {
            var dataArr = data.split(",");

            console.log("\n");
            console.log("             ✵    TXT RESULTS    ✵             ");
            console.log("\n");

            for (var t = 1; t < dataArr.length; t++) {
                var dwisInput = dataArr[t];

                clientSpot.search({
                    type: 'track',
                    query: dwisInput
                }, function (err, music) {
                    if (err) {
                        console.log(` \n${err}: \nPlease revise your program. \n `);

                    } else {
                        var searchInfo = music.tracks.items[0];
                        var artistName = searchInfo.artists[0].name;
                        var songTitle = searchInfo.name;
                        var albumTitle = searchInfo.album.name;
                        var prevURL = searchInfo.external_urls.spotify;

                        console.log(`               Artist: ${artistName} \n `);
                        console.log(`                 Song: ${songTitle} \n `);
                        console.log(`                Album: ${albumTitle} \n `);
                        console.log(`    Log-in to preview: ${prevURL} \n `);
                    };
                });
            };
        };
    });
} else {
    return false;
};
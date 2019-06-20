require("dotenv").config();

var keys = require("./keys.js");
const axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');

var command = process.argv[2]
var nodeArgs = process.argv;
var arg = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        arg += "+" + nodeArgs[i];
    } else {
        arg += nodeArgs[i];
    }
}

if (command === "concert-this") {
    concert();
} else if (command === "spotify-this-song") {
    spotify();
} else if (command === "movie-this") {
    omdbapi();
} else if (command === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("unknown command " + command)
}


function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var data = response.data[0]
            console.log("\n" + data.venue.name);
            console.log(data.venue.city + ",", data.venue.country)
            console.log(data.datetime + "\n")
        })
}

function spotify() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n" + data.tracks.items[0].artists[0].name)
        console.log(data.tracks.items[0].album.name)
        console.log(data.tracks.items[0].album.external_urls.spotify + "\n")
    });
}

function omdbapi() {
    var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            if(arg === ""){
            console.log("Mr.Nobody")
            }else{
            console.log("\n" + "*",response.data.Title);
            console.log("*",response.data.Year);
            console.log("*",response.data.imdbRating);
            console.log("*",response.data.Ratings[0].Value);
            console.log("*",response.data.Country);
            console.log("*",response.data.Language);
            console.log("*",response.data.Plot);
            console.log("*",response.data.Actors + "\n"); 
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
          }
        console.log(data)
    });
}
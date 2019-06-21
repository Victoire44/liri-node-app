require("dotenv").config();
var keys = require("./keys");
const axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var colors = require("colors");

var command = process.argv[2]
var arg = process.argv.slice(3).join(" ");
console.log(arg)

switch (command) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        omdbapi();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        "unknown command " + command;
        break;
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var data = response.data[0]
            console.log("-------------EVENT-------------")
            console.log("\n*","Name of the venue:",data.venue.name.yellow + "\n*","Venue location:",data.venue.city.yellow, data.venue.country.yellow,"\n*","Date of the Event",data.datetime.yellow + "\n")
            console.log("-------------------------------")
        })
}

function spotify() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: arg }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var jsonData = data.tracks.items[0];
        console.log("-------------MUSIC-------------")
        console.log("\n*","Artist:",jsonData.artists[0].name.yellow,"\n*","The song's name:",jsonData.name.yellow,"\n*","A preview link of the song from Spotify:",jsonData.external_urls.spotify.yellow,"\n*","The album the the song is from:",jsonData.album.name.yellow,"\n")
        console.log("-------------------------------")
    });
}

function omdbapi() {
    var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            if (arg === "") {
                console.log("Mr.Nobody")
            } else {
                var jsonData = response.data
                console.log("-------------MOVIE-------------")
                console.log("\n*","Title:",jsonData.Title.rainbow.bold, "\n*", "Year the movie came out :",jsonData.Year.yellow,
                    "\n*","IMDB Rating:",jsonData.imdbRating.yellow,"\n*","Rotten Tomatoes Rating:",jsonData.Ratings[0].Value.yellow,
                    "\n*", "Country where the movie was produced:",jsonData.Country.yellow,"\n*","Language(s):",jsonData.Language.yellow,"\n*","Plot:",jsonData.Plot.yellow,"\n*","Actors",jsonData.Actors.yellow,"\n");
                console.log("-------------------------------")
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
            console.log(error);
        }
        console.log("\n--------------------------------------\n" + data.yellow + "\n--------------------------------------\n")
    });
}
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

    case "movie-this":
        doWhatItSays();
        break;
    default:
       "unknown command " + command;
       break;
}

// if (command === "concert-this") {
//     concert();
// } else if (command === "spotify-this-song") {
//     spotify();
// } else if (command === "movie-this") {
//     omdbapi();
// } else if (command === "do-what-it-says") {
//     doWhatItSays();
// } else {
//     console.log("unknown command " + command)
// }

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var data = response.data[0]
            console.log("\n" + data.venue.name.yellow + "\n" + data.venue.city.yellow, data.venue.country.yellow + "\n" + data.datetime.yellow + "\n")
        })

}

function spotify() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: arg }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var dataJSON = data.tracks.items[0];
        console.log("\n" + dataJSON.artists[0].name.yellow + "\n" + dataJSON.name.yellow + "\n" + dataJSON.external_urls.spotify.yellow + "\n" + dataJSON.album.name.yellow + "\n")
    });
}

function omdbapi() {
    var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            if (arg === "") {
                console.log("Mr.Nobody")
            } else {
                console.log("\n" + "*", response.data.Title.rainbow.bold, "\n*", response.data.Year.yellow,
                    "\n*", response.data.imdbRating.yellow, "\n*", response.data.Ratings[0].Value.yellow,
                    "\n*", response.data.Country.yellow, "\n*", response.data.Plot.yellow, "\n*", response.data.Actors.yellow + "\n");
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
        console.log(data)
    });
}
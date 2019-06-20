# liri-node-app

> LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you a back data.

## Used Technologies
* JavaScript
* Node.js

## Node Package Manager (npm) 

Using the axios package to retrieve data from API:

* <strong>Bands in Town API</strong> to render the name of the venue, the venue location and the date for each event.

```javascript
function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var data = response.data[0]
            console.log("\n" + data.venue.name);
            console.log(data.venue.city + ",", data.venue.country)
            console.log(data.datetime + "\n")
        })
}
```
* <strong>Spotify API</strong> to render the artist, the song's name, a preview link of the song and the album that the song is from.

```javascript
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
```
* <strong>OMBD API</strong> to render the title of the movie, the year the movie came out, the IMDB rating, the rotten tomatoes rating,the country where the movie was produced, the language, the plot and the actors in the movie.

```javascript
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
```
## Author

Victoire Baron
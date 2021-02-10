# Spotify API (Work in Progress)

## Accounts API

[Accounts API Developer Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)

Pretty freaking straightforward OAuth 💜

---

## Playlist API

[Playlist API Reference](https://developer.spotify.com/documentation/web-api/reference/#category-playlists)

**MVP**

* Get a List of Current User's Playlists
* Create a Playlist
* Add Items to a Playlist

---

## Tracks API

[Tracks API Reference](https://developer.spotify.com/documentation/web-api/reference/#category-tracks)

While albums, artists, etc. all have genres, I think that's too broad to use as a correlation between mood --> genre.

* Get a Track
* [Get Audio Features for a Track](https://developer.spotify.com/documentation/web-api/reference/#object-audiofeaturesobject)

I'm not interested in the *audio analysis* - which is more about a breakdown of the audio itself (musical components) whereas *audio features* feel more about the musical vibes.

### Thoughts

There's a lot of ways I can figure out how to translate sentiment to audio analysis.

* Generate my own playlists that make ME feel a type of way and use the audio features of those playlists to inform the ones I create
* TODO: Need to sort of test out the API in order to see how minimal I can go and produce the effect I want e.g. If I use just the `valence`, will that translate well enough that I can call that MVP?

---

## Ways to generate playlist

> Everything below here is still **Work in Progress**

TODO: Getting in the weeds here thinking of all the possibilites. I need to approach this more methodically. How can we solve the problems given different limitations. Some notes for next time are:

* The crux of the blocker right now is "how will we take the sentiment analysis data and generate a track that reflects that data"?
* I've discovered Spotify APIs enough that I can see there's a myriad of ways we can implement this.
* The way I'll approach this exercise is by laying out all the methods.
* Ultimately, I want some good intersection of:
  * Work for the user (how much info will I need from the user)
  * Efficiency - how many additional requests am I making; how much post-request filtering am I having to do?
  * Quality of tracks generated

### Completely bypass having an intial set of track(s) to generate a playlist
* Use keywords in the Search API query (find playlists with the word "sad")
* Use keywords in the Search API query and then filter only for Audio Features that match a pre-determined criteria
* Require the user to provide some filters (genres they hate/love) and filter for that + keywords in Search API query


### Require an initial set of track(s) to generate a playlist
* Get user's recently played tracks


## Search API (tbd)

[Search API Reference](https://developer.spotify.com/documentation/web-api/reference/#category-search)

Whew, there's a lot here but basically the gist is:
* You supply one or more types: album , artist, playlist, track, show and episode.
* Then you can supply as part of the query:
  * Keywords - by which results are returned when a match is found in any field of the target object type
  * Operators - currently only the NOT operator is supported
  * Field filters - Searches can be made more specific by specifying an album, artist or track field filter.
    * TODO: play around with the field filters
* There are some limitations noted in the API re: query filtering + some "special" filters

## Browse API (tbd)

[Browse API Reference](https://developer.spotify.com/documentation/web-api/reference/#category-browse)


---
## Blog Ideas

* How Spotify's API enabled my creativity
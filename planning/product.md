# spotifeels

it's a journaling app that analyzes the mood of your entries and creates playlists for you each month

## The most impossibly basic version

* OAuth with Spotify
  * Absolutely not trying to roll my own auth
* Things the user must be able to get access to
  * Their spotifeel curated playlists
  * Their journal entries
  * The UI to add a journal entry
    * Freeform text box with a submit button

TODO: draw out a diagram

### Concerns
* This might be too boring depending on how I implement this. If I wait for a month, then collect all the journal entries, put them through the sentiment analyzer, and not even proactively notify the user...I mean - I'm bored about this experience and I'm the creator, so...

### Thoughts
* Because of some of my concerns, I'm leaning towards some sort of daily feature for the user. It would encourage them to journal, and it would make the app less boring (having to wait a month before anything interesting happens).

----

## Ice box for flood of ideas

* I know that IFTTT creates playlists from the songs you like that month; I don't know whether Spotify lets you curate playlists on behalf of the user + have them own it so they can edit. But if so, it would be dope do some sort of data collection on how the user is editing the curated playlist each month and feed that back into the algorithm for how we curate the playlist
* Because of some of my concerns, I'm leaning towards some sort of daily insight or song given to the user. It would encourage them to journal. We could even slightly tweak the complexity of the "new journal entry" UI to allow them to set their mood via music. Like "pick the color that best describes your vibe" --> color turns into playlist. Could even have an onboarding experience where they associate colors + genres.
* Could provide audio feature analysis over time via data visualization
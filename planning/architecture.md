# Architecture

Don't really know how to define my domains lol but jotting down some thoughts

* API
  * saveJournalDraft
    * userId, entryId, status: draft
  * submitJournalEntry
    * userId, entryId, status: complete
  * getJournal

* User Service
  * Authorize user
  * Get user

* Journal Service
  * userId, entryId, playlistId
  * Tone analysis data
    * This doesn't seem like a big enough thing to warrant its own service
    * It's just taking text and booping out SA data

  * saveJournalDraft(userId, entryId)
    * Store text, status

  * saveJournalEntry(userId, entryId)
    * Store text, status
    * Run tone analysis
      * Call out to the Watson API
    * Generate playlist
      * Call out to the spotify API

  * getJournalEntry (userId, entryId)

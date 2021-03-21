import ToneAnalyzerV3, { ToneCategory } from 'ibm-watson/tone-analyzer/v3';

import { getTone } from './watson';
import { getSeeds, getPlaylist, Vibes } from './spotify';

const average = (existing: number | undefined, toAdd: number) => {
  const current = existing ?? 0;
  return (current + toAdd)/2;
}

const getVibeFromTone = (tone: ToneAnalyzerV3.DocumentAnalysis): Vibes => {
  const { tone_categories: toneCategories } = tone;
  if (!toneCategories) throw new Error('cannot vibe without sentiment analysis tones');
  const emotionalTone = toneCategories.find(( category: ToneCategory) => category.category_id === 'emotion_tone');
  const languageTone = toneCategories.find(( category: ToneCategory) => category.category_id === 'language_tone');
  if (!emotionalTone && !languageTone) {
    throw new Error('cannot vibe without sentiment analysis tones');
  }
  let vibes: Vibes = {};
  if (emotionalTone) {
    emotionalTone.tones.forEach(({ tone_id, score }) => {
      switch (tone_id) {
        case 'anger':
          vibes = { ...vibes, target_energy: average(vibes.target_energy, score )}
        case 'disgust':
          vibes = { ...vibes, target_valence: average(vibes.target_valence, score)}
        case 'fear':
          vibes = { ...vibes, target_mode: Math.round(score)}
        case 'joy':
          vibes = { ...vibes, target_danceability: average(vibes.target_danceability, score ), target_valence: average(vibes.target_valence, score)}
        case 'sadness':
          vibes = { ...vibes, target_valence: average(vibes.target_valence, score), target_energy: average(vibes.target_energy, score) }
      }
    })
  }
  return vibes;
}

(async() => {
  const tone = await getTone();
  const vibes = getVibeFromTone(tone);
  const seeds = await getSeeds();
  if (!seeds) return;
  const playlistUri = await getPlaylist(seeds, vibes);
  console.log(playlistUri);
})();

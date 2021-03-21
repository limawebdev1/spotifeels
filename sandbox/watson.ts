import dotenv from 'dotenv';
import fs from 'fs';
import ToneAnalyzerV3 from 'ibm-watson/tone-analyzer/v3';
import { IamAuthenticator } from 'ibm-watson/auth';

dotenv.config();
let watsonApi: ToneAnalyzerV3;

interface AppCredentials {
  apiKey: string
}

const loadAppCredentials = (): AppCredentials => {
  const { WATSON_API_KEY } = process.env;
  if (!WATSON_API_KEY) {
    throw new Error('Missing Watson app credentials');
  }
  return {
    apiKey: WATSON_API_KEY,
  };
}

const authorizeWatson = () => {
  const { apiKey } = loadAppCredentials();
  watsonApi = new ToneAnalyzerV3({
    authenticator: new IamAuthenticator({ apikey: apiKey }),
    version: '2016-05-19',
    serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/2cd1d792-4d29-4f43-9c08-318f0097b8d9',
  })
}

const getJournalEntry = (fileName: string): string => {
  const buffer = fs.readFileSync(`./journal-samples/${fileName}.txt`)
  return buffer.toString('utf-8');
}

const analyzeTone = async (journalEntry: string): Promise<void> => {
  try {
    const tone = await watsonApi.tone({
      toneInput: journalEntry,
      contentType: 'text/plain',
    })
    console.log(JSON.stringify(tone.result.document_tone));
  } catch (err) {
    console.log(err);
  }
}

export const getTone = async () => {
  authorizeWatson();
  const journalEntry = getJournalEntry('anon');
  return analyzeTone(journalEntry);
};

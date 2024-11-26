import axios from 'axios';
import { parseQuery } from '../utils/queryParser.js';
import { processSearchResults } from '../utils/resultProcessor.js';
import { searchCache } from '../utils/cache.js';

export async function searchCandidates(query) {
  try {
    const cachedResults = searchCache.get(query);
    if (cachedResults) {
      return cachedResults;
    }

    const searchTerms = parseQuery(query);
    const results = await googleSearch(searchTerms);
    const processedResults = processSearchResults(results, query);
    
    searchCache.set(query, processedResults);
    
    return processedResults;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search candidates');
  }
}

export async function googleSearch(searchTerms) {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.SEARCH_ENGINE_ID,
        q: `site:linkedin.com/in/ ${searchTerms}`,
        num: 10
      }
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Google API error:', error.response?.data || error);
    throw new Error('Search API failed');
  }
}

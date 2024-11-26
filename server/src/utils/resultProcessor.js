import { extractYearsOfExperience, extractSkills } from './queryParser.js';

export function processSearchResults(items, originalQuery) {
  if (!items || !items.length) return [];

  return items.map(item => {
    const profile = extractProfileInfo(item);
    return {
      ...profile,
      relevanceScore: calculateRelevanceScore(profile, originalQuery)
    };
  })
  .filter(profile => profile.relevanceScore > 0)
  .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

function extractProfileInfo(item) {
  return {
    name: item.title.replace(' | LinkedIn', '').trim(),
    profileUrl: item.link,
    snippet: item.snippet || '',
    headline: extractHeadline(item.snippet),
    experience: extractExperienceFromSnippet(item.snippet),
    skills: extractSkillsFromSnippet(item.snippet)
  };
}

function extractHeadline(snippet) {
  const firstLine = snippet.split('.')[0];
  return firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine;
}

function extractExperienceFromSnippet(snippet) {
  const yearsMatch = snippet.match(/(\d+)\+?\s*years?/i);
  return yearsMatch ? parseInt(yearsMatch[1]) : null;
}

function extractSkillsFromSnippet(snippet) {
  const commonSkills = [
    'javascript', 'python', 'java', 'react', 'node', 'aws',
    'full-stack', 'frontend', 'backend'
  ];
  
  return commonSkills.filter(skill => 
    snippet.toLowerCase().includes(skill.toLowerCase())
  );
}

function calculateRelevanceScore(profile, originalQuery) {
  let score = 0;
  const queryLower = originalQuery.toLowerCase();
  

  const yearsRequired = extractYearsOfExperience(originalQuery);
  if (yearsRequired && profile.experience >= yearsRequired) {
    score += 2;
  }

  const requiredSkills = extractSkills(originalQuery);
  requiredSkills.forEach(skill => {
    if (profile.skills.includes(skill)) {
      score += 1;
    }
  });
  
  const snippetLower = profile.snippet.toLowerCase();
  if (snippetLower.includes(queryLower)) {
    score += 1;
  }
  
  return score;
}
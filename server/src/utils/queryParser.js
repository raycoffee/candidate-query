export function parseQuery(query) {
  const parsedQuery = {
    yearsOfExperience: extractYearsOfExperience(query),
    skills: extractSkills(query),
    roles: extractRoles(query),
    companyType: extractCompanyType(query)
  };

  return formatSearchQuery(parsedQuery);
}

export function extractYearsOfExperience(query) {
  const match = query.match(/(\d+)\+?\s*years?/i);
  return match ? parseInt(match[1]) : null;
}

export function extractSkills(query) {
  const skillsRegex = /(?:experience (?:in|with)|background in|skills? in)\s+([^.]+)/i;
  const match = query.match(skillsRegex);
  return match ? match[1].toLowerCase().split(/[,\s]+/).filter(Boolean) : [];
}

export function extractRoles(query) {
  const commonRoles = [
    'software engineer',
    'full stack',
    'frontend',
    'backend',
    'developer',
    'engineer'
  ];
  
  return commonRoles.filter(role => 
    query.toLowerCase().includes(role.toLowerCase())
  );
}

export function extractCompanyType(query) {
  if (query.toLowerCase().includes('big tech')) {
    return 'big tech';
  }
  if (query.toLowerCase().includes('startup')) {
    return 'startup';
  }
  return null;
}

export function formatSearchQuery(parsedQuery) {
  const terms = [];
  
  if (parsedQuery.yearsOfExperience) {
    terms.push(`${parsedQuery.yearsOfExperience} years experience`);
  }
  
  if (parsedQuery.skills.length) {
    terms.push(parsedQuery.skills.join(' '));
  }
  
  if (parsedQuery.roles.length) {
    terms.push(parsedQuery.roles[0]); // Use primary role
  }
  
  if (parsedQuery.companyType) {
    terms.push(parsedQuery.companyType);
  }
  
  return terms.join(' ');
}
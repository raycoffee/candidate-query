
# Candidate Querying Engine

## Overview
This project implements a candidate querying engine that allows users to search for relevant candidates based on natural language queries. The engine uses a combination of natural language processing, web scraping, and ranking algorithms to provide the most relevant candidates for a given query.

## Features
- **Natural Language Queries**: Users can input queries in natural language, such as "Show me candidates that have at least 2 years working at a Big Tech company and have experience with building video chat interfaces."
- **Candidate Profile Retrieval**: The engine fetches candidate profiles from LinkedIn using a custom search engine API.
- **Candidate Ranking**: Candidates are ranked based on the relevance of their profiles to the user's query, considering factors like years of experience, skills, and company type.
- **Caching**: Search results are cached to improve response times and reduce the load on the search API.
- **Simple UI**: A basic user interface is provided to accept user queries and display the search results.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- Google Custom Search Engine API key
- Google Search Engine ID

### Installation
1. Clone the repository:
```
git clone https://github.com/akshay-rr/candidate-querying-engine.git
```
2. Install dependencies:
```
cd candidate-querying-engine
npm install
```
3. Create a `.env` file in the root directory and add the following environment variables:
```
GOOGLE_API_KEY=<your_google_api_key>
SEARCH_ENGINE_ID=<your_search_engine_id>
```
4. Start the development server:
```
npm start
```
The application will be available at `http://localhost:3001`.

## Usage
1. Open the application in your web browser.
2. Enter a search query in the input field and click the "Search" button.
3. The engine will display the top candidate profiles that match the query.

## Design Decisions
1. **Natural Language Processing**: The engine uses a simple rule-based approach to parse the user's query and extract relevant information like years of experience, skills, and company type. This allows for a flexible and easy-to-understand query format.
2. **Web Scraping**: The engine uses the Google Custom Search Engine API to fetch candidate profiles from LinkedIn. This provides a reliable and scalable way to access the necessary data.
3. **Candidate Ranking**: The ranking algorithm considers multiple factors like years of experience, relevant skills, and relevance of the profile snippet to the query. This ensures that the most qualified candidates are displayed first.
4. **Caching**: The engine caches search results to improve response times and reduce the load on the search API. The cache expires after 1 hour to ensure that the results remain up-to-date.
5. **Simple UI**: The user interface is intentionally kept simple to focus on the core functionality of the engine. Users can easily enter queries and view the search results.

## Future Improvements
- **Advanced Natural Language Processing**: Implement more sophisticated natural language processing techniques, such as entity extraction and intent classification, to better understand the user's query.
- **Personalization**: Incorporate user preferences and past search history to provide more personalized candidate recommendations.
- **Candidate Data Enrichment**: Fetch additional data points from candidate profiles, such as education, previous work experience, and awards, to provide more detailed information to the user.
- **Scalability**: Optimize the engine's infrastructure to handle increased traffic and data volume, such as by implementing a distributed architecture or using a more scalable search engine.
- **Analytics**: Add features to track and analyze user behavior, such as popular queries, successful candidate matches, and user engagement metrics.

## Contributing
Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
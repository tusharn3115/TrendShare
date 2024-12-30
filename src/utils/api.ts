import axios from 'axios';
import { Topic } from '../types';

const GITHUB_API = 'https://api.github.com/search/repositories';
const DEV_TO_API = 'https://dev.to/api/articles';
const HN_API = 'https://hacker-news.firebaseio.com/v0';
const REDDIT_API = 'https://www.reddit.com/r/programming.json';
const STACKOVERFLOW_API = 'https://api.stackexchange.com/2.3/questions';

export async function fetchGithubTrends(page = 1, perPage = 6): Promise<Topic[]> {
  try {
    const response = await axios.get(
      `${GITHUB_API}?q=stars:>1000+created:>2024-01-01&sort=stars&order=desc&page=${page}&per_page=${perPage}`
    );
    
    return response.data.items.map((item: { full_name: string; description: string; stargazers_count: number; language: string; html_url: string; created_at: string; }) => ({
      title: item.full_name,
      description: item.description || 'No description available',
      score: item.stargazers_count,
      source: 'GitHub',
      tags: [item.language, 'github'].filter(Boolean),
      url: item.html_url,
      timestamp: new Date(item.created_at).toLocaleDateString()
    }));
  } catch (error) {
    console.error('GitHub API Error:', error);
    return [];
  }
}

export async function fetchDevToPosts(page = 1, perPage = 6): Promise<Topic[]> {
  try {
    const response = await axios.get(`${DEV_TO_API}/latest?page=${page}&per_page=${perPage}`);
    
    return response.data.map((item: { title: string; description: string; positive_reactions_count: number; tag_list: string[]; url: string; published_at: string; }) => ({
      title: item.title,
      description: item.description || item.title,
      score: item.positive_reactions_count,
      source: 'Dev.to',
      tags: item.tag_list.length ? item.tag_list : ['tech'],
      url: item.url,
      timestamp: new Date(item.published_at).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Dev.to API Error:', error);
    return [];
  }
}

export async function fetchHNStories(page = 1, perPage = 6): Promise<Topic[]> {
  try {
    const topStoriesResponse = await axios.get(`${HN_API}/topstories.json`);
    const startIndex = (page - 1) * perPage;
    const storyIds = topStoriesResponse.data.slice(startIndex, startIndex + perPage);
    
    const stories = await Promise.all(
      storyIds.map(async (id: number) => {
        const storyResponse = await axios.get(`${HN_API}/item/${id}.json`);
        const story = storyResponse.data;
        
        return {
          title: story.title,
          description: story.text || 'Click to read more',
          score: story.score,
          source: 'Hacker News',
          tags: ['tech', 'hn'],
          url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
          timestamp: new Date(story.time * 1000).toLocaleDateString()
        };
      })
    );
    
    return stories;
  } catch (error) {
    console.error('Hacker News API Error:', error);
    return [];
  }
}

export async function fetchRedditPosts(perPage = 6): Promise<Topic[]> {
  try {
    const response = await axios.get(`${REDDIT_API}?limit=${perPage}`);
    return response.data.data.children.map((item: { data: { title: string; selftext: string; score: number; permalink: string; created_utc: number; } }) => ({
      title: item.data.title,
      description: item.data.selftext || 'Click to read more',
      score: item.data.score,
      source: 'Reddit',
      tags: ['programming', 'reddit'],
      url: `https://reddit.com${item.data.permalink}`,
      timestamp: new Date(item.data.created_utc * 1000).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Reddit API Error:', error);
    return [];
  }
}

export async function fetchStackOverflowQuestions(page = 1, perPage = 6): Promise<Topic[]> {
  try {
    const response = await axios.get(
      `${STACKOVERFLOW_API}?page=${page}&pagesize=${perPage}&order=desc&sort=votes&site=stackoverflow&tagged=javascript|python|react|typescript`
    );
    return response.data.items.map((item: { title: string; score: number; view_count: number; tags: string[]; link: string; creation_date: number; }) => ({
      title: item.title,
      description: `Score: ${item.score} | Views: ${item.view_count}`,
      score: item.score,
      source: 'Stack Overflow',
      tags: item.tags,
      url: item.link,
      timestamp: new Date(item.creation_date * 1000).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Stack Overflow API Error:', error);
    return [];
  }
}
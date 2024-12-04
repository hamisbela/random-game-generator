import axios from 'axios';

const API_KEY = '3a554d9f18524026843907741d122efd';
const BASE_URL = 'https://api.rawg.io/api';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Array<{ name: string }>;
  platforms: Array<{ platform: { name: string } }>;
  description_raw?: string;
  stores?: Array<{ store: { name: string; domain: string; }; url: string; }>;
}

export interface CategoryFilter {
  type: 'genre' | 'platform';
  value: string;
}

export async function getRandomGame(filter?: CategoryFilter): Promise<Game> {
  try {
    const randomPage = Math.floor(Math.random() * 20) + 1;
    
    const params: Record<string, any> = {
      key: API_KEY,
      page: randomPage,
      page_size: 20,
      ordering: '-rating',
      metacritic: '75,100',
    };

    if (filter) {
      if (filter.type === 'genre') {
        params.genres = filter.value;
      } else if (filter.type === 'platform') {
        params.platforms = filter.value;
      }
    }
    
    const response = await axios.get(`${BASE_URL}/games`, { params });

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error('No games found');
    }

    const games = response.data.results;
    const randomIndex = Math.floor(Math.random() * games.length);
    const selectedGame = games[randomIndex];

    const gameDetailsResponse = await axios.get(`${BASE_URL}/games/${selectedGame.id}`, {
      params: { key: API_KEY },
    });

    if (!gameDetailsResponse.data) {
      throw new Error('Failed to fetch game details');
    }

    return gameDetailsResponse.data;
  } catch (error) {
    console.error('Error in getRandomGame:', error);
    throw error;
  }
}
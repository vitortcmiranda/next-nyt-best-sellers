import axios from "axios";
import BestsellerCategoriesResponse from "./nytimes-api-response";
// import { Redis } from '@upstash/redis'
// import redisUpstash from '../../../app/lib/redis';
import { setCacheByKey, getCacheByKey } from "./redis-api/redis-api";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const redisUrl = process.env.REDIS_URL;
const redisToken = process.env.REDIS_TOKEN;


export const getBestsellerCategories = async (): Promise<BestsellerCategoriesResponse[]> => {
  // const redis = new Redis({
  //   url: redisUrl,
  //   token: redisToken,
  // });


  const cacheKey = 'bestseller-categories';
  const cachedData = await getCacheByKey(cacheKey);
  if (cachedData) {
    return cachedData as BestsellerCategoriesResponse[];
  }

  const uri = `${BASE_URL}/lists/names.json?api-key=${API_KEY}`;
  const response = await axios.get(uri);
  const data = response.data.results;

  await setCacheByKey(cacheKey, data); // Cache for 1 hour
  return data;
};

export const getBooksByCategory = async (category: string): Promise<BestsellerCategoriesResponse> => {
  const cacheKey = `books-category-${category}`;
  const cachedData = await getCacheByKey(cacheKey);

  console.log('cachedData: ', cachedData);
  if (cachedData) {
    console.log('Using cached data for getting books for category: ', category);
    return cachedData as BestsellerCategoriesResponse;
  }

  const uri = `${BASE_URL}/lists/current/${category}.json?api-key=${API_KEY}`;
  const response = await axios.get(uri);
  const data = response.data.results;

  await setCacheByKey(cacheKey, JSON.stringify(data));
  return data;
};
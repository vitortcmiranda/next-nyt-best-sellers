import axios from "axios";
import BestsellerCategoriesResponse from "./nytimes-api-response";
import { setCacheByKey, getBooksCategoryCacheByKey, getBooksByCategoryCache, incrementNytApiCallCount} from "./redis-api/redis-api";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getBestsellerCategories = async (): Promise<BestsellerCategoriesResponse[]> => {
  const cacheKey = 'bestseller-categories';
  const cachedData = await getBooksCategoryCacheByKey(cacheKey);
  if (cachedData) {
    console.log('Returning cached data for getting bestseller categories');
    return cachedData;
  }

  const apiCallsNumber = await incrementNytApiCallCount();
  console.log(`API calls number: ${apiCallsNumber}`);
  const uri = `${BASE_URL}/lists/names.json?api-key=${API_KEY}`;
  const response = await axios.get(uri);
  const data = response.data.results;

  await setCacheByKey(cacheKey, data);
  return data;
};

export const getBooksByCategory = async (category: string): Promise<BestsellerCategoriesResponse> => {
  const cacheKey = `books-category-${category}`;
  const cachedData = await getBooksByCategoryCache(cacheKey);

  if(cachedData) {
    console.log(`Returning cached data for getting books for category: ${category}`);
    return cachedData as unknown as BestsellerCategoriesResponse;
  }

  const apiCallsNumber = await incrementNytApiCallCount();
  console.log(`API calls number: ${apiCallsNumber}`);
  const uri = `${BASE_URL}/lists/current/${category}.json?api-key=${API_KEY}`;
  const response = await axios.get(uri);
  const data = response.data.results;

  console.log(`Returning data for getting books for category: ${category}`);
  await setCacheByKey(cacheKey, data);
  return data;
};
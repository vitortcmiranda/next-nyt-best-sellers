import axios from "axios";
import BestsellerCategoriesResponse from "./nytimes-api-response";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBestsellerCategories = async (): Promise<BestsellerCategoriesResponse[]> => {
const uri  = `${BASE_URL}/lists/names.json?api-key=${API_KEY}`;

  const response = await axios.get(uri);
  return response.data.results;
};

export const getBooksByCategory = async (category: string): Promise<BestsellerCategoriesResponse> => {
const uri  = `${BASE_URL}/lists/current/${category}.json?api-key=${API_KEY}`;
const response = await axios.get(uri);
return response.data.results;
};
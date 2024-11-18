import axios from "axios";
import { getBestsellerCategoriesMocked } from "./nytimes-api-mocked-responses";
import BestsellerCategoriesResponse from "./nytimes-api-response";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBestsellerCategories = async (): Promise<BestsellerCategoriesResponse[]> => {

    if (process.env.ENVIROMENT === 'development') {
        console.log('Using mocked response');
        const response = await getBestsellerCategoriesMocked();
        return response.data.results;
    }

const uri  = `${BASE_URL}/lists/names.json?api-key=${API_KEY}`;

  const response = await axios.get(uri);
  return response.data.results;
};
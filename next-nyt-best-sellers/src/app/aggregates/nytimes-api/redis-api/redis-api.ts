import { Redis } from '@upstash/redis'
import BestsellerCategoriesResponse from '../nytimes-api-response';

const redisUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL;
const redisToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_TOKEN;


export const getBooksCategoryCacheByKey = async (key: string): Promise<BestsellerCategoriesResponse[]> => {
    console.log(`Getting books category cache by key: ${key}`);
    const redis = new Redis({
        url: redisUrl,
        token: redisToken,
    });

    const cachedData =  await redis.get(key);

    return cachedData as unknown as BestsellerCategoriesResponse[];
 
};

export const getBooksByCategoryCache = async (key: string): Promise<string> => {
    console.log(`Getting books category cache by key: ${key}`);
    const redis = new Redis({
        url: redisUrl,
        token: redisToken,
    });

    const cachedData =  await redis.get(key);

    return cachedData as unknown as string;
 
};

export const setCacheByKey = async (key: string, data: BestsellerCategoriesResponse[]) => {
    console.log(`Setting cache by key: ${key}`);
    const redis = new Redis({
        url: redisUrl,
        token: redisToken,
    });
    return await redis.set(key, JSON.stringify(data));

};

export const incrementNytApiCallCount = async ():Promise<number> => {
    console.log(`Getting nyt api call  number`);
    const key = 'nyt-api-call-count';
    const redis = new Redis({
        url: redisUrl,
        token: redisToken,
    });

    const cachedData =  await redis.get(key);
    const result = cachedData as unknown as number;

    if(result >=150) {
        console.log('You have reached the limit of NYT API calls');
        throw new Error('You have reached the limit of NYT API calls');
    }

    if (cachedData) {
        console.log('Incrementing nyt api call count', cachedData);
        const count = parseInt(cachedData as unknown as string);
        const newCount = count + 1;
        await redis.set(key, newCount.toString());
        return newCount;
    }
    
    await redis.set(key, 1);
    return 1;

};


import { Redis } from '@upstash/redis'

const redisUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL;
const redisToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_TOKEN;


export const getCacheByKey = async (key: string) => {
    console.log(`Getting cache by key: ${key}`);
    const redis = new Redis({
        url: redisUrl,
        token: redisToken,
    });

    return await redis.get(key);
};

export const setCacheByKey = async (key: string, data: any) => {
    console.log(`Setting cache by key: ${key}`);
    const redis = new Redis({
        url: redisUrl,
        token: redisToken,
    });
    return await redis.set(key, JSON.stringify(data));

};
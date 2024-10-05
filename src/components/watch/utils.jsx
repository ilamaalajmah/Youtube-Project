import { YOUTUBE_API_KEY } from "../../constants";

const CACHE_KEY_PREFIX = "youtubeVideoCache_";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const HOME_CACHE_KEY = "youtubeTrendingCache";

export const fetchVideoDetails = async (videoId) => {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    return data.items[0];
};

export const getCachedData = (videoId) => {
    const cachedData = localStorage.getItem(`${CACHE_KEY_PREFIX}${videoId}`);
    if (cachedData) {
        const { timestamp, details } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return { details };
        }
    }
    return null;
};

export const setCachedData = (videoId, details) => {
    const cacheData = {
        timestamp: Date.now(),
        details,
    };
    localStorage.setItem(`${CACHE_KEY_PREFIX}${videoId}`, JSON.stringify(cacheData));
};

export const getCachedHomeVideos = () => {
    const cachedData = localStorage.getItem(HOME_CACHE_KEY);
    if (cachedData) {
        const { videos } = JSON.parse(cachedData);
        return videos;
    }
    return null;
};

export const formatNumber = (num) => {
    return new Intl.NumberFormat('ar-SA').format(num);
};

export const formatDescription = (description) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return description
        .replace(urlRegex, (url) => {
            const shortUrl = url.length > 30 ? url.substring(0, 30) + '...' : url;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">${shortUrl}</a>`;
        })
        .replace(/\n/g, '<br />');
};
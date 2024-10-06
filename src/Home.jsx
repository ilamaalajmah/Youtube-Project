import React, { useState, useEffect } from "react";
import { Video } from "./components/video";
import { Shell } from "./components/shell";
import { YOUTUBE_API_KEY } from "./constants";
import { useLoggedIn } from "./stores/logged-in";
import { useNavigate } from "react-router-dom";

const CACHE_KEY = "youtubeTrendingCache";
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

const fetchTrendingVideos = async () => {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=SA&maxResults=50&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    return data.items;
};

const getCachedVideos = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        const { timestamp, videos } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return videos;
        }
    }
    return null;
};

const setCachedVideos = (videos) => {
    const cacheData = {
        timestamp: Date.now(),
        videos,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

export default function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        (async () => {
            let trendingVideos = getCachedVideos();
            if (!trendingVideos) {
                trendingVideos = await fetchTrendingVideos();
                setCachedVideos(trendingVideos);
            }
            setVideos(trendingVideos);
        })();
    }, []);
    const user = useLoggedIn(state => state.user);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login")
        return null;
    }

    return (
        <Shell>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"> {videos.map((video) => (
                <Video
                    key={video.id}
                    id={video.id}
                    title={video.snippet.title}
                    authorName={video.snippet.channelTitle}
                    channelId={video.snippet.channelId}
                    views={parseInt(video.statistics.viewCount)}
                    uploadedAt={new Date(video.snippet.publishedAt)}
                    thumbnail={video.snippet.thumbnails.high.url}
                />
            ))}
            </div>
        </Shell>
    );
}

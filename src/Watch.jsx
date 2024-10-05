import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Shell } from "./components/shell";
import { VideoPlayer } from "./components/watch/video-player";
import { VideoInfo } from "./components/watch/video-info";
import { VideoDescription } from "./components/watch/video-description";
import { Comments } from "./components/watch/Comments";
import { RelatedVideos } from "./components/watch/related-videos";
import { fetchVideoDetails, getCachedData, setCachedData, getCachedHomeVideos } from "./components/watch/utils";

export default function Watch() {
    const { id } = useParams();
    const [videoDetails, setVideoDetails] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {
        const loadVideoData = async () => {
            const cachedData = getCachedData(id);
            if (cachedData && cachedData.details) {
                setVideoDetails(cachedData.details);
            } else {
                const details = await fetchVideoDetails(id);
                setVideoDetails(details);
                setCachedData(id, details);
            }

            const cachedHomeVideos = getCachedHomeVideos();
            if (cachedHomeVideos) {
                const filteredVideos = cachedHomeVideos
                    .filter(video => video.id !== id)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 10);
                setRelatedVideos(filteredVideos);
            }
        };

        loadVideoData();
    }, [id]);

    if (!videoDetails) {
        return <Shell><div className="text-gray-300">يجري التحميل...</div></Shell>;
    }

    return (
        <Shell>
            <div className="flex">
                <div className="flex-grow overflow-y-auto p-4">
                    <VideoPlayer id={id} />
                    <VideoInfo videoDetails={videoDetails} />
                    <VideoDescription videoDetails={videoDetails} />
                    <div className="block md:hidden">
                        <RelatedVideos relatedVideos={relatedVideos} />
                    </div>
                    <Comments videoId={id} />
                </div>
                <div className="hidden md:block">
                    <RelatedVideos relatedVideos={relatedVideos} />
                </div>
            </div>
        </Shell>
    );
}

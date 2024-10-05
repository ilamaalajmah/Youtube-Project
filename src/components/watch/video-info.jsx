import React from 'react';
import { formatNumber } from './utils';

export function VideoInfo({ videoDetails }) {
    return (
        <>
            <h1 className="text-xl font-bold mb-2 text-gray-200">{videoDetails.snippet.title}</h1>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img
                        src={videoDetails.snippet.thumbnails.default.url}
                        alt={videoDetails.snippet.channelTitle}
                        className="w-10 h-10 rounded-full me-2"
                    />
                    <span className="font-medium text-gray-300">{videoDetails.snippet.channelTitle}</span>
                </div>
                <div className="text-gray-400 text-sm">
                    {formatNumber(videoDetails.statistics.viewCount)} مشاهدة
                </div>
            </div>
        </>
    );
}
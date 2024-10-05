import React from 'react';
import { Video } from '../video';

export function RelatedVideos({ relatedVideos }) {
    return (
        <div className="flex-shrink-0 overflow-y-auto md:max-w-[20rem]">
            <div className="p-4">
                <div className="mb-4">
                    <img src="/ad.png" alt="Ad Placeholder" className="w-full" />
                </div>
                <h2 className="text-lg font-bold mb-4 text-gray-200">فيديوهات ذات صلة</h2>
                <div className="space-y-4">
                    {relatedVideos.map((video) => (
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
            </div>
        </div>
    );
}

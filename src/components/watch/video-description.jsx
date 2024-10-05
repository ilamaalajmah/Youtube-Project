import React, { useState } from 'react';
import { formatDescription } from './utils';

export function VideoDescription({ videoDetails }) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const formattedDescription = formatDescription(videoDetails.snippet.description);

    return (
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className={`text-sm text-gray-400 ${showFullDescription ? '' : 'line-clamp-3'}`}
                dangerouslySetInnerHTML={{ __html: formattedDescription }}>
            </div>
            {videoDetails.snippet.description.length > 150 && (
                <button
                    className="text-blue-400 text-sm mt-2 hover:underline"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                >
                    {showFullDescription ? 'عرض أقل' : 'عرض المزيد'}
                </button>
            )}
        </div>
    );
}
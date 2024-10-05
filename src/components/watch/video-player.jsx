import React from 'react';

export function VideoPlayer({ id }) {
    return (
        <div className="aspect-[16/9] mb-4">
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
            ></iframe>
        </div>
    );
}

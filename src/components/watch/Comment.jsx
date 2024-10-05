import React from 'react';

export function Comment({ comment }) {
    console.log("Rendering comment: ", comment);
    return (
        <div className="flex space-x-3 space-x-reverse mb-4">
            <img src={comment.user.avatar} alt={comment.user.username} className="w-10 h-10 rounded-full" />
            <div>
                <div className="flex items-center mb-1">
                    <h4 className="font-bold ml-2">{comment.user.username}</h4>
                    <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString('ar-EG')}</span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
            </div>
        </div>
    );
}
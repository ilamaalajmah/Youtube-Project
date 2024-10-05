import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import { useLoggedIn } from '../../stores/logged-in';

export function CommentBox({ videoId, onCommentAdded }) {
    const [content, setContent] = useState('');
    const { user } = useLoggedIn();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const newComment = await addComment(videoId, user.id, content);
            onCommentAdded(newComment);
            setContent('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (!user) {
        return <p className="text-gray-400">يرجى تسجيل الدخول للتعليق</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="أضف تعليقًا..."
                className="w-full p-2 rounded bg-gray-700 text-white"
                rows="3"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                إرسال التعليق
            </button>
        </form>
    );
}

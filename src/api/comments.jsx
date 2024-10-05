import axios from 'axios';
import { getAccountDetails } from './auth';

const API_BASE_URL = 'https://66ffcf424da5bd2375520fca.mockapi.io';

export const fetchCommentsForVideo = async (videoId) => {
    const response = await axios.get(`${API_BASE_URL}/comments?videoId=${videoId}`);
    const comments = response.data;

    const commentsWithUserDetails = await Promise.all(
        comments.map(async (comment) => {
            const user = await getAccountDetails(comment.userId);
            return {
                ...comment,
                user: {
                    id: user.id,
                    username: user.username,
                    avatar: user.avatar,
                },
            };
        })
    );

    return commentsWithUserDetails;
};

export const addComment = async (videoId, userId, content) => {
    const response = await axios.post(`${API_BASE_URL}/comments`, {
        videoId,
        userId,
        content,
        createdAt: new Date().toISOString(),
    });
    const comments = await fetchCommentsForVideo(videoId);
    return comments.find(c => c.id === response.data.id);
};

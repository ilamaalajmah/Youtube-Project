import React, { useEffect, useState } from "react";
import { fetchCommentsForVideo } from "../../api/comments";
import { Comment } from "./Comment";
import { CommentBox } from "./CommentBox";

export function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const freshComments = await fetchCommentsForVideo(videoId);
        setComments(freshComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleCommentAdded = (newComment) => {
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
  };

  if (loading) {
    return <p className="text-gray-400">جارٍ تحميل التعليقات...</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">التعليقات</h3>
      <CommentBox videoId={videoId} onCommentAdded={handleCommentAdded} />
      {comments.length > 0
        ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )
        : <p className="text-gray-400">لا توجد تعليقات بعد</p>}
    </div>
  );
}

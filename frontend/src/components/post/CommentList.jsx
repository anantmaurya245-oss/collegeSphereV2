import { useEffect, useState } from "react";
import api from "../../api/axios";

import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await api.get(
        `comments/posts/${postId}/comments/`
      );

      setComments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (loading) {
    return (
      <div className="mt-4 text-gray-500">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="mt-6">

      <CommentForm
        postId={postId}
        onCommentAdded={fetchComments}
      />

      <div className="mt-6">

        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))
        )}

      </div>

    </div>
  );
}
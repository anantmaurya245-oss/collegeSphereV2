import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

export default function CommentForm({
  postId,
  onCommentAdded,
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        `comments/posts/${postId}/comments/`,
        {
          content,
        }
      );

      toast.success("Comment added!");

      setContent("");

      onCommentAdded();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mt-4"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border rounded-xl px-4 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl px-4 flex items-center gap-2"
      >
        <Send size={18} />
        Send
      </button>
    </form>
  );
}
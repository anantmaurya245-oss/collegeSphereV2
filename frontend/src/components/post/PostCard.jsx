import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Clock,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import CommentList from "./CommentList";
export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await api.post(
        `posts/${post.id}/like/`
      );

      setLiked(response.data.liked);
      setLikesCount(response.data.likes_count);

      if (response.data.liked) {
        toast.success("Post liked ❤️");
      } else {
        toast.success("Like removed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to like post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between p-6">

        <div className="flex items-center gap-4">

  <Link
    to={`/users/${post.author}`}
    className="flex items-center gap-4 group"
  >

    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold group-hover:ring-4 group-hover:ring-blue-100 transition">
      {post.author?.charAt(0)?.toUpperCase() || "U"}
    </div>

    <div>

      <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
        {post.author}
      </h2>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock size={14} />

        <span>
          {new Date(post.created_at).toLocaleString()}
        </span>
      </div>

    </div>

  </Link>

</div>

        <button className="text-gray-400 hover:text-gray-700 transition">
          <MoreHorizontal size={22} />
        </button>

      </div>

      {/* Content */}

      <div className="px-6 pb-6">

        <p className="text-gray-700 leading-7 whitespace-pre-wrap">
          {post.content}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="mt-5 rounded-xl border border-gray-200 max-h-[500px] w-full object-cover"
          />
        )}

      </div>

      {/* Footer */}
      {showComments && (
        <div className="border-t border-gray-100 px-6 py-4">
          <CommentList postId={post.id} />
      </div>
      )}

      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">

        <button
          type="button"
          disabled={loading}
          onClick={handleLike}
          className={`flex items-center gap-2 transition ${
            liked
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart
            size={20}
            fill={liked ? "currentColor" : "none"}
          />

          <span>
            {likesCount} Like{likesCount !== 1 ? "s" : ""}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
        >
          <Share2 size={20} />

          <span>Share</span>
        </button>

      </div>

    </article>
  );
}
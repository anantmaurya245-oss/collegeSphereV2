import { Clock } from "lucide-react";

export default function CommentCard({ comment }) {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-b-0">

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        {comment.author?.charAt(0)?.toUpperCase() || "U"}
      </div>

      {/* Comment */}
      <div className="flex-1">

        <div className="bg-gray-50 rounded-xl p-4">

          <h4 className="font-semibold text-gray-900">
            {comment.author}
          </h4>

          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {comment.content}
          </p>

        </div>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">

          <Clock size={14} />

          <span>
            {new Date(comment.created_at).toLocaleString()}
          </span>

        </div>

      </div>

    </div>
  );
}
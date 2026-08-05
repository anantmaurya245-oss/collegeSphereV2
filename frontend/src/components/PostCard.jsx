export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <h2 className="font-bold text-lg">
        {post.author}
      </h2>

      <p className="mt-3">
        {post.content}
      </p>

      <p className="text-gray-500 text-sm mt-4">
        {new Date(post.created_at).toLocaleString()}
      </p>

    </div>
  );
}
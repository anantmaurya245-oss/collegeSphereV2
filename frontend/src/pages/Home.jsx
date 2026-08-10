import { useEffect, useState } from "react";
import api from "../api/axios";

import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await api.get("posts/");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-pulse h-32" />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-pulse h-52" />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-pulse h-52" />

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          Welcome to CampusSphere 👋
        </h1>

        <p className="mt-3 text-blue-100">
          Connect with your classmates, share ideas,
          and stay updated with everything happening on campus.
        </p>

      </div>

      {/* Create Post */}

      <CreatePost onPostCreated={fetchPosts} />

      {/* Feed */}

      <section>

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Latest Posts
          </h2>

          <span className="text-sm text-gray-500">
            {posts.length} Posts
          </span>

        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">

            <h3 className="text-xl font-semibold">
              No posts yet
            </h3>

            <p className="mt-3 text-gray-500">
              Be the first student to share something with the community.
            </p>

          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}
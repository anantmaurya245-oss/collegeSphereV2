// 1. Imports
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {

  // 2. State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 STEP 3 GOES HERE
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
  // 4. Loading Check
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // 5. JSX
  return (
  <div className="max-w-3xl mx-auto">

    <h1 className="text-4xl font-bold mb-8">
      CampusSphere Feed
    </h1>
    <CreatePost  onPostCreated={fetchPosts} />

    {posts.length === 0 ? (
      <div className="bg-white p-6 rounded-xl shadow">
        No posts yet.
      </div>
    ) : (
      posts.map((post) => (
  <PostCard
    key={post.id}
    post={post}
  />
))
    )}

  </div>
);
}
import { useState } from "react";
import api from "../api/axios";

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "posts/create/",
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      alert("Post Created Successfully!");

      setContent("");
      onPostCreated();
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 mb-8"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border rounded-lg p-3 h-32 resize-none"
      />

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Create Post
      </button>
    </form>
  );
}
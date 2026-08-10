import { useState } from "react";
import { Pencil, Trash2, Save, X, FileText } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../api/axios";

export default function MyPosts({ posts, setPosts }) {
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditedContent(post.content);
  };

  const handleSave = async (id) => {
    if (!editedContent.trim()) {
      toast.error("Post cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.patch(`posts/${id}/`, {
        content: editedContent,
      });

      setPosts(
        posts.map((post) =>
          post.id === id ? response.data : post
        )
      );

      toast.success("Post updated successfully!");

      setEditingId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`posts/${id}/`);

      setPosts(
        posts.filter((post) => post.id !== id)
      );

      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <section className="mt-12">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-8">

        <FileText
          size={28}
          className="text-blue-600"
        />

        <h2 className="text-3xl font-bold">
          My Posts
        </h2>

      </div>

      {posts.length === 0 ? (

        <div className="bg-white rounded-2xl shadow border border-gray-200 p-10 text-center">

          <h3 className="text-xl font-semibold">
            No Posts Yet
          </h3>

          <p className="text-gray-500 mt-3">
            Share your first post with your campus.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post.id}
              className="bg-white rounded-2xl shadow border border-gray-200 p-6"
            >

              {editingId === post.id ? (

                <>
                  <textarea
                    value={editedContent}
                    onChange={(e) =>
                      setEditedContent(e.target.value)
                    }
                    maxLength={500}
                    className="w-full border rounded-xl p-4 min-h-32 resize-none"
                  />

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-sm text-gray-400">
                      {editedContent.length}/500
                    </span>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          setEditingId(null)
                        }
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl transition"
                      >
                        <X size={18} />
                        Cancel
                      </button>

                      <button
                        disabled={loading}
                        onClick={() =>
                          handleSave(post.id)
                        }
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-2 rounded-xl transition"
                      >
                        <Save size={18} />
                        {loading
                          ? "Saving..."
                          : "Save"}
                      </button>

                    </div>

                  </div>

                </>

              ) : (

                <>
                  <p className="text-lg leading-7 whitespace-pre-wrap text-gray-700">
                    {post.content}
                  </p>

                  <p className="text-gray-500 text-sm mt-4">
                    {new Date(
                      post.created_at
                    ).toLocaleString()}
                  </p>

                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() =>
                        handleEdit(post)
                      }
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(post.id)
                      }
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      )}

    </section>
  );
}
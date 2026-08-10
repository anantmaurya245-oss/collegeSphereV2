import { useState } from "react";
import { ImagePlus, Smile, MapPin, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_CHARACTERS = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Write something before posting.");
      return;
    }

    try {
      setLoading(true);

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

      toast.success("Post created successfully!");

      setContent("");

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          C
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Share something with your campus
          </h2>

          <p className="text-sm text-gray-500">
            Your classmates can see this post.
          </p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening today?"
        maxLength={MAX_CHARACTERS}
        className="w-full min-h-36 resize-none rounded-xl border border-gray-200 p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5 text-gray-500">
          <button
            type="button"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <ImagePlus size={20} />
            <span className="text-sm">Photo</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <Smile size={20} />
            <span className="text-sm">Emoji</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <MapPin size={20} />
            <span className="text-sm">Location</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {content.length}/{MAX_CHARACTERS}
          </span>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition flex items-center gap-2"
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
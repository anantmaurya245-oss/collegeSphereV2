import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  FileText,
  CalendarDays,
  User,
} from "lucide-react";
import api from "../api/axios";

export default function PublicProfile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `auth/users/${username}/`
        );

        setProfile(response.data);
      } catch (error) {
        console.error("Public profile error:", error);

        setError(
          error.response?.data?.detail ||
            "Unable to load this profile."
        );
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
          <div className="mx-auto w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

          <p className="mt-4 text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
          <User
            size={48}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Profile not found
          </h1>

          <p className="mt-2 text-gray-500">
            {error || "This user does not exist."}
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = profile.profile_picture
    ? profile.profile_picture.replace(
        "127.0.0.1",
        "localhost"
      )
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Back */}

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Back to Feed
      </Link>

      {/* Profile Header */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Cover */}

        <div className="h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Profile Content */}

        <div className="px-6 sm:px-8 pb-8">

          {/* Avatar */}

          <div className="-mt-16">

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${profile.username}'s profile`}
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                {profile.first_name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  profile.username
                    ?.charAt(0)
                    ?.toUpperCase() ||
                  "U"}
              </div>
            )}

          </div>

          {/* Name */}

          <div className="mt-5">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {profile.first_name}{" "}
              {profile.last_name}
            </h1>

            <p className="text-gray-500 mt-1">
              @{profile.username}
            </p>

            {profile.bio && (
              <p className="mt-4 text-gray-700 leading-7 max-w-2xl">
                {profile.bio}
              </p>
            )}

          </div>

          {/* Stats */}

          <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-gray-100">

            <div>
              <p className="text-2xl font-bold text-gray-900">
                {profile.posts_count ?? 0}
              </p>

              <p className="text-sm text-gray-500">
                Posts
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">
                0
              </p>

              <p className="text-sm text-gray-500">
                Followers
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">
                0
              </p>

              <p className="text-sm text-gray-500">
                Following
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Information */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          About
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">

          <div className="flex items-start gap-3">
            <Building2
              size={20}
              className="text-blue-600 mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                College
              </p>

              <p className="font-medium text-gray-900 mt-1">
                {profile.college || "Not added"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap
              size={20}
              className="text-blue-600 mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                Department
              </p>

              <p className="font-medium text-gray-900 mt-1">
                {profile.department || "Not added"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays
              size={20}
              className="text-blue-600 mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                Year
              </p>

              <p className="font-medium text-gray-900 mt-1">
                {profile.year || "Not added"}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Posts */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">

        <div className="flex items-center gap-3 mb-6">

          <FileText
            size={22}
            className="text-blue-600"
          />

          <h2 className="text-xl font-bold text-gray-900">
            Posts
          </h2>

        </div>

        <p className="text-gray-500">
          {profile.posts_count > 0
            ? `${profile.posts_count} post${
                profile.posts_count === 1
                  ? ""
                  : "s"
              }`
            : "No posts yet."}
        </p>

      </div>

    </div>
  );
}
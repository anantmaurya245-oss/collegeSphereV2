import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("auth/me/");

        setProfile(response.data);
      } catch (error) {
        console.error("Profile Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-2xl">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-10 text-red-600 text-2xl">
        Failed to load profile.
      </div>
    );
  }

  const imageUrl = profile.profile_picture
    ? profile.profile_picture.replace("127.0.0.1", "localhost")
    : "https://placehold.co/200x200?text=User";

  return (
    <div className="max-w-4xl mx-auto mt-10">

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 h-32"></div>

        {/* Profile */}
        <div className="px-8 pb-8">

          <img
            src={imageUrl}
            alt="Profile"
            onError={(e) => {
              e.target.src = "https://placehold.co/200x200?text=User";
            }}
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover -mt-20"
          />

          <div className="mt-4">

            <h1 className="text-4xl font-bold">
              {profile.first_name} {profile.last_name}
            </h1>

            <p className="text-gray-500 text-lg">
              @{profile.username}
            </p>

            <p className="mt-2">
              📧 {profile.email}
            </p>

          </div>

          <hr className="my-6" />

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <h2 className="font-bold text-lg">
                Bio
              </h2>

              <p className="text-gray-700">
                {profile.bio || "No bio added"}
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">
                College
              </h2>

              <p>
                {profile.college || "Not Added"}
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Department
              </h2>

              <p>
                {profile.department || "Not Added"}
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Year
              </h2>

              <p>
                {profile.year || "Not Added"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // NEW STATE
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
  first_name: "",
  last_name: "",
  bio: "",
  college: "",
  department: "",
  year: "",
});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("auth/me/");
        setProfile(response.data);
        setFormData({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          bio: response.data.bio || "",
          college: response.data.college || "",
          department: response.data.department || "",
          year: response.data.year || "",
        });
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
  const handleSave = async () => {
    try {
      const data = new FormData();

      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("bio", formData.bio);
      data.append("college", formData.college);
      data.append("department", formData.department);
      data.append("year", formData.year);
    if (selectedImage) {
      data.append("profile_picture", selectedImage);
    }

      const response = await api.put(
        "auth/me/",
        data,
        {
          headers: {
             "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(response.data);

      setIsEditing(false);

      alert("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Failed to update profile.");
    }
  };

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
              <h2 className="font-bold text-lg">Bio</h2>
              <p>{profile.bio || "No bio added"}</p>
            </div>

            <div>
              <h2 className="font-bold text-lg">College</h2>
              <p>{profile.college || "Not Added"}</p>
            </div>

            <div>
              <h2 className="font-bold text-lg">Department</h2>
              <p>{profile.department || "Not Added"}</p>
            </div>

            <div>
              <h2 className="font-bold text-lg">Year</h2>
              <p>{profile.year || "Not Added"}</p>
            </div>

          </div>

          {/* NEW BUTTON */}
          <div className="mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Edit Profile
            </button>
          </div>

          {/* TEMPORARY MESSAGE */}
          {isEditing && (
  <div className="mt-8 space-y-4">

    <input
      type="text"
      placeholder="First Name"
      value={formData.first_name}
      onChange={(e) =>
        setFormData({
          ...formData,
          first_name: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Last Name"
      value={formData.last_name}
      onChange={(e) =>
        setFormData({
          ...formData,
          last_name: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <textarea
      placeholder="Bio"
      value={formData.bio}
      onChange={(e) =>
        setFormData({
          ...formData,
          bio: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="College"
      value={formData.college}
      onChange={(e) =>
        setFormData({
          ...formData,
          college: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Department"
      value={formData.department}
      onChange={(e) =>
        setFormData({
          ...formData,
          department: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="number"
      placeholder="Year"
      value={formData.year}
      onChange={(e) =>
        setFormData({
          ...formData,
          year: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <div className="flex gap-4">
       <div className="space-y-3">

  <label className="font-semibold">
    Profile Picture
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      setSelectedImage(e.target.files[0]);
    }}
    className="w-full"
  />

  {selectedImage && (
    <img
      src={URL.createObjectURL(selectedImage)}
      alt="Preview"
      className="w-32 h-32 rounded-full object-cover border"
    />
  )}

</div>

      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
    >   
      Save Changes
    </button>

      <button
        onClick={() => setIsEditing(false)}
        className="bg-red-500 text-white px-6 py-2 rounded-lg"
      >
        Cancel
      </button>

    </div>

  </div>
)}

        </div>

      </div>

    </div>
  );
}
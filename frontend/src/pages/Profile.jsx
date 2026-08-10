import { useEffect, useState } from "react";
import api from "../api/axios";

import ProfileHeader from "../profile/ProfileHeader";
import ProfileStats from "../profile/ProfileStats";
import ProfileInfo from "../profile/ProfileInfo";
import EditProfileModal from "../profile/EditProfileModal";
import MyPosts from "../profile/MyPosts";

export default function Profile() {
  const [profile, setProfile] =useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    college: "",
    department: "",
    year: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, postsResponse] =
          await Promise.all([
            api.get("auth/me/"),
            api.get("posts/my-posts/"),
          ]);

        setProfile(profileResponse.data);

        setFormData({
          first_name: profileResponse.data.first_name || "",
          last_name: profileResponse.data.last_name || "",
          bio: profileResponse.data.bio || "",
          college: profileResponse.data.college || "",
          department: profileResponse.data.department || "",
          year: profileResponse.data.year || "",
        });

        setMyPosts(postsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        data.append(
          "profile_picture",
          selectedImage
        );
      }

      const response = await api.put(
        "auth/me/",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setProfile(response.data);

      setIsEditing(false);

      setSelectedImage(null);

      alert("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-20 text-red-600 text-2xl">
        Failed to load profile.
      </div>
    );
  }

  const imageUrl = profile.profile_picture
    ? profile.profile_picture.replace(
        "127.0.0.1",
        "localhost"
      )
    : "https://placehold.co/200x200?text=User";

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <ProfileHeader
        profile={profile}
        imageUrl={imageUrl}
        onEdit={() => setIsEditing(true)}
      />

      <ProfileStats
        postCount={myPosts.length}
      />

      <ProfileInfo
        profile={profile}
      />

      <MyPosts
        posts={myPosts}
      />

      {isEditing && (
        <EditProfileModal
          formData={formData}
          setFormData={setFormData}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onSave={handleSave}
          onCancel={() =>
            setIsEditing(false)
          }
        />
      )}

    </div>
  );
}
import { useState } from "react";

export default function EditProfileModal({
  formData,
  setFormData,
  selectedImage,
  setSelectedImage,
  onSave,
  onCancel,
}) {
  const [preview, setPreview] = useState(
    selectedImage ? URL.createObjectURL(selectedImage) : null
  );

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className="border-b px-8 py-5">
          <h2 className="text-2xl font-bold">
            Edit Profile
          </h2>
        </div>

        <div className="p-8 space-y-6">

          {/* Profile Image */}

          <div className="space-y-3">

            <label className="font-semibold">
              Profile Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border"
              />
            )}

          </div>

          {/* First Name */}

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
            className="w-full border rounded-xl p-3"
          />

          {/* Last Name */}

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
            className="w-full border rounded-xl p-3"
          />

          {/* Bio */}

          <textarea
            rows="4"
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) =>
              setFormData({
                ...formData,
                bio: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3 resize-none"
          />

          {/* College */}

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
            className="w-full border rounded-xl p-3"
          />

          {/* Department */}

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
            className="w-full border rounded-xl p-3"
          />

          {/* Year */}

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
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}
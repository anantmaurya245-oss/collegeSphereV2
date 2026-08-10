export default function ProfileHeader({
  profile,
  imageUrl,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

      {/* Cover */}
      <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="px-8 pb-8">

        {/* Avatar */}
        <img
          src={imageUrl}
          alt="Profile"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/200x200?text=User";
          }}
          className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg -mt-20"
        />

        {/* User Info */}
        <div className="mt-5">

          <h1 className="text-4xl font-bold">
            {profile.first_name} {profile.last_name}
          </h1>

          <p className="text-gray-500 text-lg">
            @{profile.username}
          </p>

          <p className="mt-2 text-gray-600">
            {profile.email}
          </p>

        </div>

        {/* Edit Button */}
        <div className="mt-6">
          <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            Edit Profile
          </button>
        </div>

      </div>

    </div>
  );
}
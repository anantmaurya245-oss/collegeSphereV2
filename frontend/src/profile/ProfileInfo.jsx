export default function ProfileInfo({
  profile,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        About
      </h2>

      <div className="space-y-5">

        <div>
          <h3 className="font-semibold">
            Bio
          </h3>

          <p className="text-gray-600">
            {profile.bio || "No bio added"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            College
          </h3>

          <p>
            {profile.college || "Not Added"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Department
          </h3>

          <p>
            {profile.department || "Not Added"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Year
          </h3>

          <p>
            {profile.year || "Not Added"}
          </p>
        </div>

      </div>

    </div>
  );
}
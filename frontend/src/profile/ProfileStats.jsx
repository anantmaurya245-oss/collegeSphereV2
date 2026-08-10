export default function ProfileStats({
  postCount,
}) {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-3xl font-bold">
          {postCount}
        </h2>

        <p className="text-gray-500">
          Posts
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-3xl font-bold">
          —
        </h2>

        <p className="text-gray-500">
          Followers
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-3xl font-bold">
          —
        </h2>

        <p className="text-gray-500">
          Following
        </p>
      </div>

    </div>
  );
}

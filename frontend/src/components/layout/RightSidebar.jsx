import {
  Sparkles,
  TrendingUp,
  CalendarDays,
  Users,
} from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="space-y-6">

      {/* Campus Updates */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-blue-600" size={20} />
          <h2 className="font-bold text-lg">
            Campus Updates
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          Stay updated with the latest announcements, events,
          and activities across your campus.
        </p>
      </div>

      {/* Upcoming Features */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-purple-600" size={20} />
          <h2 className="font-bold text-lg">
            Coming Soon
          </h2>
        </div>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>💬 Real-time Chat</li>
          <li>❤️ Like & Comment</li>
          <li>🎓 Campus Clubs</li>
          <li>📚 Study Groups</li>
          <li>🏆 Leaderboards</li>
        </ul>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-6">
        <div className="flex items-center gap-2 mb-3">
          <Users size={20} />
          <h2 className="font-bold">
            Community
          </h2>
        </div>

        <div className="space-y-2 text-sm">
          <p>👨‍🎓 Students Connected</p>
          <p>📅 Campus Events</p>
          <p>🚀 Build Together</p>
        </div>
      </div>

      {/* Event Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="text-green-600" size={20} />
          <h2 className="font-bold text-lg">
            Events
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          Upcoming campus events will appear here.
        </p>
      </div>

    </div>
  );
}
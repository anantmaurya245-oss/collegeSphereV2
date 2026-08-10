import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  FileText,
  GraduationCap,
  BriefcaseBusiness,
  CalendarDays,
  Settings,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Home",
      icon: Home,
      path: "/",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "My Posts",
      icon: FileText,
      path: "/profile",
    },
  ];

  const upcoming = [
    {
      title: "Campus Clubs",
      icon: GraduationCap,
    },
    {
      title: "Internships",
      icon: BriefcaseBusiness,
    },
    {
      title: "Events",
      icon: CalendarDays,
    },
    {
      title: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="px-6 pb-6">

          <div className="-mt-10 w-20 h-20 rounded-full bg-white border-4 border-white shadow flex items-center justify-center text-3xl font-bold text-blue-600">
            C
          </div>

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            CampusSphere
          </h2>

          <p className="text-sm text-gray-500">
            Student Community
          </p>

        </div>

      </div>

      {/* Navigation */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">

        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-4">
          Navigation
        </p>

        <div className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.title}
                to={item.path}
                className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200
                  ${
                    active
                      ? "bg-blue-600 text-white shadow"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">
                    {item.title}
                  </span>
                </div>

                <ChevronRight size={18} />
              </Link>
            );
          })}

        </div>

      </div>

      {/* Coming Soon */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">

        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-4">
          Coming Soon
        </p>

        <div className="space-y-2">

          {upcoming.map((item) => {
            const Icon = item.icon;

            return (
                
              <div
                key={item.title}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{item.title}</span>
                </div>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  Soon
                </span>
              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
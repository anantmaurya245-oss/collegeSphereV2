import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";

export default function MainLayout({ children }) {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex gap-6 px-6 py-6">

        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[260px] shrink-0">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-[320px] shrink-0">
          <div className="sticky top-24">
            <RightSidebar />
          </div>
        </aside>

      </div>
    </>
  );
}
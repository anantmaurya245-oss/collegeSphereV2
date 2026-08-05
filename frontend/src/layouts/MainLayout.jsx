import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        {children}
      </main>
    </>
  );
}
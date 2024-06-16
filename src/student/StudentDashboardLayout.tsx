import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function StudentDashboardLayout() {
  return (
    <div>
      <NavBar />

      <div className="min-h-[80vh] container py-4">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

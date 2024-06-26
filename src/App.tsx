import { Link } from "react-router-dom";
import { Button } from "antd";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Attendance Management Portal
          </h1>
          <p className="mt-6 text-lg leading-5 text-gray-600">
            Simplifying attendance tracking for teachers and students. Manage
            attendance records effortlessly and ensure accurate tracking.
          </p>
          <div className="mt-10">
            <Link to="/login">
              <Button type="primary" size="large">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

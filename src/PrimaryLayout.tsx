import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/userContextProvider";
import Login from "./auth/Login";
import AdminDashboardLayout from "./admin/AdminDashboardLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStudents from "./admin/AdminStudents";
import AdminTeachers from "./admin/AdminTeachers";
import AdminSubjects from "./admin/AdminSubjects";
import AdminBatches from "./admin/AdminBatches";
import App from "./App";
import TeacherDashboard from "./teacher/TeacherDashboard";
import TeacherGuardian from "./teacher/TeacherGuardian";
import TeacherSubjects from "./teacher/TeacherSubjects";
import TeacherDashboardLayout from "./teacher/TeacherDashboardLayout";
import StudentDashboardLayout from "./student/StudentDashboardLayout";
import StudentDashboard from "./student/StudentDashboard";
import StudentAttendance from "./student/StudentAttendance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "students",
        element: <AdminStudents />,
      },
      {
        path: "teachers",
        element: <AdminTeachers />,
      },
      {
        path: "subjects",
        element: <AdminSubjects />,
      },
      {
        path: "batches",
        element: <AdminBatches />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <TeacherDashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "guardian",
        element: <TeacherGuardian />,
      },

      {
        path: "subjects",
        element: <TeacherSubjects />,
      },
    ],
  },
  {
    path: "/student",
    element: <StudentDashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "attendance",
        element: <StudentAttendance />,
      },
    ],
  },
]);

export default function PrimaryLayout() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

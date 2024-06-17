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
import LogSubjectAttendance from "./teacher/LogSubjectAttendance";
import ViewSubjectAttendance from "./teacher/ViewSubjectAttendance";
import AdminDepartments from "./admin/AdminDepartments";
import AddDepartment from "./admin/AddDepartment";
import AddBatch from "./admin/AddBatch";
import AdminSemester from "./admin/AdminSemester";
import AddStudents from "./admin/AddStudents";
import AddSemester from "./admin/AddSemester";
import AddTeacher from "./admin/AddTeacher";
import AddSubject from "./admin/AddSubject";
import { ProtectedRoute } from "./ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="Admin">
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
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
        path: "students/add",
        element: <AddStudents />,
      },
      {
        path: "teachers",
        element: <AdminTeachers />,
      },
      {
        path: "teachers/add",
        element: <AddTeacher />,
      },
      {
        path: "subjects",
        element: <AdminSubjects />,
      },
      {
        path: "subjects/add",
        element: <AddSubject />,
      },
      {
        path: "semesters",
        element: <AdminSemester />,
      },
      {
        path: "semesters/add",
        element: <AddSemester />,
      },
      {
        path: "batches",
        element: <AdminBatches />,
      },
      {
        path: "batches/add",
        element: <AddBatch />,
      },
      {
        path: "departments",
        element: <AdminDepartments />,
      },
      {
        path: "departments/add",
        element: <AddDepartment />,
      },
    ],
  },
  {
    path: "/teacher",
    element: (
      <ProtectedRoute requiredRole="Teacher">
        <TeacherDashboardLayout />
      </ProtectedRoute>
    ),
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
      {
        path: "subjects/log-attendance",
        element: <LogSubjectAttendance />,
      },
      {
        path: "subject/view-attendance",
        element: <ViewSubjectAttendance />,
      },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute requiredRole="Student">
        <StudentDashboardLayout />
      </ProtectedRoute>
    ),
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

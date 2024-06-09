import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/userContextProvider";
import Login from "./auth/Login";
import AdminDashboardLayout from "./admin/AdminDashboardLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStudents from "./admin/AdminStudents";
import AdminTeachers from "./admin/AdminTeachers";
import AdminSubjects from "./admin/AdminSubjects";
import AdminBatches from "./admin/AdminBatches";

const router = createBrowserRouter([
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
]);

export default function PrimaryLayout() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

import AdminDashboard from "@/pages/admin/overview/dashboard";
import AdminLayout from "@/layout/admin-layout";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
];

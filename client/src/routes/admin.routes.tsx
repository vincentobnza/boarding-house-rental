import { lazy } from "react";

import AdminLayout from "@/layout/admin-layout";

const AdminDashboard = lazy(() => import("@/pages/admin/overview/dashboard"));
import PendingListings from "@/pages/admin/pending-listing/list";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "pending-listings",
        element: <PendingListings />,
      },
    ],
  },
];

import { lazy } from "react";

const AdminLayout = lazy(() => import("@/layout/admin-layout"));
const AdminDashboard = lazy(() => import("@/pages/admin/overview/dashboard"));
const PendingListings = lazy(
  () => import("@/pages/admin/pending-listing/page"),
);
const RegisteredLandlord = lazy(
  () => import("@/pages/admin/registered-landlord/page"),
);
const ReportsPage = lazy(() => import("@/pages/admin/reports/page"));

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
      {
        path: "registered-landlords",
        element: <RegisteredLandlord />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
    ],
  },
];

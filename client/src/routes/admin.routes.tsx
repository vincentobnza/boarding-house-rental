import { lazyWithDelay } from "@/components/lazyWithDelay";
import LoadingScreen from "@/components/loading";
import { lazy, Suspense } from "react";
const AdmindHome = lazy(() => import("../pages/admin/home"));
const AdminLogin = lazy(() => import("../pages/admin/login"));

const AdminLayout = lazy(() => import("../layout/admin-layout"));
const AdmindDashboard = lazy(() => import("../pages/admin/overview/dashboard"));

const AdminPendingList = lazyWithDelay(
  () => import("../pages/admin/pending-listing/list"),
  2000
);

const withSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<LoadingScreen />}>{Component}</Suspense>
);

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdmindHome />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/overview",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdmindDashboard />,
      },
      {
        path: "pending-listings",
        element: <AdminPendingList />,
      },

      //   ACTIONS
      {
        path: "listings/new",
        element: withSuspense(<AdminLayout />),
      },
    ],
  },
];

import { lazy } from "react";
const RootLayout = lazy(() => import("../layout/root-layout"));
const Homepage = lazy(() => import("../pages/tenant/homepage"));
const TenantLayout = lazy(() => import("../layout/tenant-layout"));
const TenantDashboard = lazy(() => import("../pages/tenant/dashboard"));

export const tenantRoutes = [
  {
    path: "/tenant",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },

  {
    path: "/tenant/*",
    element: <TenantLayout />,
    children: [
      {
        path: "rental-house",
        element: <TenantDashboard />,
      },
    ],
  },
];

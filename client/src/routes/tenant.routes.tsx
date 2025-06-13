import { lazy } from "react";
const RootLayout = lazy(() => import("../layout/root-layout"));
const Homepage = lazy(() => import("../pages/tenant/homepage"));

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
];

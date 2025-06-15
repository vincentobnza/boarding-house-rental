import { lazy } from "react";
const RootLayout = lazy(() => import("../layout/root-layout"));
const Homepage = lazy(() => import("../pages/tenant/homepage"));
const TenantLayout = lazy(() => import("../layout/tenant-layout"));
const RentalHouse = lazy(() => import("../pages/tenant/rental-house"));
const NearSchool = lazy(() => import("../pages/tenant/near-school"));
const BoardingHouse = lazy(() => import("../pages/tenant/boarding-house"));

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
        element: <RentalHouse />,
      },
      {
        path: "near-school",
        element: <NearSchool />,
      },
      {
        path: "boarding-house",
        element: <BoardingHouse />,
      },
    ],
  },
];

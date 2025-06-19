import { lazy } from "react";
const RootLayout = lazy(() => import("../layout/root-layout"));
const Homepage = lazy(() => import("../pages/tenant/homepage"));
const TenantLayout = lazy(() => import("../layout/tenant-layout"));
const RentalPage = lazy(() => import("../pages/tenant/rental"));
const BookmarkPage = lazy(() => import("../pages/tenant/bookmarks"));
const TenantInbox = lazy(() => import("../pages/tenant/inbox/chat"));
const RentalHouseDetails = lazy(
  () => import("../pages/tenant/rental-house-details"),
);

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
        path: "rental/:type",
        element: <RentalPage />,
      },
      {
        path: "rental/:rentalHouseId",
        element: <RentalHouseDetails />,
      },

      {
        path: "rental-house",
        element: <RentalPage />,
      },
      {
        path: "rental-house/:rentalHouseId",
        element: <RentalHouseDetails />,
      },
      {
        path: "near-school",
        element: <RentalPage />,
      },
      {
        path: "boarding-house",
        element: <RentalPage />,
      },

      {
        path: "bookmarks",
        element: <BookmarkPage />,
      },
      {
        path: "inbox",
        element: <TenantInbox />,
      },
    ],
  },
];

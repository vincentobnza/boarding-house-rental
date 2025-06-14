import { lazy } from "react";
const LandlordHome = lazy(() => import("../pages/landlord/home"));
const LandlordLogin = lazy(() => import("../pages/landlord/login"));
const LandlordSignup = lazy(() => import("../pages/landlord/signup"));
const LandlordLayout = lazy(() => import("../layout/landlord-layout"));
const LandlordDashboard = lazy(
  () => import("../pages/landlord/listings/dashboard")
);
const LandlordRegistration = lazy(
  () => import("../pages/landlord/registration")
);
const LandlordInbox = lazy(() => import("../pages/landlord/inbox/chat"));

export const landlordRoutes = [
  {
    path: "/landlord",
    element: <LandlordHome />,
  },
  {
    path: "/landlord/login",
    element: <LandlordLogin />,
  },
  {
    path: "/landlord/signup",
    element: <LandlordSignup />,
  },
  {
    path: "/landlord/registration",
    element: <LandlordRegistration />,
  },
  {
    path: "/landlord/dashboard",
    element: <LandlordLayout />,
    children: [
      {
        path: "listings",
        element: <LandlordDashboard />,
      },
      {
        path: "inbox",
        element: <LandlordInbox />,
      },

      //   ACTIONS
      {
        path: "listings/new",
      },
    ],
  },
];

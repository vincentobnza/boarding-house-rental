import { lazy } from "react";
import RootLayout from "./layout/root-layout";
const SplashScreen = lazy(() => import("./pages/splash-screen"));
const Homepage = lazy(() => import("./pages/tenant/homepage"));
const LandlordHome = lazy(() => import("./pages/landlord/home"));
const Onboarding = lazy(() => import("./pages/onboarding"));
const LandlordLogin = lazy(() => import("./pages/landlord/login"));
const LandlordSignup = lazy(() => import("./pages/landlord/signup"));
const LandlordLayout = lazy(() => import("./layout/landlord-layout"));
const LandlordDashboard = lazy(
  () => import("./pages/landlord/listings/dashboard")
);
const LandlordRegistration = lazy(
  () => import("./pages/landlord/registration")
);
const LandlordInbox = lazy(() => import("./pages/landlord/inbox/chat"));

export const globalRoutes = [
  {
    index: true,
    element: <SplashScreen />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
];

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
    ],
  },
];

// Combined routes for easy import
const allRoutes = [...globalRoutes, ...tenantRoutes, ...landlordRoutes];
export default allRoutes;

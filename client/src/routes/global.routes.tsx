import { lazy } from "react";

const SplashScreen = lazy(() => import("../pages/splash-screen"));
const Onboarding = lazy(() => import("../pages/onboarding"));

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

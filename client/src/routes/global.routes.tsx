import { lazy } from "react";

const SplashScreen = lazy(() => import("../pages/splash-screen"));
const GetStarted = lazy(() => import("../pages/get-started"));

export const globalRoutes = [
  {
    index: true,
    element: <SplashScreen />,
  },
  {
    path: "/get-started",
    element: <GetStarted />,
  },
];

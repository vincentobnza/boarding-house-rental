import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/root-layout";
import { lazy, Suspense } from "react";
import LoadingScreen from "./components/loading";
const SplashScreen = lazy(() => import("./pages/user/splash-screen"));
const Homepage = lazy(() => import("./pages/user/homepage"));
const LandlordHome = lazy(() => import("./pages/landlord/home"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<SplashScreen />} />
      <Route path="/home" element={<RootLayout />}>
        <Route index element={<Homepage />} />
      </Route>
      <Route path="/landlord" element={<LandlordHome />} />
    </>
  )
);

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/root-layout";
import { lazy, Suspense } from "react";
import LoadingScreen from "./components/loading";
const SplashScreen = lazy(() => import("./pages/splash-screen"));
const Homepage = lazy(() => import("./pages/tenant/homepage"));
const LandlordHome = lazy(() => import("./pages/landlord/home"));
const Onboarding = lazy(() => import("./pages/onboarding"));
const LandlordLogin = lazy(() => import("./pages/landlord/login"));
import LandlordSignup from "./pages/landlord/signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<SplashScreen />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/tenant" element={<RootLayout />}>
        <Route index element={<Homepage />} />
      </Route>
      <Route path="/landlord" element={<LandlordHome />} />
      <Route path="/landlord/login" element={<LandlordLogin />} />
      <Route path="/landlord/signup" element={<LandlordSignup />} />
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

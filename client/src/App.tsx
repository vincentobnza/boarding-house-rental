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
const LandlordSignup = lazy(() => import("./pages/landlord/signup"));
const LandlordLayout = lazy(() => import("./layout/landlord-layout"));
const LandlordDashboard = lazy(
  () => import("./pages/landlord/listings/dashboard")
);
const LandlordRegistration = lazy(
  () => import("./pages/landlord/registration")
);
const LandlordInbox = lazy(() => import("./pages/landlord/inbox/chat"));

// query client
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<SplashScreen />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/tenant" element={<RootLayout />}>
        <Route index element={<Homepage />} />
      </Route>
      {/* LANDLORD PAGES */}
      <Route path="/landlord" element={<LandlordHome />} />
      <Route path="/landlord/login" element={<LandlordLogin />} />
      <Route path="/landlord/signup" element={<LandlordSignup />} />
      <Route path="/landlord/registration" element={<LandlordRegistration />} />

      {/* LANDLORD DASHBOARD */}
      <Route path="/landlord/dashboard" element={<LandlordLayout />}>
        <Route path="listings" element={<LandlordDashboard />} />
        <Route path="inbox" element={<LandlordInbox />} />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/root-layout";
import { lazy, Suspense } from "react";
const SplashScreen = lazy(() => import("./pages/user/splash-screen"));
const Homepage = lazy(() => import("./pages/user/homepage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<SplashScreen />} />
      <Route path="/home" element={<RootLayout />}>
        <Route index element={<Homepage />} />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <h1 className="text-2xl text-gray-700">Loading...</h1>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

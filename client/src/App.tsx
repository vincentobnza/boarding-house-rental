import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/root-layout";
import { lazy, Suspense } from "react";
const SplashScreen = lazy(() => import("./pages/splash-screen"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<SplashScreen />} />
    </Route>
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

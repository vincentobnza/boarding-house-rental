import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import LoadingScreen from "./components/loading";
import allRoutes from "./routes";
// query client
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";

const router = createBrowserRouter(allRoutes);

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

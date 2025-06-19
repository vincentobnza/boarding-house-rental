import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import LoadingScreen from "./components/loading";
import allRoutes from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "./lib/query-client";
import { ChatProvider } from "./hooks/ChatProvider";

const router = createBrowserRouter(allRoutes);

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <RouterProvider router={router} />
        </ChatProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

import { lazyWithDelay } from "@/components/lazyWithDelay";
import LoadingScreen from "@/components/loading";
import { lazy, Suspense } from "react";
const LandlordHome = lazy(() => import("../pages/landlord/home"));
const LandlordLogin = lazy(() => import("../pages/landlord/login"));
const LandlordSignup = lazy(() => import("../pages/landlord/signup"));
const LandlordLayout = lazy(() => import("../layout/landlord-layout"));
const LandlordDashboard = lazy(
  () => import("../pages/landlord/listings/dashboard")
);
const LandlordRegistration = lazy(
  () => import("../pages/landlord/registration/registration")
);

const LandlordRegistrationPayment = lazy(
  () => import("../pages/landlord/registration/registration-payment")
);
const LandlordInbox = lazy(() => import("../pages/landlord/inbox/chat"));

const LandlordListingsNew = lazyWithDelay(
  () => import("../pages/landlord/listings/new-listing"),
  2000
);

const withSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<LoadingScreen />}>{Component}</Suspense>
);

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
    path: "/landlord/registration/payment",
    element: <LandlordRegistrationPayment />,
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

      //   ACTIONS
      {
        path: "listings/new",
        element: withSuspense(<LandlordListingsNew />),
      },
    ],
  },
];

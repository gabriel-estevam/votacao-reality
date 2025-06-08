import { Navigate } from "react-router-dom";
import VotingPage from "./pages/VotingPage";
import AccountSettings from "./pages/AccountSettings";

const routes = [
  {
    path: "/",
    element: <Navigate to="/votacao" replace />,
  },
  {
    path: "/votacao",
    element: <VotingPage />,
  },
  {
    path: "/conta",
    element: <AccountSettings />
  },

   {
    path: "*",
    element: <Navigate to="/votacao" replace />,
  },
];

export default routes;

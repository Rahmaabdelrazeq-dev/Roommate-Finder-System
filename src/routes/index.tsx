import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/components/Layout";
import Auth from "../Auth";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element:<Auth/>
      },

    ],
  },
]);
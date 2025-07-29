import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Home";
import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout/AuthLayout";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/security/protectedRoute";
import { Dashboard } from "./pages/dashboard/DashboardPage";
import { Profile } from "./pages/Profile/Profile";
import AuthProvider from "./context/AuthContextProvider";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute auth={true}>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "user/:userId",
    element: <Profile />,
  },
]);
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
};

export default App;

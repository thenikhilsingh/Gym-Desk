import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import Logout from "./components/Logout.jsx";
import Error from "./pages/Error.jsx";
import Admin from "./pages/Admin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Plans from "./pages/Plans.jsx";
import Members from "./pages/Members.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth Routes */}
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminDashboard />}></Route>
        <Route path="plans" element={<Plans />}></Route>
        <Route path="members" element={<Members />}></Route>
      </Route>
      {/* App Routes */}
      <Route path="/app" element={<App />}>
        <Route index element={<Home />}></Route>
      </Route>

      {/* Error Route */}
      <Route path="*" element={<Error />}></Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
  </StrictMode>,
);

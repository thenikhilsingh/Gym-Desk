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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth Routes */}
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
       <Route path="/logout" element={<Logout />}></Route>

      {/* Admin Routes */}

      {/* App Routes */}
      <Route path="/app" element={<App />}>
        <Route index element={<Home />}></Route>
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

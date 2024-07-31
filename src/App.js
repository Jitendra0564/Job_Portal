import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
//import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute.js";
import PublicRoute from "./components/routes/PublicRoute.js";
import Jobstatus from "../src/pages/JobStats.js";
import UserProfile from "./components/User/UserProfile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/jobstats"
          element={
            <PrivateRoute>
              <Jobstatus />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/UpdateProfile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

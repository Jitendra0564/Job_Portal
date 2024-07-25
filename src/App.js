import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
//import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

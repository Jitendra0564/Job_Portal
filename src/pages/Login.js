import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../Redux/feature/alertslice";
import Spinner from "../components/shared/spinner";
import { toast } from "react-toastify";
import img from "../../src/assets/images.png";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //redux
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return alert("please provide all fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login Sucessfully");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("invalid creadentials");
      console.log();
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-2" onSubmit={handlesubmit}>
            <img src={img} alt="logo" height={150} width={400} />
            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <div className="d-flex justify-content-between">
                <p>
                  New User?<Link to="/register">Register</Link>{" "}
                </p>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;

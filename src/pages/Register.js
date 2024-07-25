import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../Redux/feature/alertslice";
import Spinner from "../components/shared/spinner";
import { toast } from "react-toastify";
import img from "../../src/assets/images.png";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //redux
  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        return alert("Please provide all fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid form details");
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
            <img src={img} alt="logo" height={200} width={400} />
            <div className="mb-1">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email:
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
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <p>
                Already a Register User?<Link to="/login">Login</Link>{" "}
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/user";

const Login = ({ updateUser, redirect }) => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { username, password } = e.target;
      const currentUser = {
        username: username.value,
        password: password.value,
      };
      const { data } = await loginUser(currentUser);
      updateUser(data.user);
      toast.success(data.message, { autoClose: 2500 });
      navigate(redirect);
    } catch (e) {
      toast.error(e.response.data, { autoClose: 2500 });
    }
  };

  const handleChange = (e) => {
    const currentUser = { ...user };
    currentUser[e.currentTarget.name] = e.currentTarget.value;
    setUser(currentUser);
  };

  return (
    <React.Fragment>
      <div class="container d-flex justify-content-center align-items-center mt-5">
        <div class="row">
          <div>
            <div style={{ width: 500 }} class="card shadow">
              <img src="/images/orangetent.jpg" alt="" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">Login</h5>
                <form onSubmit={handleLogin}>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      autoFocus
                      onChange={handleChange}
                      value={user.username}
                      className="form-control"
                      type="text"
                      id="username"
                      name="username"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      value={user.password}
                      className="form-control"
                      type="password"
                      id="password"
                      name="password"
                    />
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-success btn-block">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;

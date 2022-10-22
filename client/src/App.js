import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/home";
import AllCampgrounds from "./pages/campgrounds";
import ShowCampground from "./pages/campgrounds/show";
import NewCampground from "./pages/campgrounds/new";
import EditCampground from "./pages/campgrounds/edit";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/notFound";
import Register from "./pages/register";
import Login from "./pages/login";
import { loginUser } from "./services/user";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [orignalPath, setOriginalPath] = useState("");

  // To call the server as soon as the page is rendered to check whether the user has session cookies
  // And if yes then keep him logged in or else keep him logged out
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await loginUser();
        if (data.user) setUser(data.user);
      } catch (e) {
        // Dont do anything with the error
      }
    };
    getUser();
  }, []);

  // To set user after Login, Register, Logout
  const updateUser = (user) => {
    if (user) setUser(user);
    else setUser({ username: "", password: "", email: "" });
  };

  // We call this function from protected Router to keep track of users orignal path
  // So that user can be redirected to previous page after login
  const updateOrignalPath = (orignalPath) => {
    setOriginalPath(orignalPath);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar updateUser={updateUser} user={user} />
      <ToastContainer />
      <main className="container mt-5 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campgrounds" element={<AllCampgrounds />} />
          <Route
            path="/campgrounds/:id"
            element={<ShowCampground user={user} />}
          />
          <Route
            path="/campgrounds/new"
            element={
              <ProtectedRoute
                user={user}
                element={<NewCampground user={user} />}
                redirect="/login"
                updateOrignalPath={updateOrignalPath}
              />
            }
          />
          <Route
            path="/campgrounds/:id/edit"
            element={<EditCampground user={user} />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/register"
            element={
              <Register
                updateUser={updateUser}
                redirect={orignalPath || "/campgrounds"}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                updateUser={updateUser}
                redirect={orignalPath || "/campgrounds"}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

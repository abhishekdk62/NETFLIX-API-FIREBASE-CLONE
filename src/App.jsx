import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { getUserSession, setUserSession, clearUserSession } from "./utils/session";

const App = () => {
  const navigate = useNavigate();

  // Add cache control
  useEffect(() => {
    // Prevent caching
    const headers = new Headers();
    headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
  }, []);

  useEffect(() => {
    const session = getUserSession();
    if (session) {
      navigate("/");
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        setUserSession(user);
        navigate("/");
      } else {
        console.log("Logged Out");
        clearUserSession();
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/player/:id"
          element={
            <ProtectedRoute>
              <Player />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

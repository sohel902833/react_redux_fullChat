import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/Forget-Password/ForgetPassword";
import PrivateRoute from "./components/util/PrivateRoute";
import PublicRoute from "./components/util/PublicRoute";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ChatBody from "./components/chat/ChatBody";
import { useUserOnlineStatus } from "./hooks/useUserOnlineStatus";
function App() {
  const {} = useUserOnlineStatus();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path=":conversationId" element={<ChatBody />} />
        </Route>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
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
          path="/forget-password"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

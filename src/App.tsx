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
import usePushNotification from "./hooks/usePushNotification";
import NewsFeedLayout from "./components/layout/NewsFeedLayout";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import Profile from "./pages/Profile/Profile";
import BloodDonors from "./pages/dooner/BloodDonors";
import SpredSheet from "./pages/spredsheet/SpredSheet";
function App() {
  const {} = useUserOnlineStatus();
  const data = usePushNotification();
  return (
    <Router>
      <Routes>
        {/* home routes  */}
        <Route path="/" element={<NewsFeedLayout />}>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donor" element={<BloodDonors />} />
          <Route path="/spredsheet" element={<SpredSheet />} />
        </Route>
        {/* //chating routes  */}
        <Route
          path="/chat"
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

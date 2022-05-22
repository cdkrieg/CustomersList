import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage"
import AddReviewsPage from "./pages/AddReviewsPage/AddReviewsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import SendMessagePage from "./pages/MessagesPage/SendMessagePage";
import "./App.css";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='App'>
      <div id='wrapper'>
        <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />
        {showMenu && <Sidebar setShowMenu={setShowMenu} showMenu={showMenu} />}
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/reviews" element={<ReviewsPage />} /> 
            <Route path="/addReviews" element={<AddReviewsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/sendMessage" element={<SendMessagePage />} />
        </Routes>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default App;

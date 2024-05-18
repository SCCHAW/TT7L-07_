
import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import LoginSignup from "../component/loginSignUp/LoginSignup";
import Homepage from "../component/pages/homepage";
import Adminpage from "../component/pages/adminpage";

export const RootNavigation = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginSignup />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/admin" element={<Adminpage />} />
        </Routes>
      </BrowserRouter>
   );
};
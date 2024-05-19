
import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import LoginSignup from "../component/loginSignUp/LoginSignup";
import Homepage from "../component/pages/homepage";
import Adminpage from "../component/pages/adminpage";
import AdminViewAllProduct from "../component/pages/adminViewProduct";

export const RootNavigation = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginSignup />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/admin" element={<Adminpage />} />
          <Route exact path="/adminViewProduct" element={ <AdminViewAllProduct/>} />
        </Routes>
      </BrowserRouter>
   );
};
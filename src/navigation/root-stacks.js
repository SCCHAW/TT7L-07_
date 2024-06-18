
import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import LoginSignup from "../component/loginSignUp/LoginSignup";
import Homepage from "../component/pages/homepage";
import Adminpage from "../component/pages/adminpage";
import AdminViewAllProduct from "../component/pages/adminViewProduct";
import AdminProductDetail from "../component/pages/adminProductDetail";
import UsersProductDetails from "../component/pages/usersProductDetail";
import UserProfile from "../component/pages/usersProfile";
import EditProfilePicture from "../component/pages/editProfilePicture";

export const RootNavigation = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginSignup />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/admin" element={<Adminpage />} />
          <Route exact path="/adminViewProduct" element={ <AdminViewAllProduct/>} />
          <Route exact path="/adminProductDetail" element={ <AdminProductDetail/>} />
          <Route exact path="/usersProductDetail" element={ <UsersProductDetails/>} />
          <Route exact path="/usersProfile" element={ <UserProfile/>} />
          <Route exact path="/me/update" element={<EditProfilePicture />} />
      
        </Routes>
      </BrowserRouter>
   );
};
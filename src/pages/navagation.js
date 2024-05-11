import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import { IndexLoginScreen, IndexSignUpScreen } from "../pages";

export const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signin" element={<IndexLoginScreen />} />
        <Route exact path="/signup" element={<IndexSignUpScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

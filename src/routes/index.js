import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/dashboardpageComp/pagesComp/home/Home";
import List from "../components/dashboardpageComp/pagesComp/list/List";
import Single from "../components/dashboardpageComp/pagesComp/single/Single";

import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import BookmarkPage from "../pages/BookmarkPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import MessengerPage from "../pages/MessengerPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route path="landingpage" element={<LandingPage />} />
      <Route
        path="dashboard/"
      >
        <Route index element={<Home />} />
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
          
        </Route>
      </Route>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="product/:_id" element={<DetailPage />} />
        <Route path="bookmark" element={<BookmarkPage />} />
        <Route path="user/me" element={<AccountPage />} />
        <Route path="messenger" element={<MessengerPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;

import * as React from "react";
import { Routes, Route  } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import QueryPage from "../pages/QueryPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <MainLayout />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="movie/:id" element={<DetailPage />} />
        <Route path="search/:query" element={<QueryPage />}/>
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { getNewsThunk } from "./redux/app-reducer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Footer from "./components/Footer/Footer";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NewsPage from "./components/NewsPage/NewsPage";

function App() {
  return (
    <div>
      <Container maxWidth="lg">
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/news/:id" element={<NewsPage />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;

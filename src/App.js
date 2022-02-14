import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { getNewsThunk } from "./redux/app-reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsPage from "./components/NewsPage/MainPage";
import Header from "./components/Header/Header";
import MainPage from "./components/NewsPage/MainPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewsThunk());
  }, []);
  
  


  return (
    <div>
       <Header /> 
      <MainPage/> 
    </div>
  );
}

export default App;

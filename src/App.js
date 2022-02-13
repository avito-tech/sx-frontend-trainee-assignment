import logo from "./logo.svg";
import "./App.css";
import { getNewsThunk } from "./redux/app-reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewsThunk());
  });
  return <h1>Mainpage</h1>;
}

export default App;

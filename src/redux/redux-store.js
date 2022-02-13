import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./app-reducer";
import { composeWithDevTools } from "@redux-devtools/extension";


let store = createStore(
  appReducer,
  composeWithDevTools(
  applyMiddleware(thunk))
);

export default store
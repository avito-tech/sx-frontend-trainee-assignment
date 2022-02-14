import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducer  from "./app-reducer";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";


let store = createStore(
  appReducer, composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk))
);

export default store
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import placesReducer from "./reducers/places";
import uiReducer from "./reducers/ui";

const rootReducer = combineReducers({
  data: dataReducer
});


const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;

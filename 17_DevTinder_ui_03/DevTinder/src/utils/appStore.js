import { configureStore } from "@reduxjs/toolkit";
import useReducer  from "./userSlice.js";
import feedReducer from "./feedSlice.js"; 
import connectionsReducer from "./connectionSlice.js";
import requestsReducer from "./requestsSlice";


const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default appStore;
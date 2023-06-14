import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";

const store = configureStore({
  reducer: {
    userDetails: userDataSlice,
  },
});

export default store;

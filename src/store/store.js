import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import updateReducer from "./features/updateSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    update: updateReducer,
  },
});

export default store;

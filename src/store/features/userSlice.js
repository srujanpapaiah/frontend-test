import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      return state.filter((data) => data._id !== action.payload);
    },
  },
});

export const { add, deleteUser } = userSlice.actions;

export default userSlice.reducer;

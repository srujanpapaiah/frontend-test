import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    add: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((data) => data._id !== action.payload);
    },
  },
});

export const { add, deleteUser } = userSlice.actions;

export default userSlice.reducer;

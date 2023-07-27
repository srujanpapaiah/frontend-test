import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    update: (state, action) => {
      return action.payload;
    },
  },
});

export const { add, update } = userSlice.actions;

export default userSlice.reducer;

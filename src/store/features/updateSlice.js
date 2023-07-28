import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "update",
  initialState: [],
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateUser } = updateSlice.actions;

export default updateSlice.reducer;

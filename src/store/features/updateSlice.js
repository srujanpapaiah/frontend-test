import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "update",
  initialState: [],
  reducers: {
    updateUser: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { updateUser } = updateSlice.actions;

export default updateSlice.reducer;

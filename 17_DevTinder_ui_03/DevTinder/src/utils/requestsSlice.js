import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter((item) => item._id !== action.payload);
      return newArray;
    },
  },
});

export default requestSlice.reducer;
export const { setRequests, removeRequest } = requestSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userdata",
  initialState: {
    id: "",
    name: "",
    photoURL: "",
    points: 0,
  },
  reducers: {
    setUserData(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photoURL = action.payload.photoURL;
      state.points = action.payload.points;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;

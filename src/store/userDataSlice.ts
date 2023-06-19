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
      const { id, name, photoURL, points } = action.payload;
      state.id = id;
      state.name = name;
      state.photoURL = photoURL;
      state.points = points;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;

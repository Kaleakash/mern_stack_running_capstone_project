import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userState = {
  updateState: false,
  loading: false,
  userList: [],
  error: "",
  response: "",
};

export const loginSignIn = createAsyncThunk(
  "login/signIn",
  async () => {
    const response = await axios.get("http://localhost:3000/login");
    //console.log(response.data)
    return response.data;
  }
);




const userSlice = createSlice({
  name: "bank",
  initialState: userState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
  
    builder
      .addCase(loginSignIn.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(loginSignIn.rejected, (state, action) => {
        state.error = action.error.message;
      });



  },
});

export default userSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } = userSlice.actions;

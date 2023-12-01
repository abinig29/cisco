import { createSlice } from "@reduxjs/toolkit";
const userFound = localStorage.getItem("user");
const initialState = {
  accessToken: userFound ? JSON.parse(userFound).token : null,
  role: userFound ? JSON.parse(userFound).role : null,
  firstName: userFound ? JSON.parse(userFound).firstName : null,
  picture: userFound ? JSON.parse(userFound).picture : null,
  id: userFound ? JSON.parse(userFound).id : null,
  firstTimeLogin: userFound ? JSON.parse(userFound).firstTimeLogin : null,
  email: userFound ? JSON.parse(userFound).email : null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.accessToken = action.payload.token;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.picture = action.payload.picture;
      state.id = action.payload.id;
      state.firstTimeLogin = action.payload.firstTimeLogin;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setCredentialNull: (state, action) => {
      state.accessToken = null;
      state.role = null;
      state.firstName = null;
      localStorage.removeItem("user");
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
      const userInfo = {
        token: action.payload,
        firstName: state.firstName,
        role: state.role,
        picture: state.picture,
        id: state.id,
        firstTimeLogin: state.firstTimeLogin,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
    },
  },
});
export const { setCredential, setCredentialNull, setToken } = authSlice.actions;
export default authSlice.reducer;

export const selectRole = (state) => state.auth.role;
export const selectFirstName = (state) => state.auth.firstName;
export const selectToken = (state) => state.auth.token;
export const selectPicture = (state) => state.auth.picture;
export const selectId = (state) => state.auth.id;
export const selectFirstTimeLogin = (state) => state.auth.firstTimeLogin;
export const selectEmail = (state) => state.auth.email;

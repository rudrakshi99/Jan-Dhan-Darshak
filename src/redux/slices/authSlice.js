import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    email: '',
    hash: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, refreshToken } = action.payload;
      state.user = user;
      state.refreshedToken = refreshToken;
      if(user == null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOtp: (state, action) => {
      const { email, hash } = action.payload;
      state.otp.email = email;
      state.otp.hash = hash;
    },
  },
})


export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
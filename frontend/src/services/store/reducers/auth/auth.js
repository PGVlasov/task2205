import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userIsLoggedIn(state) {
      state.isAuth = true
    },
    userIsLoggedOut(state) {
      state.isAuth = false
    },
  }
});

export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  person: [],
  isLoading: false,
  error: ''
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    personFetching(state) {
      state.isLoading = true
    },
    personFetchingSuccess(state, action) {
      state.isLoading = false
      state.error = ''
      state.person = action.payload
    },
    personFetchingError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
  }
});

export default personSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  people: [],
  isLoading: false,
  error: ''
}

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    peopleFetching(state) {
      state.isLoading = true
    },
    peopleFetchingSuccess(state, action) {
      state.isLoading = false
      state.error = ''
      state.people = action.payload
    },
    peopleFetchingError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
  }
});

export default peopleSlice.reducer;
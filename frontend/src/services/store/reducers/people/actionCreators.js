import axios from "axios";
import { peopleSlice } from "./people";

export const fetchPeople = (url) => async (dispatch) => {
  const token = localStorage.getItem('token')
  try {
    dispatch(peopleSlice.actions.peopleFetching())
    const response = await axios.get(`${url}/users/`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    dispatch(peopleSlice.actions.peopleFetchingSuccess(response.data))
  } catch (e) {
    dispatch(peopleSlice.actions.peopleFetchingError("something went wrong"))
  }
}


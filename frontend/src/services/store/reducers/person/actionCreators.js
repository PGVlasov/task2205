import axios from "axios";
import { personSlice } from "./person";

const token = localStorage.getItem('token')

export const fetchPerson = (url) => async (dispatch,) => {
  try {
    dispatch(personSlice.actions.personFetching())
    const response = await axios.get(`${url}/users/person`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    dispatch(personSlice.actions.personFetchingSuccess(response.data))
  } catch (e) {
    dispatch(personSlice.actions.personFetchingError("something went wrong"))
  }
}


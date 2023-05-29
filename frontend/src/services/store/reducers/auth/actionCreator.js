import { authSlice } from "./auth"

export const SetUserIsLoggedOut = () => async (dispatch) => {
  dispatch(authSlice.actions.userIsLoggedOut())
}

export const SetUserIsLoggedIn = () => async (dispatch) => {
  dispatch(authSlice.actions.userIsLoggedIn())
}
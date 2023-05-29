import { combineReducers, configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./reducers/people/people"
import personReducer from "./reducers/person/person"
import authReducer from './reducers/auth/auth'

const rootReducer = combineReducers({
  peopleReducer, personReducer, authReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

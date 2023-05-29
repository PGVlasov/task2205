import { Route, Routes } from "react-router"
import { RegistrationPage } from "../../pages/registration/registration"
import { AuthPage } from "../../pages/auth/auth"
import { PeoplePage } from "../../pages/people/people"
import { AccaoutPage } from "../../pages/accaunt/accaunt"
import { NotFound } from "../../pages/not-found/not-found"
import ProtectedRoutes from "../privateRoure/privateRoute"

export const AppRouts = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route exact element={<ProtectedRoutes />}>
        <Route path="/accaunt" element={<AccaoutPage />} />
      </ Route>
      <Route exact element={<ProtectedRoutes />}>
        <Route path="/people" element={<PeoplePage />} />
      </ Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
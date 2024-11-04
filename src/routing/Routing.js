import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import ProfilePage from "../pages/profile";
import DialogsPage from "../pages/dialogs";
import UserExist from "./hoc/UserExist";
import LoginPage from "../pages/login";
import RegistrationPage from "../pages/registration";
import RequireAuth from "./hoc/RequireAuth";
import FormLayout from "./layouts/formLayout";
import AuthProvider from "./hoc/AuthProvider";

function Routing() {
  return (
    <AuthProvider>
        <Routes>
            <Route path='/' element={
                <RequireAuth>
                    <MainLayout />
                </RequireAuth>
            }>
                <Route path=':id' element={
                    <UserExist>
                        <ProfilePage />
                    </UserExist>
                } />
                <Route path='dialogs' element={<DialogsPage />} />
            </Route>
            <Route path='/' element={<FormLayout />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='registration' element={<RegistrationPage />}/>
            </Route>
        </Routes>
    </AuthProvider>
  );
}

export default Routing;

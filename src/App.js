import './App.css';
import {Route, Routes} from "react-router-dom";
import MainLayout from "./components/mainLayout";
import Profile from "./pages/profile";
import Dialogs from "./pages/dialogs";
import UserExist from "./hoc/UserExist";
import Login from "./pages/login";
import Registration from "./pages/registration";
import RequireAuth from "./hoc/RequireAuth";
import FormLayout from "./components/formLayout";
import AuthProvider from "./hoc/AuthProvider";
import RegisterName from "./pages/registration/RegisterName";

function App() {
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
                        <Profile />
                    </UserExist>
                } />
                <Route path='dialogs' element={<Dialogs />} />
            </Route>
            <Route path='/' element={<FormLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='registration'>
                    <Route index element={<Registration />} />
                    <Route path='name' element={<RegisterName />} />
                </Route>
            </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;

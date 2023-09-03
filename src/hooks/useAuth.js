import { AuthContext } from "../hoc/AuthProvider";
import { useContext } from "react";

export function useAuth() {
    return useContext(AuthContext);
}
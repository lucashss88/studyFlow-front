import {Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RotaPrivada({children}) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated? children : <Navigate to="/" />;
}
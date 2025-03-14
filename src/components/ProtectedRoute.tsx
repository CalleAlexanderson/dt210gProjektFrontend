import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useLogin } from "../context/LoginContext";

interface protectedRoutesProps {
    children: ReactNode
}

const protectedRoute: React.FC<protectedRoutesProps> = ({ children }) => {
    const { user } = useLogin();

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (<>{children}</>)
}

export default protectedRoute;


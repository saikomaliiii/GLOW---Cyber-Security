import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {


const auth = localStorage.getItem("glow");


if (!auth) return <Navigate to="/" />;


return children;
}
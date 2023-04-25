import { Navigate } from "react-router-dom"

export const AgentRoute = ({ children }: { children: JSX.Element }) => {
    const role = localStorage.getItem('role')
    const logged = localStorage.getItem('logged')

    if (role == 'AGENT' && logged == 'true') {
        return children
    }

    return <Navigate to="/" />
}
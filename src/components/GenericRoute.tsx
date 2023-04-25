import { Navigate } from "react-router-dom"

export const GenericRoute = ({ children }: { children: JSX.Element }) => {
    const role = localStorage.getItem('role')
    const logged = localStorage.getItem('logged')

    if ((role == 'AGENT' || role == 'CUSTOMER') && logged == 'true') {
        return children
    }

    return <Navigate to="/" />
}
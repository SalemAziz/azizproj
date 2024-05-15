import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRouteA() {
    const {currentUser} = useSelector(state => state.user)
    return currentUser ? <Navigate to='/postpage'/> : <Outlet/>;
}
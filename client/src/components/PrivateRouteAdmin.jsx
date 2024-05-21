import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRouteAdmin() {
    const { currentUser } = useSelector(state => state.user);

    // Check if the current user is an admin
    const isAdmin = currentUser && currentUser.role === 'admin';

    return isAdmin ? <Outlet /> : <Navigate to='/postpage' />;
}

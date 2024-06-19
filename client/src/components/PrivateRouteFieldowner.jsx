import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRouteFieldowner() {
   
    const { currentUser } = useSelector(state => state.user);

    const isFieldOwner = currentUser && currentUser.role === 'fieldowner';

    return isFieldOwner ? <Outlet /> : <Navigate to='/FieldReservation' />;

}

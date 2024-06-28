import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./managepost.css"

export default function Dashdemande() {
    const { currentUser } = useSelector((state) => state.user);
    const [demands, setDemands] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [demandeToDelete, setDemandeToDelete] = useState(null);

    useEffect(() => {
        const fetchDemande = async () => {
            try {
                const res = await fetch(`/api/demande/getdemande`);
                if (res.ok) {
                    const data = await res.json();
                    console.log('Fetched data:', data);
                    setDemands(data.demands || []);
                } else {
                    console.error('Failed to fetch fields:', res.statusText);
                }
            } catch (error) {
                console.error('Error fetching fields:', error.message);
            }
        };

        fetchDemande();
    }, []);

    const handleDeleteDemande = async () => {
        try {
            const res = await fetch(`/api/demande/delete/${demandeToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setDemands((prev) => prev.filter((demande) => demande._id !== demandeToDelete));
                setShowConfirm(false);
                setDemandeToDelete(null);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleConfirmDelete = (demandeId) => {
        setDemandeToDelete(demandeId);
        setShowConfirm(true);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setDemandeToDelete(null);
    };

    return (
        <div className='tabsec'>
            {demands.length > 0 ? (
                <table className='tabs'>
                    <thead>
                        <tr>
                            <th className='tabattrb'>Created At</th>
                            <th className='tabattrb'>Owner Full Name</th>
                            <th className='tabattrb'>Field Image</th>
                            <th className='tabattrb'>Email</th>
                            <th className='tabattrb'>Num Tel</th>
                            <th className='tabattrb'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demands.map((demande) => (
                            <tr key={demande._id} className='ms'>
                                <td className='mrp'>
                                    {new Date(demande.createdAt).toLocaleDateString()}
                                </td>
                                <td className='mrp'>{demande.ownerfullname}</td>
                                <td className='mrp'>
                                    <img src={demande.picfield} alt='Post' className='mrppic' />
                                </td>
                                <td className='mrp'>{demande.email}</td>
                                <td className='mrp'>{demande.numtel}</td>
                                <td className='mrp'>
                                    <button className='deltemrp' onClick={() => handleConfirmDelete(demande._id)}>
                                        <span className="text">Delete</span>
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have no demands yet!</p>
            )}

            {showConfirm && (
                <div className="card">
                    <button className="exit-button" onClick={handleCancelDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                        </svg>
                    </button>
                    <div className="card-content">
                        <h2 className="card-heading">Confirm Deletion</h2>
                        <p className="card-description">Are you sure you want to delete this demand?</p>
                        <div className="card-button-wrapper">
                            <button className="card-button primary" onClick={handleDeleteDemande}>Yes</button>
                            <button className="card-button secondary" onClick={handleCancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

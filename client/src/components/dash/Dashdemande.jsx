import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./managepost.css"
export default function Dashdemande() {
    const { currentUser } = useSelector((state) => state.user);
    const [demands, setDemands] = useState([]);
    console.log(demands)

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
    const handleDeleteDemande = async (demandeId) => {
        try {
            const res = await fetch(`/api/demande/delete/${demandeId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setDemands((prev) => prev.filter((demande) => demande._id !== demandeId));
            }
        } catch (error) {
            console.log(error.message);
        }
      };
  return (
    <div className='tabsec'>
            {demands.length > 0 ? (
                <table className='tabs'>
                    <thead>
                        <tr>
                            <th className='tabattrb'>Created At</th>
                            <th className='tabattrb'>ownerfullname</th>
                            <th className='tabattrb'>Field Image</th>
                            <th className='tabattrb'>email</th>
                            <th className='tabattrb'>numtel</th>
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
                                    <button className='deltemrp' onClick={() => handleDeleteDemande(demande._id)}>
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
                <p>You have no posts yet!</p>
            )}
        </div>
  )
}

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./managepost.css"

export default function DashField() {
    const { currentUser } = useSelector((state) => state.user);
    const [fields, setFields] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [fieldToDelete, setFieldToDelete] = useState(null);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const res = await fetch(`/api/field/getfield`);
                if (res.ok) {
                    const data = await res.json();
                    console.log('Fetched data:', data);
                    setFields(data.fields || []);
                } else {
                    console.error('Failed to fetch fields:', res.statusText);
                }
            } catch (error) {
                console.error('Error fetching fields:', error.message);
            }
        };

        fetchFields();
    }, []);

    const handleDeleteField = async () => {
        try {
            const res = await fetch(`/api/field/deletefield/${fieldToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setFields((prev) => prev.filter((field) => field._id !== fieldToDelete));
                setShowConfirm(false);
                setFieldToDelete(null);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleConfirmDelete = (fieldId) => {
        setFieldToDelete(fieldId);
        setShowConfirm(true);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setFieldToDelete(null);
    };

    return (
        <div className='tabsec'>
            {fields.length > 0 ? (
                <table className='tabs'>
                    <thead>
                        <tr>
                            <th className='tabattrb'>Created At</th>
                            <th className='tabattrb'>Creator</th>
                            <th className='tabattrb'>Post Image</th>
                            <th className='tabattrb'>Name</th>
                            <th className='tabattrb'>Work Hour</th>
                            <th className='tabattrb'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field) => (
                            <tr key={field._id} className='ms'>
                                <td className='mrp'>
                                    {new Date(field.createdAt).toLocaleDateString()}
                                </td>
                                <td className='mrp'>{field.adminFieldAdder}</td>
                                <td className='mrp'>
                                    <img src={field.picfield} alt='Post' className='mrppic' />
                                </td>
                                <td className='mrp'>{field.name}</td>
                                <td className='mrp'>{field.workhour}</td>
                                <td className='mrp'>
                                    <button className='deltemrp' onClick={() => handleConfirmDelete(field._id)}>
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

            {showConfirm && (
                <div className="card">
                    <button className="exit-button" onClick={handleCancelDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                        </svg>
                    </button>
                    <div className="card-content">
                        <h2 className="card-heading">Confirm Deletion</h2>
                        <p className="card-description">Are you sure you want to delete this field?</p>
                        <div className="card-button-wrapper">
                            <button className="card-button primary" onClick={handleDeleteField}>Yes</button>
                            <button className="card-button secondary" onClick={handleCancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

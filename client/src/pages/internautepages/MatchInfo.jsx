import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import NavUser from '../../components/usercomp/NavUser';
import './pagescss/matchinfo.css';

const MatchInfo = () => {
    const { matchId } = useParams();
    const [publishError, setPublishError] = useState(null);
    const [formData, setFormData] = useState({ team1: [], team2: [] });
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const res = await fetch(`/api/match/getmatch?matchId=${matchId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message);
                    setPublishError(data.message);
                    return;
                }
                setPublishError(null);
                setFormData(data.matchs[0]);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchMatch();
    }, [matchId]);

    const handleSubmit = async (e, team) => {
        e.preventDefault();
        const endpoint = team === 'team1' ? 'joinmatch' : 'joinmatch2';
        try {
            const res = await fetch(`/api/match/${endpoint}/${matchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error(data.message);
                window.location.reload();
                return;
            }
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <NavUser />
            <div className='matchattrib'>
                <div className='matchinfo'>
                    <div>
                        <h1 className='ffieldname'>{formData.matchname}</h1>
                        <h1 className='createdby'>Created By : {formData.creatorusername}</h1>
                        {formData.creatorpic && <img src={formData.creatorpic} className='imgcreator' alt='Creator' />}
                        <h1 className='infomatch'>Field: {formData.field}</h1>
                        <h1 className='infomatch'>Reservation Date: {formData.reservationdate}</h1>
                        <h1 className='infomatch'>Fees: {formData.fees}</h1>
                        <h1 className='infomatch'>Description: {formData.description}</h1>
                        {formData.picfield && <img src={formData.picfield} className='imgfield' alt='Field' />}
                    </div>
                </div>
                <ul className='players'>
                    <h1 className='infomatchh'>Team 1</h1>
                    {formData.team1.map((player, index) => (
                        <li className="playernames" key={index}>*{player.username}</li>
                    ))}
              
                </ul>
                <form onSubmit={(e) => handleSubmit(e, 'team1')}>
                    <button className="joinbtn" type='submit'>Join </button>
                </form>
             
                <ul className='players2'>
                    <h1 className='infomatchh2'>Team 2</h1>
                    {formData.team2.map((player, index) => (
                        <li className="playernames2" key={index}>*{player.username}</li>
                    ))}
           
                </ul>
                <form onSubmit={(e) => handleSubmit(e, 'team2')}>
                    <button className="joinbtn2" type='submit'>Join </button>
                </form>

            </div>
        </>
    );
};

export default MatchInfo;

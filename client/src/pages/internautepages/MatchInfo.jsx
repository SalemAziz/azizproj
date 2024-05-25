import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import NavUser from '../../components/usercomp/NavUser';
import "./pagescss/matchinfo.css"




const MatchInfo = () => {
   
    const { matchId } = useParams();
    const [publishError, setPublishError] = useState(null);
    const [formData, setFormData] = useState({ players: [] }); // Initialize formData with an empty players array
    const { currentUser } = useSelector((state) => state.user);


    useEffect(() => {
        try {
            const fetchMatch = async () => {
                const res = await fetch(`/api/match/getmatch?matchId=${matchId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.matchs[0]);
                }
            };

            fetchMatch();
        } catch (error) {
            console.log(error.message);
        }
    }, [matchId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/match/joinmatch/${matchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify({
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                window.location.reload();;
             return;
            }
            window.location.reload();;

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <NavUser />
            <div className='matchattrib'>
                <div className='matchinfo'>
                    <div>
                    <h1 className='ffieldname'> {formData.matchname} </h1>
                    <h1 className='createdby'>Created by {formData.creatorusername}</h1>
                    <img src={formData.creatorpic} className='imgcreator' />
                    <h1 className='infomatch'>field : {formData.field} </h1>
                    <h1 className='infomatch'>reservationdate : {formData.reservationdate} </h1>
                    <h1 className='infomatch'>fees : {formData.fees} </h1>
                    <h1 className='infomatch'>description : {formData.description}</h1>
                    <img src={formData.picfield} className='imgfield' />
                    </div>
                    <ul className='players'>
                    <h1 className='infomatchh'>players</h1>

                        {formData.players.map((player, index) => (
                            <li className="playernames" key={index}>*{player.username}</li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit}>
                    <button className="joinbtn" type='submit'> join    </button>
                </form>
                </div>
               
            </div>
        </>
    );
};


export default MatchInfo
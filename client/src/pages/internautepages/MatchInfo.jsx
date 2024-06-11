import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavUser from '../../components/usercomp/NavUser';
import './pagescss/matchinfo.css';

const MatchInfo = () => {
    const { matchId } = useParams();
    const [publishError, setPublishError] = useState(null);
    const [formData, setFormData] = useState({ team1: [], team2: [] });
    const [selectedRole, setSelectedRole] = useState('');
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
                body: JSON.stringify({ role: selectedRole }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error(data.message);
                setPublishError(data.message);
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
               
                <div className='teams'>
                {publishError && <p className='error'>{publishError}</p>}
                <div className='teamslect'>
                <select  className="selctroleteam" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value=''>Select Role</option>
                    <option value='goalkeeper'>Goalkeeper</option>
                    <option value='defender'>Defender</option>
                    <option value='midfielder'>Midfielder</option>
                    <option value='striker'>Striker</option>
                </select>
                <div className='teambtnsjoin'>
                <form onSubmit={(e) => handleSubmit(e, 'team1')}>
                        <button className="joinbtn" type='submit'>Join Team 1</button>
                    </form>
                <form onSubmit={(e) => handleSubmit(e, 'team2')}>
                        <button className="joinbtn" type='submit'>Join Team 2</button>
                    </form>
                    
                    </div>
                    </div>
                <div className='teamTables'>
                    <table className='teamTable'>
                        <caption className='caption'>Team 1</caption>
                        <thead className='tabtit'>
                            <tr >
                                <th className='tabtitname'>Player Name</th>
                                <th className='tabtitrole'>Role</th>
                            </tr>
                        </thead>
                        <tbody className='tabtit'>
                            {formData.team1.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.username}</td>
                                    <td>{player.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                
                
                    <table className='teamTable'>
                        <caption className='caption'>Team 2</caption>
                        <thead >
                        <tr >
                        <th >Player Name</th>
                        <th >Role</th>
                            </tr>
                        </thead>
                        <tbody className='tabtit'>
                            {formData.team2.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.username}</td>
                                    <td>{player.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                </div>
            </div>
            <div className='matchinfo'>
                    <div>
                        <h1 className='ffieldname'>{formData.matchname}</h1>
                        <h1 className='createdby'>Created By : {formData.creatorusername}</h1>
                        <h1 className='infomatch'>Field: {formData.field}</h1>
                        <h1 className='infomatch'>Date: {formData.dayofthweek} - {formData.houroflocation}</h1>
                        <h1 className='infomatch'>Fees: {formData.fees}</h1>
                        <h1 className='infomatch'>Description: {formData.description}</h1>
                        {formData.picfield && <img src={formData.picfield} className='imgfield' alt='Field' />}
                    </div>
                </div>
            </div>
            

        </>
    );
};

export default MatchInfo;

import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../../components/dash/DashSidebar';
import DashUser from '../../components/dash/DashUser';
import NavUser from '../../components/usercomp/NavUser';
import DashPost from '../../components/dash/DashPost';
import DashMatch from '../../components/dash/DashMatch';

export default function MainAd() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
    <NavUser />

    <div className="mainadsec ">
    <div className='classnaem'>
   
    <DashSidebar />
    </div>
    <div>
   
    {tab === 'User' && <DashUser />}
    {tab === 'Posts' && <DashPost />}
    {tab === 'Matchs' && <DashMatch />}
    </div>
  </div>
  </>
  )
}

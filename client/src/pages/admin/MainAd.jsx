import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../../components/dash/DashSidebar';
import DashUser from '../../components/dash/DashUser';
import DashPost from '../../components/dash/DashPost';
import DashMatch from '../../components/dash/DashMatch';
import DashboardComp from '../../components/dash/DashboardComp';
import DashField from '../../components/dash/DashField';
import DashCreatf from '../../components/dash/DashCreatf';


import "../admin/mainad.css"

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
   
    <div className='postionnn'>
    <div className='classnaem flex'>
   
    <DashSidebar />
    </div>
    <div className='aa grid'>
    {tab === 'Stat' && <DashboardComp />}
    {tab === 'User' && <DashUser />}
    {tab === 'Posts' && <DashPost />}
    {tab === 'Matchs' && <DashMatch />}
    {tab === 'Fields' && <DashField />}
    {tab === 'Collab' && <DashCreatf />}

    
    </div>
    </div>
  </>
  
  )
}

import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../../components/dash/DashSidebar';
import DashProfile from '../../components/dash/DashProfile';
import NavUser from '../../components/usercomp/NavUser';
import DashPost from '../../components/dash/DashPost';

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

    <div className="min-h-screen flex flex-col md:flex-row">
    <div className='md:w-56'>
   
      
    </div>
    <DashSidebar />
    {tab === 'profile' && <DashProfile />}
    {tab === 'Posts' && <DashPost />}
  </div>
  </>
  )
}

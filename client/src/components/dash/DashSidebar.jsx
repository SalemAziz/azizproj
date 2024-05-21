import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./dashside.css"
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/user/userSlice';
import { MdPostAdd } from "react-icons/md";
import { GiSoccerBall } from "react-icons/gi";
import { TbSoccerField } from "react-icons/tb";








export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  const handleSignOut = async () => {
    try {
        await fetch('/api/auth/signout');
        dispatch(signOut())
    } catch (error) {
        console.log(error);
    }
};


  return (
    <div className="sidsection">
      <div className="sidebaritems">
      
        <div className="sidebaritemgroup">
          <Link to='/mainad?tab=User'>
            <div className={`sidebaritem ${tab === 'User' ? 'active' : ''}`}>
              <HiUser className="sidebaricon" />
              <span className="sidebarlabel">Users</span>
            </div>
          </Link>
          <Link to='/mainad?tab=Posts'>
            <div className={`sidebaritem ${tab === 'Posts' ? 'active' : ''}`}>
              <MdPostAdd className="sidebaricon" />
              <span className="sidebarlabel">Posts</span>
            </div>
          </Link>
          <Link to='/mainad?tab=Matchs'>
            <div className={`sidebaritem ${tab === 'Matchs' ? 'active' : ''}`}>
              <GiSoccerBall className="sidebaricon" />
              <span className="sidebarlabel">Matchs</span>
            </div>
          </Link>
          <Link to='/mainad?tab=Fields'>
            <div className={`sidebaritem ${tab === 'Fields' ? 'active' : ''}`}>
              <TbSoccerField className="sidebaricon" />
              <span className="sidebarlabel">Fields</span>
            </div>
          </Link>
          <div className="sidebaritem cursor-pointer">
            <HiArrowSmRight className="sidebaricon" />
            <span onClick={handleSignOut} className="sidebarlabel">SignOut</span>
          </div>
        </div>
      </div>
    </div>
  );
}

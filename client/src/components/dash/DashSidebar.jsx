import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./dashside.css"
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/user/userSlice';





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
          <Link to='/mainad?tab=profile'>
            <div className={`sidebaritem ${tab === 'profile' ? 'active' : ''}`}>
              <HiUser className="sidebaricon" />
              <span className="sidebarlabel">Profile</span>
            </div>
          </Link>
          <Link to='/mainad?tab=Posts'>
            <div className={`sidebaritem ${tab === 'Posts' ? 'active' : ''}`}>
              <HiUser className="sidebaricon" />
              <span className="sidebarlabel">Posts</span>
            </div>
          </Link>
          <Link to='/mainad?tab=profile'>
            <div className={`sidebaritem ${tab === 'profile' ? 'active' : ''}`}>
              <HiUser className="sidebaricon" />
              <span className="sidebarlabel">Profile</span>
            </div>
          </Link>
          <Link to='/mainad?tab=profile'>
            <div className={`sidebaritem ${tab === 'profile' ? 'active' : ''}`}>
              <HiUser className="sidebaricon" />
              <span className="sidebarlabel">Profile</span>
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

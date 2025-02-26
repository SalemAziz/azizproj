import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./dashside.css"
import { useSelector, useDispatch } from 'react-redux';
import { IoIosPersonAdd } from "react-icons/io";
import { MdPostAdd } from "react-icons/md";
import { GiSoccerBall } from "react-icons/gi";
import { TbSoccerField } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { FaComment  } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";



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
  



  return (
    <div className="sidsection ">
      <div className="sidebaritems">

        <div className="sidebaritemgroup">
          <Link to='/account'>
        <div>
          <img src={currentUser.profilePicture} className='imgproff' />
        </div>
        </Link>
        <Link to='/mainad?tab=Stat'>
            <div className={`sidebaritem ${tab === 'Stat' ? 'active' : ''}`}>
              <HiUser className="sidebaricon" />
              <span className="sidebarlabel">Stat</span>
            </div>
          </Link>
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
       
          <Link to='/mainad?tab=calls'>
            <div className={`sidebaritem ${tab === 'calls' ? 'active' : ''}`}>
              <FaWpforms    className="sidebaricon" />
              <span className="sidebarlabel">calls</span>
            </div>
          </Link>
          <Link to='/mainad?tab=Collab'>
            <div className={`sidebaritem ${tab === 'Collab' ? 'active' : ''}`}>
              <IoCreate className="sidebaricon" />
              <span className="sidebarlabel">collab</span>
            </div>
          </Link>
          <Link to='/mainad?tab=AddUser'>
            <div className={`sidebaritem ${tab === 'AddUser' ? 'active' : ''}`}>
              <IoIosPersonAdd className="sidebaricon" />
              <span className="sidebarlabel">Add User</span>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

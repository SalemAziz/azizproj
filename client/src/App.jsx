import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/internautepages/Profile';
import Demande from './pages/internautepages/Demande';  
import './index.css'
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteA from './components/PrivateRouteA';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';

import PostPage from './pages/internautepages/PostPage';
import MatchPage from './pages/internautepages/MatchPage';
import MatchInfo from './pages/internautepages/MatchInfo';
import MainAd from './pages/admin/MainAd';
import Acount from './pages/Acount';
import Fields from './pages/internautepages/Fields';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route element={<PrivateRouteA/>}>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/demande' element={<Demande />} />

        </Route>
        <Route element={<PrivateRoute />}>
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/account' element={<Acount />} />
        <Route path='/fields' element={<Fields />} />
        <Route path='/postpage' element={<PostPage />} />
        <Route path='/matchpage' element={<MatchPage />} />

        <Route path='/matchinfo/:matchId' element={<MatchInfo />} />
        <Route element={<PrivateRouteAdmin />}>

        <Route path='/mainad' element={<MainAd />} />

        </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Demande from './pages/Demande';  
import './index.css'
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteA from './components/PrivateRouteA';
import PostPage from './pages/PostPage';
import MatchPage from './pages/MatchPage';
import ManagePost from'./pages/ManagePost';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route element={<PrivateRouteA/>}>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/demande' element={<Demande />} />
        <Route path='/postpage' element={<PostPage />} />
        <Route path='/matchpage' element={<MatchPage />} />
        <Route path='/managepost' element={<ManagePost />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
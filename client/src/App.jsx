import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AcountH from './pages/AcountH';  
import './index.css'
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteA from './components/PrivateRouteA';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route element={<PrivateRouteA/>}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/acounth' element={<AcountH />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import './App.css'

import SpotifyLink from './components/SpotifyLink';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Chat from './components/Chat';
import AllChats from './components/AllChats';
import Profile from './components/Profile';
import Artists from './components/Artists';
import Playlist from './components/Playlist';
import Tracks from './components/Tracks';

// import Cookies from 'universal-cookie'
import { Route, Routes } from "react-router-dom"
// const cookie = new Cookies();
import LoginOrSignup from './components/LoginOrSignup';


const code = new URLSearchParams(window.location.search).get('code');

function App() {
  // const user = useSelector((state) => state.user.user);
  // const dbUser = cookie.get('auth-token');
  // console.log('USER:', user);
  // console.log('DB USER:', dbUser);
  // console.log('CODE:', code);
  // return (
  //   <>
  //   { }
  //   {code ? <Dashboard code={code}/>:(!user ? <Signup/>: <SpotifyLink/>)}

  //   </>
  // )

  return (
    <Routes>
      <Route path="/" element={<LoginOrSignup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/link" element={<SpotifyLink />} />
      <Route path="/dashboard" element={<Dashboard code={code} />}>
        <Route path='profile' element={<Profile/>}/>
        <Route path='artists' element={<Artists/>}/>
        <Route path='tracks' element={<Tracks/>}/>
        <Route path='playlist' element={<Playlist/>}/>
        <Route path='all' element= {<AllChats />} >
          <Route path="chat/:receiverUID" element={<Chat />} />
        </Route>
      </Route>
  </Routes>
  )
}

export default App

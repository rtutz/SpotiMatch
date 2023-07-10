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
import IndividualPlaylist from './components/IndividualPlaylist';
import IndividualTrack from './components/IndividualTrack';
import IndividualArtist from './components/IndividualArtist';

// import Cookies from 'universal-cookie'
import { Route, Routes } from "react-router-dom"
// const cookie = new Cookies();
import LoginOrSignup from './components/LoginOrSignup';

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  console.log('auth token in app (parent component) :', code);

  return (
    <Routes>
      <Route path="/" element={<LoginOrSignup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/link" element={<SpotifyLink />} />
      <Route path="/dashboard" element={<Dashboard  />}>
        <Route path='profile' element={<Profile authToken={code} />}/>
        <Route path='artists' element={<Artists/>}/>
        <Route exact path='tracks' element={<Tracks authToken={code}/>}/>
        <Route path='tracks/:id' element={<IndividualTrack />} />

        <Route path='artists/:id' element={<IndividualArtist authToken={code} />} />
        {/* <Route path='playlist' element={<Playlist/>}>
          <Route path=':id' element={<IndividualPlaylist />} />

        </Route> */}
        <Route exact path='playlist' element={<Playlist/>} />
        <Route path='playlist/:id' element={<IndividualPlaylist />} />
         

        <Route path='all' element= {<AllChats />} >
          <Route path="chat/:receiverUID" element={<Chat authToken={code} />} />
        </Route>
      </Route>
  </Routes>
  )
}

export default App

import './App.css'
import SpotifyLink from './components/SpotifyLink';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';
import Signup from './components/Signup';
import Cookies from 'universal-cookie'
const cookie = new Cookies();
// import LoginOrSignup from './components/LoginOrSignUp';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const user = useSelector((state) => state.user.user);
  const dbUser = cookie.get('auth-token');
  console.log('USER:', user);
  console.log('DB USER:', dbUser);
  console.log('CODE:', code);
  return (
    <>
    { }
    {code ? <Dashboard code={code}/>:(!user ? <Signup/>: <SpotifyLink/>)}

    </>
  )
}

export default App

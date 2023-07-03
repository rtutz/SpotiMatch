import './App.css'
// import SpotifyLink from './components/SpotifyLink';
// import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';
import Signup from './components/Signup';
// import LoginOrSignup from './components/LoginOrSignUp';

// const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <>
    {!user && <Signup/>}
    {/* {code ? <Dashboard code={code}/> :<SpotifyLink/> } */}
    </>
  )
}

export default App

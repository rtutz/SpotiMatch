import './App.css'
import SpotifyLink from './components/SpotifyLink';
import Dashboard from './components/Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <>
    {code ? <Dashboard code={code}/> :<SpotifyLink/> }
    </>
  )
}

export default App

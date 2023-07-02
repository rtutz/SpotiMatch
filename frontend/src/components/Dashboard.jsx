import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';

// This serves as the whole Dashboard after logging in.
// eslint-disable-next-line react/prop-types
function Dashboard({ code }) {
    const accessToken = useAuth(code);
    
    return (
        <>
        <h1>{accessToken}</h1>
        </>
    )
}

export default Dashboard;
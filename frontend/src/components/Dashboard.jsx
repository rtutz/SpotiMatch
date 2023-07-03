import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import { setAccessToken } from '../features/accessTokenSlice';

// This serves as the whole Dashboard after logging in.
// eslint-disable-next-line react/prop-types
function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const dispatch = useDispatch();
    dispatch(setAccessToken(accessToken));

    const spotifyApi = new SpotifyWebApi({
        clientId: '631b762d9a804f58ab171d8e7eb15ef0'
    });
    
    // This is just for testing purposes. Remove later
    if (accessToken) {
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(data => {
            console.log(data.body);
        })

        spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK').then(data => {console.log(data.body)});
    }

    return (
        <>
        <h1>{accessToken}</h1>
        </>
    )
}

export default Dashboard;
import axios from 'axios';


export const getProfileData = async (accessToken) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        let fData = {};
        const data = await axios.get('https://api.spotify.com/v1/me', config);
        fData.currUserProfile = data.data;

        const following = await axios.get('https://api.spotify.com/v1/me/following?type=artist', config);
        fData.following = following.data;

        const topArtists = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=10', config);
        fData.topArtists = topArtists.data;

        const topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', config);
        fData.topTracks = topTracks.data;

        const playlists = await axios.get('https://api.spotify.com/v1/me/playlists', config);
        fData.playlists = playlists.data;

        return fData
        
    } catch (e) {
        console.log('API ERROR', e)
    }
};

export const getTopTracks = async (accessToken, time_range) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    try {
        let fData = {};
        const topTracks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}`, config);
        fData.topTracks = topTracks.data;

        return fData;
    } catch (e) {
        console.log('API ERROR', e)
        return e;
    }

    
}
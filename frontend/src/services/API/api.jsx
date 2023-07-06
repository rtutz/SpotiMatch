import axios from 'axios';


export const getProfileData = async (accessToken) => {
    console.log('accesstoken', accessToken);
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        let fData = {};
        const data = await axios.get('https://api.spotify.com/v1/me', config);
        fData.currUserProfile = data.data;

        const following = await axios.get('https://api.spotify.com/v1/me/following?type=artist', config);
        fData.following = following.data;

        const topArtists = await axios.get('https://api.spotify.com/v1/me/top/artists', config);
        fData.topArtists = topArtists.data;

        const topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks', config);
        fData.topTracks = topTracks.data;

        return fData
        
    } catch (e) {
        console.log('API ERROR', e)
    }
}

export const getFollowing = (accessToken) => {
    console.log('IN GET FOLLOWING', accessToken);
    axios.get('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    })
    .then(response => {
        console.log('success', response);
    })
    .catch(error => {
        console.log('error');
        console.error('Error:', error);
    });
}
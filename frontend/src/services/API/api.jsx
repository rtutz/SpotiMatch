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

        const topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50', config);
        fData.topTracks = topTracks.data;

        const playlists = await axios.get('https://api.spotify.com/v1/me/playlists', config);
        fData.playlists = playlists.data;

        return fData
        
    } catch (e) {
        
        console.error(e);
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
        
    }
};

export const getPlaylists = async (accessToken) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        let fData = {};
        const playlists = await axios.get(`https://api.spotify.com/v1/me/playlists`, config);
        fData.playlists = playlists.data;

        return fData;
    } catch (e) {
        

    }
};

export const getIndividualArtist = async (accessToken, artistId) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        let fData = {};
        const individualArtist = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, config);
        fData.individualArtist = individualArtist.data;

        return fData;
    } catch (e) {
        

    }   
}

export const getIndividualTrack = async (accessToken, trackId) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        let fData = {};
        const individualTrack = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, config);
        fData.individualTrack = individualTrack.data;

        return fData;
    } catch (e) {
        

    }   
};

export const getTrackAnalysis = async (accessToken, trackId) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        let fData = {};
        const trackAnalysis = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, config);
        fData.trackAnalysis = trackAnalysis.data;

        return fData;
    } catch (e) {
        

    }   
};

export const getIndividualPlaylist = async (accessToken, playlistId) => {
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        let fData = {};
        const playlistData = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, config);
        fData.playlistData = playlistData.data;

        return fData;
    } catch (e) {
        

    }   
};

export const calculateCompatability = async (playlist1URL, playlist2URL, accessToken) => {
    
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        const playlist1Data = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${playlist1URL}`, config);

        const playlist2Data = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${playlist2URL}`, config);

        

        const calculatedScore = await axios.post('http://localhost:3000/calculate', {playlist1: playlist1Data.data, playlist2: playlist2Data.data});
        

        return calculatedScore.data


    } catch(e) {
        
        console.error(e)
    }
    // const result = await axios.post('http://localhost:3000/calculate', {playlist1, playlist2});
    // 
    // return result;
}
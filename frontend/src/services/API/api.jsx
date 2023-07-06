import axios from 'axios';


export const getProfilePicture = async (accessToken) => {
    console.log('accesstoken', accessToken);
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    try {
        return await axios.get('https://api.spotify.com/v1/me', config)
    } catch (e) {
        console.log(e)
    }
}
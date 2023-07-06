import { useEffect } from "react";
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { getProfileData } from "../services/API/api";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() { 
    const code = new URLSearchParams(window.location.search).get('code');
    const tempAccessToken = useSelector((state) => state.accessToken);

    useAuth(code);

    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!tempAccessToken) return;
        getProfileData(tempAccessToken).then(data => {
            if (!data) throw new Error();
            setProfileData(data);
        }).catch(e => {
            console.error(e)
            localStorage.clear();
            navigate('/');
        })
        // const fetchData = async () => {
        //     if (!tempAccessToken) return;
        //     try {
        //         const profileName = await getProfileData(tempAccessToken);
        //         const following = await getFollowing(tempAccessToken)
        //         // WHY DO I HAVE THIS IF STATEMENT??????????????????????
        //         // if (!profileName || !following) throw new Error();
        //         setProfileData(profileName.data);
        //         console.log(profileName.data);
        //         console.log(following);
        //     } catch (e) {
        //         console.error(e);
        //         localStorage.clear();
        //         return <Navigate to='/'/>
        //     }
        // }
        // fetchData();
    }, [tempAccessToken]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    
    if (profileData) {
        console.log('PROFILE', profileData);
        return (
            <div className="container" id="container">
            <div className="w-full flex justify-center items-center" id="header">

                <div className="flex flex-col justify-center items-center">
                    <img src={profileData.currUserProfile.images[1].url} alt="" className="object-cover h-40 w-40 rounded-full" />
                    <h1 className="font-spotify font-black mt-10 text-5xl">{profileData.currUserProfile.display_name}</h1>


                    <div className="flex justify-evenly w-full m-6" id="follow">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-spotify-green font-black text-xl">{profileData.currUserProfile.followers.total}</h3>
                            <p className="text-gray-200-spotify text-xs tracking-wider">FOLLOWERS</p>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-spotify-green font-black text-xl">{profileData.following.artists.total}</h3>
                            <p className="text-gray-200-spotify text-xs tracking-wider">FOLLOWING</p>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-spotify-green font-black text-xl">{profileData.playlists.total}</h3>
                            <p className="text-gray-200-spotify text-xs tracking-wider">PLAYLISTS</p>
                        </div>
                    </div>

                    <button onClick={handleLogout}>
                        LOGOUT
                    </button>
                </div>

                
                
            </div>
            </div>
    )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}

// let data = []
//         const profile = await axios.get('https://api.spotify.com/v1/me', config)
//         data.push(profile.data);
//         const following = await axios.get('https://api.spotify.com/v1/me/following?type=artist', config);
//         data.push(following.data);
//         return data;
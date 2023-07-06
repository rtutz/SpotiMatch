import { useEffect } from "react";
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { getProfileData } from "../services/API/api";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { Navigate } from "react-router-dom";


export default function Profile() { 
    const code = new URLSearchParams(window.location.search).get('code');
    const tempAccessToken = useSelector((state) => state.accessToken);

    useAuth(code);

    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (!tempAccessToken) return;
        getProfileData(tempAccessToken).then(data => {
            if (!data) throw new Error();
            setProfileData(data);
        }).catch(e => {
            console.error(e)
            localStorage.clear();
            return <Navigate to='/'/>
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
    }, [tempAccessToken])

    
    if (profileData) {
        console.log('PROFILE', profileData);
        return (
            <div className="container" id="container">
            <div className="w-full flex justify-center items-center" id="header">

                <div className="flex flex-col justify-center items-center">
                    <img src={profileData.currUserProfile.images[1].url} alt="" className="object-cover h-40 w-40 rounded-full" />
                    <h1 className="font-spotify font-black mt-10 text-4xl">{profileData.currUserProfile.display_name}</h1>


                    <div className="" id="follow">
                        <h3>{profileData.currUserProfile.followers.total}</h3>
                    </div>
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
import { useEffect } from "react";
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { getProfilePicture } from "../services/API/api";
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
        getProfilePicture(tempAccessToken).then(data => {
            if (!data) throw new Error();
            setProfileData(data.data)
        }).catch(e => {
            console.log('in profile use effect error handling');
            console.error(e)
            localStorage.clear();
            return <Navigate to='/'/>
        })
    }, [tempAccessToken])

    if (profileData) {
        console.log(profileData);
        return (
            <>
            <div className="relative">
                <img src={profileData.images[1].url} alt="" className="object-cover h-40 w-40 rounded-full" />
                <h1 className="font-spotify font-black">{profileData.display_name}</h1>
            </div>
            </>
    )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}
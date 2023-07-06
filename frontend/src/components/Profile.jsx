import { useEffect } from "react";
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { getProfilePicture } from "../services/API/api";
import { useSelector } from 'react-redux';
import { useState } from "react";


export default function Profile() { 
    const code = new URLSearchParams(window.location.search).get('code');
    const tempAccessToken = useSelector((state) => state.accessToken);

    useAuth(code);

    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (!tempAccessToken) return;

        getProfilePicture(tempAccessToken).then(data => {
            console.log(data.data);
            setProfileData(data.data)
        }).catch(e => {
            console.error(e);
        })
    }, [tempAccessToken])

    if (profileData) {
        console.log(profileData);
        return (
            <>
                <div>
                    <h1>Test</h1>
                    <img src={profileData.images[1].url} alt="" />
                </div>
            </>
    )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}
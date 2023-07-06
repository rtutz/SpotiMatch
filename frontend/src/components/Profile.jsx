import { useEffect } from "react";
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { getProfileData } from "../services/API/api";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from '../assets/Loading';


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
            <div className="container flex-col" id="container">
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

                        <button onClick={handleLogout} className="btn">
                            LOGOUT
                        </button>   
                        
                        
                    </div>
                </div>

                <div className="flex w-full my-10" id='columns'>
                    <div className="w-1/2 pr-4 flex flex-col">
                        <div className="flex justify-between items-center py-6">
                            <h1 className="text-xl">Top Artists of All Time</h1>

                            <button className="btn">
                            SEE MORE
                            </button> 
                        </div>
            
                        {profileData.topArtists.items.map(artist => {
                            return (
                                <div key={artist.images[2].url} className="flex items-center pb-6" id="row item">
                            <img className="w-14 mr-8 rounded-full"src={artist.images[2].url} alt="" />
                            <h1>{artist.name}</h1>
                    </div>
                        )
                    })}
                        
                    </div>
                    <div className="w-1/2 pl-4 flex flex-col">
                        <div className="flex justify-between items-center py-6">
                            <h1 className="text-xl">Top Tracks of All Time</h1>

                            <button className="btn">
                            SEE MORE
                            </button> 
                        </div>
            
                        {profileData.topTracks.items.map(track => {
                            return (
                                <div key={track.name} className="flex items-center pb-6" id="row item">
                            <img className="w-14 mr-8 rounded-full"src={track.album.images[2].url} alt="" />
                            <h1>{track.name}</h1>
                    </div>
                        )
                    })}
                        
                    </div>
                </div>
            </div>
    )
    } else {
        return (
            <Loading />
        )
    }
}
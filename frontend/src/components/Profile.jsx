import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getProfileData } from "../services/API/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from '../assets/Loading';
import {auth} from '../services/firebase/config'
import { getFirestore, doc, updateDoc } from "firebase/firestore";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';


export default function Profile({authToken}) { 

    const tempAccessToken = useAuth(authToken);


    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!tempAccessToken) return;
        getProfileData(tempAccessToken).then(data => {
            console.log(data);
            if (!data) return;
            setProfileData(data);

            // set data on database
            const uid = auth.currentUser.uid;
            const db = getFirestore();
            const docRef = doc(db, "users", uid);
            updateDoc(docRef, {
                spotify: {
                    currUserProfile: data.currUserProfile,
                    topTracks: data.topTracks
                }
            })
            

        }).catch(e => {
            console.error(e)
            localStorage.clear();
            navigate('/');
        });



    }, [tempAccessToken, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    
    if (profileData) {
        return (
            <div className="container flex-col" id="container">
                <div className="w-full flex justify-center items-center" id="header">

                    <div className="flex flex-col justify-center items-center">
                        <div className="relative">
                        <img src={profileData.currUserProfile.images[1].url} alt="" className="object-cover h-40 w-40 rounded-full" />
                        
                        </div>
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
                    <div className="w-1/2 pr-8 flex flex-col">
                        <div className="flex justify-between items-center py-6">
                            <h1 className="text-xl">Top Artists of All Time</h1>

                            <button className="btn">
                            SEE MORE
                            </button> 
                        </div>
            
                        {profileData.topArtists.items.map(artist => {
                    return (
                        <div key={artist.images[2].url} className="flex items-center pb-6 group" onClick={() => {navigate(`/dashboard/artists/${artist.id}`)}} id="row item">
                        <div className="relative">
                            <img className="w-14 rounded-full" src={artist.images[2].url} alt="" />
                            <div className="opacity-0 bg-black w-full h-full absolute top-0 rounded-full group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                            <FontAwesomeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" icon={faInfo} />
                        </div>
                        <h1 className="ml-8">{artist.name}</h1>
                        </div>
                    );
                    })}

                        
                    </div>
                    <div className="w-1/2 pl-8 flex flex-col">
                        <div className="flex justify-between items-center py-6">
                            <h1 className="text-xl">Top Tracks of All Time</h1>

                            <button className="btn">
                            SEE MORE
                            </button> 
                        </div>
            
                        {/* {profileData.topTracks.items.map(track => {
                            return (
                                <div key={track.name} className="flex items-center pb-6" id="row item">
                            <img className="w-14 mr-8 rounded-full"src={track.album.images[2].url} alt="" />
                            <h1>{track.name}</h1>
                                </div>
                            )
                            })} */}

                    {profileData.topTracks.items.slice(0, 10).map(track => {
                    return (
                        <div key={track.name} onClick={() => {navigate(`/dashboard/tracks/${track.id}`)}} className="flex items-center pb-6 group" id="row item">
                        <div className="relative">
                            <img className="w-14 rounded-full" src={track.album.images[2].url} alt="" />
                            <div className="opacity-0 bg-black w-full h-full absolute top-0 rounded-full group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                            <FontAwesomeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" icon={faInfo} />
                        </div>
                        <h1 className="ml-8">{track.name}</h1>
                        </div>
                    );
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
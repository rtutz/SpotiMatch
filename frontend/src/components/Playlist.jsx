import { useEffect, useState } from "react"
import { getPlaylists } from "../services/API/api";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from '../assets/Loading'
import useAuth from "../hooks/useAuth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export default function Playlist({ authToken }) {
    const accessToken = useAuth(authToken);
    const [playlistsData, setPlaylistsData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) return;
        getPlaylists(accessToken).then(data => {
            if (!data) throw new Error('Error in API request');
            setPlaylistsData(data);
        }).catch(e => {
            localStorage.clear();
            navigate('/');
            console.error(e);
            return (
            <div>
                <h1>An error has been encountered. Please login again.</h1>
                <button className="btn-green" onClick={() => navigate('/')}>
                    Go Home
                </button>
            </div>
            )
            
        })
    }, [accessToken]);

    if (playlistsData) {
        return (
            <div className="container mb-10">
                <h1 className="font-black text-2xl mb-8">Top Tracks</h1>
                <div className="grid grid-cols-4 grid-rows-5 w-full gap-5" style={{ alignItems: 'start' }}>

                    {playlistsData.playlists.items.map(playlist => {
                        return (
                        <div key = {playlist.href}  onClick={() => {navigate(`/dashboard/playlist/${playlist.id}`)}} className="flex flex-col justify-center items-center group">
                        <div className="relative">
                            <img src={playlist.images[0].url} className="mb-4" alt="" />
                            <div className="opacity-0 bg-black w-full h-full absolute top-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                            <FontAwesomeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" icon={faInfo} size="xl"/>
                        </div>

                        <h2 className="text-center">{playlist.name}</h2>
                        <p className="text-gray-200-spotify text-sm">{playlist.tracks.total} TRACKS</p>
                    </div>
                    )
                    })}
            
                <Outlet/>
                </div>

            </div>
        )

    } else {
        return (
            <Loading/>
        )
    }
}
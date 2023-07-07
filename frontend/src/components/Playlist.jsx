import { useEffect, useState } from "react"
import { getPlaylists } from "../services/API/api";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from '../assets/Loading'
import useAuth from "../hooks/useAuth";

export default function Playlist({ authToken }) {
    const accessToken = useAuth(authToken);
    const [playlistsData, setPlaylistsData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) return;
        getPlaylists(accessToken).then(data => {
            console.log(data);
            if (!data) throw new Error('Error in API request');
            setPlaylistsData(data);
        }).catch(e => {
            console.error(e)
            localStorage.clear();
            navigate('/');
        })
    }, [accessToken]);

    if (playlistsData) {
        console.log('Playlists', playlistsData);
        return (
            <div className="container mb-10">
                <h1 className="font-black text-2xl mb-8">Top Tracks</h1>
                <div className="grid grid-cols-4 grid-rows-5 w-full gap-5" style={{ alignItems: 'start' }}>

                    {playlistsData.playlists.items.map(playlist => {
                        return (
                        <div key = {playlist.href} className="flex flex-col justify-center items-center">
                        <img src={playlist.images[0].url} className="mb-4" alt="" />

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
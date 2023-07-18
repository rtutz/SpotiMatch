import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getIndividualPlaylist } from "../services/API/api";
import Loading from '../assets/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


export default function IndividualPlaylist({authToken}) {
    const accessToken = useAuth(authToken);
    const playlistId = useParams().id;
    const [playlistData, setPlaylistData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (!accessToken) return;
            getIndividualPlaylist(accessToken, playlistId).then( data => {
                setPlaylistData(data.playlistData);
            }, [accessToken])
        } catch (e) {
            console.error(e);
            return (
            <div>
                <h1>An error has been encountered. Please login again.</h1>
                <button className="btn-green" onClick={() => navigate('/')}>
                    Go Home
                </button>
            </div>
            )
        }

    }, [accessToken, playlistId])

    if (playlistData) {
        console.log('playlistData', playlistData);
    
        return (
            <div className="container">
            <div className="flex justify-evenly">
                <div className="flex flex-col">
                    <img className="w-80"src={playlistData.images[0].url} alt="" />
                    <div className="flex flex-col space-y-2 mt-8">
                        <h1 className="text-4xl font-black">{playlistData.name}</h1>
                        <h1 className="font-bold text-2xl text-gray-200-spotify w-96">by {playlistData.owner.display_name}</h1>
                        <h1 className="text-gray-200-spotify  w-96">{playlistData.description}</h1>
                        <a href={playlistData.external_urls.spotify}  target="_blank" rel="noreferrer">
                        <div className="btn-green w-min" style={{"marginTop": "1.5rem"}}>
                            PLAY ON SPOTIFY
                        </div>
                        </a>
                    </div>
                </div>


                

                <div className="w-full">
                    <div className="flex flex-col h-20 w-full mb-20">

                        {playlistData.tracks.items.map(track => {
                            return (
                            <div key={track.track.external_ids.isrc}  onClick={() => {navigate(`/dashboard/tracks/${track.track.id}`)}}className="flex justify-between items-center pb-8 group">
                                <div className="flex items-center">
                                    <div className="relative">
                                    <img className="" src={track.track.album.images[2].url} alt="" />
                                    <div className="opacity-0 bg-black w-full h-full absolute top-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                                <FontAwesomeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" icon={faInfo} />
                            </div>

                                    <div className="flex flex-col ml-5">
                                        <h3 className="font-medium text-base">{track.track.name}</h3>
                                        <p className="font-normal text-gray-200-spotify text-sm">{(() => {
                                            const artistsName = track.track.artists.map(artist => artist.name);
                                            return artistsName.join(', ') + " • " + track.track.album.name

                                        })()}</p>
                                    </div>
                                </div>

                                <p className="font-normal text-gray-200-spotify text-sm">{new Date(track.track.duration_ms).toISOString().substr(14, 5)}</p>
                            </div>
                            )
                        })}


                    </div>
                </div>
               
            </div>
        </div>
        )
    } else {
        return <Loading />
    }
}
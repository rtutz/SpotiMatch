import { useEffect, useState } from "react"
import { getTopTracks } from "../services/API/api";
import { useNavigate } from "react-router-dom";
import Loading from '../assets/Loading'
import useAuth from "../hooks/useAuth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';


export default function Tracks({authToken}) {
    // const accessToken = useSelector((state) => state.accessToken);
    const accessToken = useAuth(authToken);
    // console.log('Ran useAuth in Tracks. ACCESS TOKEN RECEIVED FROM HOOK: ', accessToken);
    const [topTracksData, setTopTracksData] = useState(null);
    const [activeButton, setActiveButton] = useState([1, 'long_term']);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) return;
        getTopTracks(accessToken, activeButton[1]).then(data => {
            if (!data) throw new Error('Error in API request');
            setTopTracksData(data);
        }).catch(e => {
            console.error(e)
            localStorage.clear();
            navigate('/');
        })
    }, [accessToken, activeButton])

    if (topTracksData) {
        return (
            <div className="container mb-10">
                <div className="flex justify-between items-center mb-8" id="header">
                    <h1 className="font-black text-2xl">Top Tracks</h1>

                    <div className="">
                        <button onClick={() => setActiveButton([1, 'long_term']) }className={activeButton[0] === 1 ? "ml-4 text-base font-black border-b" : "ml-4 text-base text-gray-200-spotify" }>
                            All time
                        </button>

                        <button onClick={() => {setActiveButton([2, 'medium_term'])
                        } }className={activeButton[0] === 2 ? "ml-4 text-base font-black border-b" : "ml-4 text-base text-gray-200-spotify" }>
                            Last 6 Months
                        </button>

                        <button onClick={() => setActiveButton([3, 'short_term']) }className={activeButton[0] === 3 ? "ml-4 text-base font-black border-b" : "ml-4 text-base text-gray-200-spotify" }>
                            Last 4 Weeks
                        </button>
                    </div>
                </div>

                <div className="flex flex-col h-20 w-full mb-20">

                    {topTracksData.topTracks.items.map(track => {
                        return (
                        <div key={track.external_ids.isrc}  onClick={() => {navigate(`/dashboard/tracks/${track.id}`)}}className="flex justify-between items-center pb-8 group">
                            <div className="flex items-center">
                                <div className="relative">
                                <img className="" src={track.album.images[2].url} alt="" />
                                <div className="opacity-0 bg-black w-full h-full absolute top-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                            <FontAwesomeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" icon={faInfo} />
                        </div>

                                <div className="flex flex-col ml-5">
                                    <h3 className="font-medium text-base">{track.name}</h3>
                                    <p className="font-normal text-gray-200-spotify text-sm">{(() => {
                                        const artistsName = track.artists.map(artist => artist.name);
                                        return artistsName.join(', ') + " • " + track.album.name

                                    })()}</p>
                                </div>
                            </div>

                            <p className="font-normal text-gray-200-spotify text-sm">{new Date(track.duration_ms).toISOString().substr(14, 5)}</p>
                        </div>
                        )
                    })}

                    
                </div>

                
                    
            </div>
        )
    } else {
        return (
            <Loading/>
        )
    }
}
import { useEffect, useState } from "react"
import { getTopTracks } from "../services/API/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from '../assets/Loading'

export default function Tracks() {
    const accessToken = useSelector((state) => state.accessToken);
    const [topTracksData, setTopTracksData] = useState(null);
    const [activeButton, setActiveButton] = useState([1, 'long_term']);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) return;
        getTopTracks(accessToken, activeButton[1]).then(data => {
            console.log(data);
            if (!data) throw new Error('Error in API request');
            setTopTracksData(data);
        }).catch(e => {
            console.error(e)
            localStorage.clear();
            navigate('/');
        })
    }, [accessToken, activeButton])

    if (topTracksData) {
        console.log('TopTracks', topTracksData);
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

                <div className="flex flex-col bg-500-red h-20 w-full mb-20">

                    {topTracksData.topTracks.items.map(track => {
                        return (
                        <div key={track.external_ids.isrc} className="flex justify-between items-center pb-8">
                            <div className="flex items-center">
                                <img className="mr-5"src={track.album.images[2].url} alt="" />

                                <div className="flex flex-col">
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
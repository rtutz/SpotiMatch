import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getIndividualTrack } from "../services/API/api";
import {Bar} from 'react-chartjs-2'
import Loading from '../assets/Loading';

export default function IndividualTrack({authToken}) {
    const accessToken = useAuth(authToken);
    const trackId = useParams().id;
    const [trackData, setTrackData] = useState(null);

    useEffect(() => {
        if (!accessToken) return;
        getIndividualTrack(accessToken, trackId).then( data => {
            setTrackData(data);
        }, [accessToken])

    }, [accessToken, trackId])

    if (trackData) {
    console.log('trackData', trackData);
    return (
        <div className="container">
            <div className="flex">
                <img src={trackData.individualTrack.album.images[1].url} alt="" />
                <div className="flex flex-col space-y-3 ml-8">
                    <h1 className="text-4xl font-black">{trackData.individualTrack.name}</h1>
                    <h1 className="font-bold text-2xl text-gray-200-spotify">{(() => {
                        const artistsName = trackData.individualTrack.artists.map(artist => artist.name);
                        return artistsName.join(', ')
                    })()}</h1>
                    <h1 className="text-gray-200-spotify">{trackData.individualTrack.album.name}  •  {trackData.individualTrack.album.release_date.slice(0,4)}</h1>
                    <a href={trackData.individualTrack.external_urls.spotify}  target="_blank" rel="noreferrer">
                    <div className="btn-green w-min" style={{"marginTop": "1rem"}}>
                        PLAY ON SPOTIFY
                    </div>
                    </a>
                </div>
                
            </div>
        </div>
    )
    } else {
        <Loading />
    }
}
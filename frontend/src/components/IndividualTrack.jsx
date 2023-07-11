import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getIndividualTrack, getTrackAnalysis} from "../services/API/api";
import Loading from '../assets/Loading';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
  

export default function IndividualTrack({authToken }) {
    const accessToken = useAuth(authToken);
    const trackId = useParams().id;
    const [trackData, setTrackData] = useState(null);
    const [trackAnalysis, setTrackAnalysis] = useState(null);

    const labels = ['valence', 'acousticness', 'danceability', 'energy', 'liveness', 'instrumentalness'];
    const options = {
    scales: {
        r: {
        angleLines: {
            color: 'white'
        },
        grid: { 
            color: 'white'
        },
    }
        
    },
    plugins: {
        legend: { display: false },
    },
    };

    useEffect(() => {
        if (!accessToken) return;
        (async () => {
            const dataTrack = await getIndividualTrack(accessToken, trackId);
            setTrackData(dataTrack);
            const analysisTrack = await getTrackAnalysis(accessToken, trackId);
            setTrackAnalysis(analysisTrack)
        })()

    }, [accessToken, trackId])

    if (trackAnalysis) {
        console.log(trackAnalysis.trackAnalysis);
        console.log(labels.map(label => trackAnalysis.trackAnalysis[label]));
    }

    if (trackData && trackAnalysis) {
    return (
        <div className="container">
            <div className="flex justify-evenly">
                <div className="flex flex-col">
                    <img className="w-80"src={trackData.individualTrack.album.images[1].url} alt="" />
                    <div className="flex flex-col space-y-3 mt-8">
                        <h1 className="text-4xl font-black">{trackData.individualTrack.name}</h1>
                        <h1 className="font-bold text-2xl text-gray-200-spotify  w-96">{(() => {
                            const artistsName = trackData.individualTrack.artists.map(artist => artist.name);
                            return artistsName.join(', ')
                        })()}</h1>
                        <h1 className="text-gray-200-spotify  w-96">{trackData.individualTrack.album.name}  •  {trackData.individualTrack.album.release_date.slice(0,4)}</h1>
                        <a href={trackData.individualTrack.external_urls.spotify}  target="_blank" rel="noreferrer">
                        <div className="btn-green w-min" style={{"marginTop": "1rem"}}>
                            PLAY ON SPOTIFY
                        </div>
                        </a>
                    </div>
                </div>
                <div className="w-full">
                    <Radar data={
                        {
                        labels: labels,
                        datasets: [
                        {
                            label: 'Track Analysis',
                            data: labels.map(label => trackAnalysis.trackAnalysis[label]),
                            backgroundColor: 'rgba(30, 215, 96, 0.2)',
                            borderColor: 'rgba(30, 215,96,1)',
                            pointBackgroundColor: 'rgba(30, 215, 96, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(30, 215, 215, 1)',
                            
                            borderWidth: 1,
                        },
                        ],
                    }
                } options={options}/>
                </div>
            </div>
        </div>
    )
    } else {
        <Loading />
    }
}
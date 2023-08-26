import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getIndividualArtist } from "../services/API/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../assets/Loading'


export default function IndividualArtist({authToken}) {
    const accessToken = useAuth(authToken);
    const artistId = useParams().id;
    const [artistData, setArtistData] = useState(null);
    const Navigate = useNavigate;

    useEffect(() => {
        if (!accessToken) return;
        
        getIndividualArtist(accessToken, artistId).then( data => {
            setArtistData(data);
        }).catch(e => {
            console.error(e);
            return (
            <div>
                <h1>An error has been encountered. Please login again.</h1>
                <button className="btn-green" onClick={() => Navigate('/')}>
                    Go Home
                </button>
            </div>
            )
        })

    }, [accessToken, artistId, Navigate])
    
    
    if (artistData) {
        return (
            <div className="container flex justify-center">
            <div className="flex flex-col justify-start items-center">
                <img className="rounded-full" src={artistData.individualArtist.images[1].url} alt="" />

                <h1 className="font-black text-6xl my-8">{artistData.individualArtist.name}</h1>

                <div className="flex justify-evenly items-center" style={{width: '170%'}}> 
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-spotify-green font-bold text-xl">{(() => artistData.individualArtist.followers.total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))()}</h3>
                        <p className="text-gray-200-spotify text-xs tracking-wider">FOLLOWERS</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-spotify-green font-bold text-xl">{artistData.individualArtist.genres.join(', ')}</h3>
                        <p className="text-gray-200-spotify text-xs tracking-wider">GENRES</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-spotify-green font-bold text-xl">{artistData.individualArtist.popularity}%</h3>
                        <p className="text-gray-200-spotify text-xs tracking-wider">POPULARITY</p>
                    </div>


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
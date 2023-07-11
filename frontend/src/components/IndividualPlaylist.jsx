import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

export default function IndividualPlaylist({authToken}) {
    const accessToken = useAuth(authToken);
    const playlistId = useParams().id;
    const [playlistData, setPlaylistData] = useState(null);

    useEffect(() => {
        if (!accessToken) return;
        getIndividualTrack(accessToken, trackId).then( data => {
            setTrackData(data);
        }, [accessToken])

    }, [accessToken, trackId])

    return (
        <h1>INDI PLAYLIST</h1>
    )
}
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import { setAccessToken } from '../features/accessTokenSlice';
import {Link, Outlet} from 'react-router-dom';

import { getFirestore, doc, setDoc } from "firebase/firestore";

import Cookies from 'universal-cookie'
const cookie = new Cookies();

// This serves as the whole Dashboard after logging in.
// eslint-disable-next-line react/prop-types
function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const dispatch = useDispatch();
    const cookieUser = cookie.get('auth-token');
    const uid = cookieUser.uid;

    // Remove later:
    console.log('code', code);

    dispatch(setAccessToken(accessToken));

    const spotifyApi = new SpotifyWebApi({
        clientId: '631b762d9a804f58ab171d8e7eb15ef0'
    });
    
    // This is just for testing purposes. Remove later
    if (accessToken) {
        spotifyApi.setAccessToken(accessToken);

        // Put the spotify data into user account in firebase.
        const db = getFirestore();
        const userDocRef = doc(db, "users", uid);
        setDoc(userDocRef, { spotify: {
            top100: [{}]
        }})
        .then(() => {
            console.log("YouTube link added to user successfully");
        })
            .catch((error) => {
            console.error("Error adding YouTube link to user: ", error);
        });


        // -------------------------------
    }


    return (
        <>
        <h3>Dashboard</h3>
        <button>
            <Link to="/dashboard/chat">Chat</Link>
        </button>
        <Outlet/>
        </>
    )

    // return (
    //     <div>
    //         <h1>Dashboard</h1>
    //     </div>
    // )
}

export default Dashboard;
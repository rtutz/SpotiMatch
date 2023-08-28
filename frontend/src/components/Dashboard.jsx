import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../features/accessTokenSlice';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.svg'
import github from '../assets/github.svg'
import { getFirestore, collection, query, onSnapshot} from "firebase/firestore";
import {setUsers} from '../features/userSlice';
import { useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMusic, faCompactDisc, faComment } from '@fortawesome/free-solid-svg-icons';


function Dashboard({ code }) {

    const accessToken = useAuth(code);
    const dispatch = useDispatch();

    const Navigate = useNavigate();


    useEffect(() => {
        try {
            const db = getFirestore();
        const usersRef = collection(db, "users");
        const queryUsers = query(usersRef);
        onSnapshot(queryUsers, (querySnapshot) => {
            let tempPeople = [];
            querySnapshot.forEach((doc) => {
                tempPeople.push({...doc.data(), id: doc.id});
            });
            dispatch(setUsers(tempPeople));
        })
        } catch (e) {
            console.error(e);
            <div>
            <h1>An error has been encountered. Please login again.</h1>
            <button className="btn-green" onClick={() => Navigate('/')}>
                Go Home
            </button>
        </div>
        }
    }, []);

    dispatch(setAccessToken(accessToken));

    return (    
        <div className='flex flex-1'>
        <div className='min-h-screen w-28'></div>
        <div className='bg-gray-900-spotify h-screen w-28 fixed'>
            <img src={logo} alt="" />
            
            <div>
                <Link to='/dashboard/profile'>
                <div className='text-center'>
                <FontAwesomeIcon icon={faUser} size='xl' className='text-gray-300'/>
                <p>Profile</p>
                </div>
                </Link>



                <Link to='/dashboard/tracks'>
                <div className='text-center'>
                <FontAwesomeIcon icon={faMusic} size='xl' className='text-gray-300'/>
                <p>Top Tracks</p>
                </div>
                </Link>

                <Link to='/dashboard/playlist'>
                <div className='text-center'>
                <FontAwesomeIcon icon={faCompactDisc} size='xl' className='text-gray-300'/>
                <p>Playlist</p>
                </div>
                </Link>

                <Link to='/dashboard/all'>
                <div className='text-center'>
                <FontAwesomeIcon icon={faComment} size='xl' className='text-gray-300'/>
                <p>Chat</p>
                </div>
                </Link>
            </div>

            <Link to='https://github.com/rtutz/SpotiMatch'>
            <img className='mx-auto' src={github} alt="" />
            </Link>


        </div>

        <Outlet/>
        </div>
    )
}

export default Dashboard;
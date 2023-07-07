import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
// import SpotifyWebApi from 'spotify-web-api-node';
import { setAccessToken } from '../features/accessTokenSlice';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.svg'
import github from '../assets/github.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMusic, faCompactDisc, faComment } from '@fortawesome/free-solid-svg-icons';

import Cookies from 'universal-cookie'
const cookie = new Cookies();

// This serves as the whole Dashboard after logging in.
// eslint-disable-next-line react/prop-types
function Dashboard({ code }) {
    const cookieBrowser = cookie.get('auth-token');

    const navigate = useNavigate();

    const accessToken = useAuth(code);
    const dispatch = useDispatch();

    if (!cookieBrowser) {
        navigate('/');
    }
    // const cookieUser = cookie.get('auth-token');
    // const uid = cookieUser.uid;

    dispatch(setAccessToken(accessToken));

    return (
        <div className='flex'>
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

                {/* <Link to='/dashboard/artists'>
                <div className='text-center'>
                <FontAwesomeIcon icon={faMicrophone} size='xl' className='text-gray-300'/>
                <p>Top Artists</p>
                </div>
                </Link> */}

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

            <Link to='https://www.youtube.com/'>
            <img className='mx-auto' src={github} alt="" />
            </Link>


        </div>

        <Outlet/>
        </div>
    )
}

export default Dashboard;
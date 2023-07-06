import { auth } from '../services/firebase/config'
import { signInWithEmailAndPassword  } from 'firebase/auth';
import {useDispatch} from'react-redux';
import { setUser } from '../features/userSlice';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const {uid, email, refreshToken} = userCredentials.user;
            dispatch(setUser({uid, email}))


            // Set cookie so when reload occurs, user is still logged in
            const cookies = new Cookies();
            cookies.set('auth-token', JSON.stringify({uid, email, refreshToken})); 
            navigate('/link');
        }
    ).catch(error => {
        console.log(error);
        window.alert('invalid email or password');
    })

    
    e.target.reset();

    }

    return (
        <>
        <form action="submit" onSubmit={submitLogin}>
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login;
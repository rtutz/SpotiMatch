import { auth } from '../services/firebase/config'
import { signInWithEmailAndPassword  } from 'firebase/auth';
import {useDispatch} from'react-redux';
// import { setUser } from '../features/userSlice';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitLogin = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        cookies.remove('auth-token');

        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            localStorage.clear();
            const {uid, email} = userCredentials.user;
            // dispatch(setUser({uid, email}))


            // Set cookie so when reload occurs, user is still logged in
            console.log('uid in login', uid);
            console.log('email',email);
            localStorage.setItem('curr-user', JSON.stringify({uid, email}))
            // cookies.remove('auth-token');
            // cookies.set('auth-token', JSON.stringify({uid, email, refreshToken})); 
            navigate('/link');
        }
    ).catch(error => {
        console.log(error);
        window.alert('invalid email or password');
    })

    
    e.target.reset();

    }

    return (
        // <>
        // <form action="submit" className='text-black' onSubmit={submitLogin}>
        //     <input type="text" name="email" placeholder="Email" />
        //     <input type="password" name="password" placeholder="Password" />
        //     <button type="submit">Login</button>
        // </form>
        // </>
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <img src={logo} alt="" className='w-52' />
                <h1 className='font-black text-5xl'>SpotiMatch</h1>
                <h1 className='text-3xl tracking-widest'>Connect musically</h1>

                <form action="submit" className='mt-4 text-black flex flex-col space-y-4 items-center' onSubmit={submitLogin}>
                    <input type="text" name="email" placeholder="Email" className='px-1 py-1 w-60 rounded-md'/>
                    <input type="password" name="password" placeholder="Password" className='px-1 py-1 w-60 rounded-md'/>
                    <button type="submit" style={{"marginTop": "2rem"}} className='btn-green max-w-fit'>Login</button>
            </form>
            </div>

        </div>
    )
}

export default Login;
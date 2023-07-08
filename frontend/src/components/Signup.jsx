import { auth } from '../services/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {useDispatch} from'react-redux';
// import { setUser } from '../features/userSlice';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { getFirestore, setDoc, doc } from "firebase/firestore";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitSignup = (e) => {
        e.preventDefault();  

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // const passwordVerify = e.target.passwordVerify.value;

 
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            updateProfile(userCredentials.user,  { displayName: username }).then(() => {console.log('display name added successfully')})
            
            const {uid, email, refreshToken} = userCredentials.user;
            // dispatch(setUser({uid, email}))

            // Set cookie so when reload occurs, user is still logged in
            const cookies = new Cookies();
            cookies.set('auth-token', refreshToken); 

            const db = getFirestore();
            const usersDoc = doc(db, "users", uid); // Use the doc function instead of collection

            setDoc(usersDoc, { uid, email, username})
            .then(() => {
                console.log('Document successfully written!');
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
            });
                            
            }
        ).catch(error => {
            console.log(error);
        });

        
        
        navigate('/link')
        e.target.reset();
    }

    return (
        <>
        <form action="submit" onSubmit={submitSignup} className='text-black'>
            {/* <input type="text" name="username" placeholder="Username" /> */}
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            {/* <input type="password" name="passwordVerify" placeholder="Type password again" /> */}
            <button type="submit">Signup</button>
        </form>
        </>
    )
}

export default Signup;
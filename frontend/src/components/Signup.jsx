import { auth } from '../services/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { getFirestore, setDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import logo from '../assets/logo.svg';

function Signup() {

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

            localStorage.setItem('curr-user', JSON.stringify({uid, email}))

            const db = getFirestore();
            const usersDoc = doc(db, "users", uid);

            onSnapshot(usersDoc, (docSnapshot) => {
            if (docSnapshot.exists()) {
                // Document exists, perform update
                updateDoc(usersDoc, { uid, email, username })
                .then(() => {
                    console.log('Document successfully updated!');
                })
                .catch((error) => {
                    console.error('Error updating document: ', error);
                });
            } else {
                // Document doesn't exist, perform creation
                setDoc(usersDoc, { uid, email, username }, { merge: true })
                .then(() => {
                    console.log('Document successfully created!');
                })
                .catch((error) => {
                    console.error('Error creating document: ', error);
                });
            }
            });


                            
            }
        ).catch(error => {
            console.log(error);
        });

        
        
        navigate('/link')
        e.target.reset();
    }

    return (

        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <img src={logo} alt="" className='w-52' />
                <h1 className='font-black text-5xl'>SpotiMatch</h1>
                <h1 className='text-3xl tracking-widest'>Connect musically</h1>

                <form action="submit" className='mt-4 text-black flex flex-col space-y-4 items-center' onSubmit={submitSignup}>
                    <input type="text" name="email" placeholder="Email" className='px-1 py-1 w-60 rounded-md'/>
                    <input type="text" name="username" placeholder="Username" className='px-1 py-1 w-60 rounded-md'/>
                    <input type="password" name="password" placeholder="Password" className='px-1 py-1 w-60 rounded-md'/>
                    <button type="submit" style={{"marginTop": "2rem"}} className='btn-green max-w-fit'>Signup</button>
            </form>
            </div>

        </div>
    )
}

export default Signup;
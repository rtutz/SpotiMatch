import { auth } from '../services/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useDispatch} from'react-redux';
import { setUser } from '../features/userSlice';

function Signup() {
    const dispatch = useDispatch();

    const submitSignup = (e) => {
        e.preventDefault();  

        // const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const passwordVerify = e.target.passwordVerify.value;

        if (password === passwordVerify) {
            createUserWithEmailAndPassword(auth, email, password).then(
                userCredentials => {
                    console.log(userCredentials.user);
                    const {uid, email} = userCredentials.user;
                    dispatch(setUser({uid, email}))
                }
            ).catch(error => {
                console.log(error);
            })
        }
        
        e.target.reset();
    }

    return (
        <>
        <form action="submit" onSubmit={submitSignup}>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="passwordVerify" placeholder="Type password again" />
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Signup;
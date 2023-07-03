/* eslint-disable no-unused-vars */
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

export const createUser = (email, password) => {
    const auth = getAuth();
    console.log(email, password);
}



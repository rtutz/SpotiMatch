import { useEffect } from "react";
import axios from 'axios';
import useAuth from "../hooks/useAuth";



export default function Profile() { 
    const code = new URLSearchParams(window.location.search).get('code');

    useAuth(code);

    return (
        <>
            <div>
                <h1>PROFILE</h1>
            </div>
        </>
    )
}
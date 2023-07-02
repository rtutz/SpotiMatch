import { useEffect, useState } from "react";
import axios from 'axios';

function useAuth(code){
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);

    // Initializes the spotify API tokens.
    useEffect(() => {
        axios.post('http://localhost:3000/login/auth', {code}
        ).then((res) => {
            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            setExpiresIn(res.data.expires_in);
        }).catch((err) => {
            console.log(err);
        }); 
    }, 
    [code]);

    // automatically refresh the tokens.
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        // If we have a resfresh token, then do this:
        const interval = setInterval(() => {
            axios.post('http://localhost:3000/login/refresh', {refreshToken}).then((res) => {
                setAccessToken(res.data.access_token);
                setExpiresIn(res.data.expires_in);
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval);
    },[refreshToken, expiresIn]);

    return accessToken;
}

export default useAuth;
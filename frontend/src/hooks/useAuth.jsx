import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setAccessToken } from "../features/accessTokenSlice";

function useAuth(code){
    const [accessToken, setAccessTokenState] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);

    const dispatch = useDispatch();
    
    // Initializes the spotify API tokens.
    useEffect(() => {
        if (!code) return;
        axios.post('http://localhost:3000/login/auth', {code}
        ).then((res) => {
            if (res.data.statusCode === 400) throw console.error(res.data.body);
            setAccessTokenState(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            setExpiresIn(res.data.expires_in);
            dispatch(setAccessToken(res.data.access_token))
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
                setAccessTokenState(res.data.access_token);
                setExpiresIn(res.data.expires_in);
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval);
    },[refreshToken, expiresIn]);

    return accessToken;
}

export default useAuth;
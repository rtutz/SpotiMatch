import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setAccessToken } from "../features/accessTokenSlice";

function useAuth(code){
    const [accessToken, setAccessTokenState] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);

    const dispatch = useDispatch();

    // Retrieves tokens from localStorage if available on initial render
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedExpiresIn = localStorage.getItem('expiresIn');

        if (storedAccessToken && storedRefreshToken && storedExpiresIn) {
            setAccessTokenState(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setExpiresIn(storedExpiresIn);
            dispatch(setAccessToken(storedAccessToken));
        }
    }, [dispatch]);

    // Retrieves tokens from localStorage if available on initial render
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedExpiresIn = localStorage.getItem('expiresIn');

        if (storedAccessToken && storedRefreshToken && storedExpiresIn) {
            setAccessTokenState(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setExpiresIn(storedExpiresIn);
            dispatch(setAccessToken(storedAccessToken));
        }
    }, []);

    // Saves tokens to localStorage whenever they change
    useEffect(() => {
        if (accessToken && refreshToken && expiresIn) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('expiresIn', expiresIn);
        }
    }, [accessToken, refreshToken, expiresIn]);

    // Initializes the Spotify API tokens
    useEffect(() => {
        if (!code) return;
        
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedExpiresIn = localStorage.getItem('expiresIn');

        if (storedAccessToken && storedRefreshToken && storedExpiresIn) return
        axios.post('http://localhost:3000/login/auth', {code})
            .then((res) => {
                if (res.data.statusCode === 400) throw console.error(res.data.body);
                setAccessTokenState(res.data.access_token);
                setRefreshToken(res.data.refresh_token);
                setExpiresIn(res.data.expires_in);
                dispatch(setAccessToken(res.data.access_token));
            })
            .catch((err) => {
                console.log('in useAuth error');
                console.log(err);
            }); 
    }, [code, dispatch]);

    // Automatically refreshes the tokens
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(() => {
            axios.post('http://localhost:3000/login/refresh', {refreshToken})
                .then((res) => {
                    setAccessTokenState(res.data.access_token);
                    setExpiresIn(res.data.expires_in);
                    console.log('Token refreshed');
                })
                .catch((err) => {
                    console.log('error in refresh token');
                    console.log(err);
                });
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}

export default useAuth;

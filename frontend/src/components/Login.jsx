function Login() {
    const submitLogin = () => {
        
    }

    return (
        <>
        <form action="submit" onSubmit={submitLogin}>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login;
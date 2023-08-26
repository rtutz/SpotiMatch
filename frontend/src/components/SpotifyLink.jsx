import logo from '../assets/logo.svg'

function SpotifyLink(){
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <img src={logo} alt="" className='w-52' />
                <h1 className='font-black text-5xl'>SpotiMatch</h1>
                <h1 className='text-3xl tracking-widest'>Connect musically</h1>

                <div className='btn-green text-lg' style={{'fontSize': "1.125rem", "lineHeight":"1.75rem", "marginTop": "2rem" }}>
                    <a href="http://localhost:3000/login/link">Connect with Spotify</a>
                </div>

                <div className="flex flex-col items-center justify-center mt-10">
                    <p className="text-gray-200-spotify text-base tracking-wider mb-2">Due to Spotify API's limitations, please use this demo Spotify account: </p>
                    <p className="text-gray-200-spotify text-sm tracking-wider">Email: rtutz.test@gmail.com</p>
                    <p className="text-gray-200-spotify text-sm tracking-wider">Password: rtutz.test</p>
                </div>

            </div>

        </div>
    )
}

export default SpotifyLink

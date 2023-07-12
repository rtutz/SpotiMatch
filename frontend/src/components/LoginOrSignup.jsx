import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg'

// Implement later. Have to use react routers.
function LoginOrSignup() {

    return (
        // <div>
            // <button  className='text-6xl'>
            //     <Link to="/signup">Sign Up</Link>
            // </button>
        //     <h1 className='text-blue-500'>OR</h1>
            // <button>
            //     <Link to="/login">Log in</Link>
            // </button>
        // </div>
        <div>
            <div>
                <img src={logo} alt="" className='w-28 m-4 absolute' />

                <div className='flex ml-4 items-center h-screen'>
                    <div className='flex flex-col space-y-3 ml-6' id="text">
                        <h1 className='font-black text-7xl'>Connect musically</h1>
                        <h1 className='font-black text-6xl'>anytime, anywhere</h1>
                        <p className='max-w-[29rem] text-gray-200-spotify text-lg' style={{"marginTop": "1rem"}} >
                        SpotiMatch brings music enthusiasts together,
                        making it effortless and enjoyable to connect with like-minded souls.
                        </p>
                        <div className='max-w-fit btn-green' style={{"marginTop": "2rem"}}>
                            <Link to="/login">Log in</Link>
                        </div>

                        <div className='max-w-fit btn'>
                            <Link to="/signup">Sign Up</Link>
                        </div>

                    
                    </div>


                </div>

            </div>
        </div>
    )
}

export default LoginOrSignup;
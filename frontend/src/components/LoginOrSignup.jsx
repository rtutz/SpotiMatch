import {Link} from 'react-router-dom';

// Implement later. Have to use react routers.
function LoginOrSignup() {
    return (
        <div>
            <button>
                <Link to="/signup">Sign Up</Link>
            </button>
            <h1>OR</h1>
            <button>
                <Link to="/login">Log in</Link>
            </button>
        </div>
    )
}

export default LoginOrSignup;
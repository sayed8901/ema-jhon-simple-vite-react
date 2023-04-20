import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contextProviders/AuthProvider';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    
    const {loginUser, signInWithGoogle} = useContext(AuthContext);


    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const fromLocation = location.state?.from?.pathname || '/' ;
    // console.log(fromLocation);


    const handleLogin = (event) => {
        event.preventDefault();

        setErrorMsg('');
        setSuccessMsg('');

        // data collection
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);


        loginUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccessMsg('User log in successful')
            form.reset();
            navigate(fromLocation, {replace: true});
        })
        .catch(error => {
            console.log(error.message);
            setErrorMsg(error.message);
        })
    }


    const handleGoogleSignUp = () => {
        signInWithGoogle()
        .then(result => {
            const successMessage = 'User successfully signed up with Google.'
            console.log(result.user.displayName, successMessage);
            setSuccessMsg(successMessage);
            navigate(fromLocation, {replace: true});
        })
        .catch(error => {
            setErrorMsg(error.message)
        })
    }


    const handleToggle = () => {
        setShowPassword(!showPassword);
    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Log in</h2>
            <form onSubmit={handleLogin}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required placeholder='Your email' />
                </div>
                <div className='form-control'>
                    <div className='includeToggleBtn'>
                        <label htmlFor="password">Password</label>
                        <span onClick={handleToggle} className='toggleBtn'>
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>
                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" required placeholder='Password' />
                </div>

                <input type="submit" className='btn-submit' value="Login" />
            </form>

            <p className='toggle-container'>
                <small>New to Ema-john? 
                    <Link to={'/signup'}>Create New Account</Link>
                </small>
            </p>

            <div className='break-style'>
                <hr /> or <hr />
            </div>

            <button onClick={handleGoogleSignUp} className='google-btn'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="" />
                <p>Continue with Google</p>
            </button>

            
            <p className={`message ${errorMsg ? 'error-msg' : 'success-msg'}`}>
                {errorMsg ? errorMsg : successMsg}
            </p>
        </div>
    );
};

export default Login;
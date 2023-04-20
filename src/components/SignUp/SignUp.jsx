import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contextProviders/AuthProvider';

const SignUp = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);


    const {createUser, signInWithGoogle} = useContext(AuthContext);


    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const fromLocation = location.state?.from?.pathname || '/' ;
    // console.log(fromLocation);


    const handleSignUp = (event) => {
        event.preventDefault();

        setErrorMsg('');
        setSuccessMsg('');

        // data collection
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPass.value;
        // console.log(email, password, confirmPassword);


        // validation
        if(password !== confirmPassword){
            setErrorMsg('Your password did not match!');
            return;
        }
        else if(!/(?=.*[A-Z])/.test(password)){
            setErrorMsg('Password should contain at least 1 uppercase letter');
            return;
        }
        else if(!/(?=.*[0-9])/.test(password)){
            setErrorMsg('Password should contain at least 1 number');
            return;
        }
        else if(!/(?=.*[!@#$%^&*()--__+.])/.test(password)){
            setErrorMsg('Password should contain a special character');
            return;
        }
        // else if(!/(?=.{8})/.test(password)){
        //     setErrorMsg('Password must have 8 character');
        //     return;
        // }


        createUser(email, password)
        .then(result => {
            const newUser = result.user;
            console.log(newUser);
            setSuccessMsg('New user created successfully')
            form.reset();
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
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
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
                    <input type={showPassword ? 'text' : 'password'} name="confirmPass" id="confirmPass" required placeholder='Password' />
                </div>
                <div className='form-control'>
                    <div className='includeToggleBtn'>
                        <label htmlFor="password">Confirm Password</label>
                        <span onClick={handleToggle} className='toggleBtn'>
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>
                    <input type={showPassword ? 'text' : 'password'} name="password" id="passConfirm" required placeholder='Password' />
                </div>

                <input type="submit" className='btn-submit' value="Sign Up" />
            </form>

            <p className='toggle-container'>
                <small>Already have an account? 
                    <Link to={'/login'}>Login</Link>
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

export default SignUp;
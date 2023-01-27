import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

/* Home Component */
const Home = () => {

    const navigate = useNavigate(); /* define hook to navigate to other pages */

    /* function that navigate to the logIn page */
    const handleClickLogIn = () => {
        navigate('/logIn');
    };

    /* function that navigate to the signUp page */
    const handleClickSignUp = () => {
        navigate('/signUp');
    };

    /* function that navigate to the aboutUs page */
    const handleClickAboutUs = () => {
        navigate('/aboutUs');
    };
    
    return (
        <div id='Home' className='backgroundimg'>
            <div className='container'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <h1 className='text-center text-lg main-title'>Welcome to Car Service Information</h1>
                    <div className='buttons-container'>
                        <Button className='btn-md' onClick={handleClickAboutUs}>About Us</Button> {/* add the button of about us*/}
                        <Button className='btn-md' onClick={handleClickLogIn}>Log In</Button> {/* add the button of log in*/}
                        <Button className='btn-md' onClick={handleClickSignUp}>Sign Up</Button> {/* add the button of sign up*/}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Home;
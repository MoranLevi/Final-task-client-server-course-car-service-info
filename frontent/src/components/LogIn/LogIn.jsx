import React, { useRef, useState, useEffect } from 'react';
import { logInSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import md5 from 'md5';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LogIn.css';

/* LogIn Component */
const LogIn = () => {
    const navigate = useNavigate(); /* define hook to navigate to other pages */
    const [rememberMe, setRememberMe] = useState(0);/* define state for the remember me checkbox */
    const [showModal, setShow] = useState(false);/*define state for the modal box */
    const [msgModal, setMsgModal] = useState('');/*define state for the message modal box */
    const captchaRef = useRef(null); /* define ref for the captcha */


    useEffect(() => {
        /* check for a stored session in local storage */
        const storedSession = localStorage.getItem('session');
        if (storedSession) {
            /* if the session is stored, fill in the username and password */
            const session = JSON.parse(storedSession);
            if(session.rememberMe)
            {
                navigate('/dashboard'); /* navigate to the dashboard */
            }
        }
      }, []); // Only run this effect once
      
	/* function that close the modal and reset the message modal*/
    const handleClose = () =>{
         setShow(false);
         setMsgModal('');
    }
	/* function that open the modal and displays it*/
    const handleShow = () =>{
		setShow(true);
	}
	
    /* function that navigates to the forgot password page */
    const handleClickForgotPassword = () => {
        navigate('/forgotPassword');
    };

    /* function that navigates to the sign up page */
    const handleClickSignUp = () => {
        navigate('/signUp');
    };


    /* function that navigates to the dashboard page */

    const handleClickDashboard = () => {
        navigate('/dashboard');
    };
    
    /* define useForm for the logIn form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(logInSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });

    /* function that submit the form */
    const submitForm = async (data, e) => {

        /* retrieve the session from the local storage*/
		const storedSession = localStorage.getItem('session');
        e.preventDefault();
        if (storedSession){ /* if the session is stored, navigate to the dashboard */
            navigate('/dashboard'); 
        }

        /* if the session is not stored */

        /* check if the recaptcha is valid */
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();

        /* define the recaptch request message */
        const reCAPTCHMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'reCAPTCHA',
                    token:     token
                })
        };
        
        console.log("requesting");

        const reCaptchaResponse = await fetch('/reCaptchaValidation', reCAPTCHMsg) /* send the token to the server to validate it */
        console.log(reCaptchaResponse);
        if (!reCaptchaResponse.ok) {
			/* if the recaptcha is not valid, alert the user */
           setMsgModal('ReCAPTCHA verification failed')
           handleShow()

            return;
        }

        /* define the logIn request message */
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'LogIn',
                    email: data.email,
                    password: md5(data.password),
                })
        };

        console.log("requesting");


        const response = await fetch('/logIn', requestMsg);/* send the request to the server */
        
        if (!response.ok) {/* if the response is not ok, alert the user */
            setMsgModal('Invalid Login Details');
            handleShow();
            localStorage.clear();/* Clear the local storage */

            return;
        }
        let responseData = await response.json(); /* retrieve the response data */
        responseData = JSON.parse(responseData.body); /* parse the response data */
        console.log(responseData)

        /* if the remember me checkbox is checked, store the session in the local storage */
        if (rememberMe) {
            localStorage.setItem('session', JSON.stringify({rememberMe}));
        } 
        console.log(data);

        localStorage.setItem('connected', JSON.stringify(true)); /* Set the connected state to true */
        localStorage.setItem('user', JSON.stringify(responseData)); /* Set the user data in local storage */
        handleClickDashboard(); /* navigate to the dashboard */
    };
    
    return (
        
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-3">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(submitForm)}>
                                            <div className="form-group">
                                                <input id="email" type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>} {/* display error message if the email is not valid */}
                                            </div>
                                            <div className="form-group">
                                                <input id="password" type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>
                                                {errors.password ? <p className='error-msg'>{errors.password?.message}</p> : <br/>} {/* display error message if the password is not valid */}
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)}/>
                                                    <label className="custom-control-label remember-me-label" htmlFor="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <center className='margin-bottom-ReCAPTCHA'><ReCAPTCHA /* ReCAPTCHA component */
                                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                                ref={captchaRef}
                                            /></center>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Login'}></input>
                                            <hr/>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickForgotPassword}>Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickSignUp}>Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='msg-modal-title'>ALERT!</Modal.Title>
                </Modal.Header>
                <Modal.Body><p className='msg-modal'>{msgModal}</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
    </div>
    );
};

export default LogIn;
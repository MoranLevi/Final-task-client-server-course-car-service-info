import React,{useState} from 'react';
import { forgotPasswordSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ForgotPassword.css';

/* Forgot Password Component */
const ForgotPassword = () => {

    const navigate = useNavigate(); /* define hook to navigate to other pages */
    const [showModal, setShow] = useState(false);/*define state for the modal box */
    const [msgModal, setMsgModal] = useState('');/*define state for the message modal box */

    /* function that navigate to the signUp page */
    const handleClickSignUp = () => {
        navigate('/signUp');
    };

    /* function that close the modal and reset the message modal*/
    const handleClose = () =>{
        setShow(false);
        if(msgModal === 'Sent! Check your mail.') {
            setMsgModal('');
            handleClickHome();
        }
        setMsgModal('');
   }
   /* function that open the modal and displays it*/
   const handleShow = () =>{
       setShow(true);
   }

    /* function that navigate to the logIn page */
    const handleClickLogIn = () => {
        navigate('/logIn');
    };

    /* function that navigate to the home page */
    const handleClickHome = () => {
        navigate('/');
    };

    /* define useForm for the forgotPassword form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(forgotPasswordSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });

    /* function that submit the form and send the data to the server */
    const submitForm = async (data) => {
        
        /* define the request message */
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'ForgotPassword',
                    email:     data.email
                })
        };
        console.log("requesting");

        /* send the request to the server */
        const response = await fetch('/forgotPassword', requestMsg)
        console.log(response);
        if (!response.ok) { /* if the response is not ok, alert the user */
            setMsgModal('Invalid Details');/* if the response is not ok, alert the user */
            handleShow();
            return;
        }
        /* if the response is ok, alert the user */
        const responseData = await response.json();
        console.log(responseData);
        setMsgModal('Sent! Check your mail.');/* if the response is not ok, alert the user */
        handleShow();
    };

    return (
        <div className="container p-3">

            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-forgot-password-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                            <p className="mb-4 forgot-password-data-label">We get it, stuff happens. Just enter your email address below
                                                and we'll send you a link to reset your password!</p>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(submitForm)}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                    {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>} {/* display error message if the email is not valid */}
                                            </div>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Reset Password'}></input> {/* submit button */}
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickSignUp}>Create an Account!</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickLogIn}>Already have an account? Login!</a>
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

export default ForgotPassword;
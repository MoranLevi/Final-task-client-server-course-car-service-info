import React,{useState} from 'react';
import md5 from 'md5';
import {resetPasswordSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResetPassword.css';

/* ResetPassword Component */
const ResetPassword = () => {

    const navigate = useNavigate(); /* define hook to navigate to other pages */
    const [showModal, setShow] = useState(false);/*define state for the modal box */
    const [msgModal, setMsgModal] = useState('');/*define state for the message modal box */

    /* function that close the modal and reset the message modal*/
    const handleClose = () =>{
        setShow(false);
        setMsgModal('');
   }
   /* function that open the modal and displays it*/
   const handleShow = () =>{
       setShow(true);
   }

    /* function that navigates to the log in page */
    const handleClickLogIn = () => {
        navigate('/logIn');
    };

    /* function that navigates to the home page */
    const handleClickHome = () => {
        navigate('/');
    };

    /* define useForm for the resetPassword form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(resetPasswordSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });

    /* function that submit the form and send the data to the server*/
    const submitForm = async (data) => {

        /* define the request message */
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:       'ResetPassword',
                    email:        data.email,
                    password:     md5(data.password)
                })
        };
        console.log("requesting");

        const response = await fetch('/resetPassword', requestMsg) /* send the data to the server */
        console.log(response);
        if (!response.ok) { /* if the response is not ok, alert the user */
            setMsgModal('Invalid Details.');
            handleShow();
            return;
        }
        const responseData = await response.json(); /* retrieve the response data */
        console.log(responseData);
        setMsgModal('Updated.');/* alert the user */
        handleShow();
        handleClickLogIn(); /* navigate to the log in page */
    };

    return (
        <div className="container p-3">

            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-reset-password-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Reset Password!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(submitForm)}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <p className='space2'>{'.'}</p>} {/* display error message if the email is not valid */}
                                                <input type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>
                                                {errors.password ? <p className='error-msg'>{errors.password?.message}</p> : <p className='space2'>{'.'}</p>} {/* display error message if the password is not valid */}
                                                <input type="password" className="form-control form-control-user"
                                                    name="repeatPassword" placeholder="Repeat Password" {...register('repeatPassword')}/>
                                                {errors.repeatPassword ? <p className='error-msg'>{errors.repeatPassword?.message}</p> : <p className='space2'>{'.'}</p>} {/* display error message if the repeat password is not valid */}
                                            </div>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Reset Password'}></input>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickHome}>Disscare</a>
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

export default ResetPassword;
import React,{useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import { editcarServiceSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditCarService.css';

/* Edit Car Service Component 
   A component that add edit car service in the database*/
const EditCarService = () => {

    const navigate = useNavigate(); /* define hook to navigate to other pages */
    const [showModal, setShow] = useState(false);/*define state for the modal box */
    const [msgModal, setMsgModal] = useState('');/*define state for the message modal box */


    const storedCarService = localStorage.getItem('carService');
        if(!storedCarService) {
            navigate('*'); /* if the car service data not found, navigate to the 404 page */
        }
    
    /* function that close the modal and reset the message modal*/
    const handleClose = () =>{
        setShow(false);
        setMsgModal('');
   }
   /* function that open the modal and displays it*/
   const handleShow = () =>{
       setShow(true);
   }

    const carService = JSON.parse(storedCarService); /* get the car service data from the local storage */

    /* function that clear the carService that found in loocal storage and navigate to the dashboard */
    const handleClickDashboard = () => {
        localStorage.removeItem('carService'); /* clear local storage */
        navigate('/dashboard');
    };

    /* define useForm for the editCarService form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(editcarServiceSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });

    /* function that submit the form and send the data to the server */
    const submitForm = async (data, e) => {

        /* define the request message */
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'EditCarService',
                    treatmentNumber:      data.treatmentNumber,
                    treatmentInfo:        data.treatmentInformation,
                    dateT:                data.date,
                    workerEmail:          data.workerEmail,
                    carNumber:            data.carNumber,
                })
        };

        console.log("requesting");

        const response = await fetch('/editCarService', requestMsg) /* send the request to the server */
        console.log(response);
        if (!response.ok) { /* if the response is not ok, alert the user */
            setMsgModal('Invalid Car Service Details');
            handleShow();
            return;
        }

        /* get the response from the server */
        const responseData = await response.json();
        console.log(responseData);
        setMsgModal('Edit Car Service Successfully');
        handleShow();

        /* navigate to the dashboard page */
        handleClickDashboard();
    };

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-edit-car-service-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Edit Car Service!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit(submitForm)}>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="treatmentNumber"
                                                placeholder="Treatment Number" value={carService.treatmentNumber} {...register('treatmentNumber')}/>
                                            {errors.treatmentNumber ? <p className='error-msg'>{errors.treatmentNumber?.message}</p> : <br/>} {/* display error message if the treatment number is not valid */}
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="treatmentInformation"
                                                placeholder="Treatment Information" defaultValue={carService.treatmentInfo} {...register('treatmentInformation')}/>
                                            {errors.treatmentInformation ? <p className='error-msg'>{errors.treatmentInformation?.message}</p> : <p className='space'>{'.'}</p>} {/* display error message if the treatment information is not valid */}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" name="workerEmail"
                                            placeholder="Worker Email" defaultValue={carService.workerEmail} {...register('workerEmail')}/>
                                        {errors.workerEmail ? <p className='error-msg'>{errors.workerEmail?.message}</p> : <br/>} {/* display error message if the worker email is not valid */}
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <input type="datetime-local" name="date" className="form-control form-control-user"
                                                defaultValue={carService.dateT.toString().slice(0, -8)} {...register('date')} required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="carNumber"
                                                placeholder="Car Number" defaultValue={carService.carNumber} {...register('carNumber')}/>
                                            {errors.carNumber ? <p className='error-msg'>{errors.carNumber?.message}</p> : <p className='space'>{'.'}</p>} {/* display error message if the car number is not valid */}
                                        </div>

                                    </div>
                                    <input type="submit" className="btn btn-primary btn-user btn-block" value={'Edit Car'}></input> {/* submit button */}
                                </form>
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

export default EditCarService;
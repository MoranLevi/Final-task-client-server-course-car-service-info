import React from 'react';
import image from '../../images/error-404-image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Page404.css';

/* Page 404 Component */
const Page404 = () => {
    
    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center row">
                    <div className=" col-md-6">
                        <img src={image} alt='imageLego' className="img-fluid"/>
                    </div>
                    <div className=" col-md-6 mt-5">
                        <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                        <p className="lead">
                            The page you’re looking for doesn’t exist.
                        </p>
                        <a href="/" className="btn btn-primary">Go Home</a>
                    </div>

                </div>
            </div>
        </div>    
    );
};

export default Page404;
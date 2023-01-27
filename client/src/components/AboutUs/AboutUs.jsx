import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';

/* About Us component 
   A component that shows information about the about the founders of the site and the site's offers */
const AboutUs = () => {

    return (
        <div className='aboutUs-backgroundimg'>
            <div className='aboutUs-details-container'>
                {/* Card component from react-bootstrap library with data about the founders of the site */}
                <Card className='about-us-card' >
                    <Card.Body>
                        <h4><b>Ort Braude - Client and Server Technologies Course 2023</b></h4>
                        <h3 style= {{color: 'black'}}>Website to manage Car Service Information</h3>
                        Submited by:
                        Yassmine Machour & Moran Levi
                    </Card.Body>
                </Card>
                {/* Card component from react-bootstrap library with data about the site's offers */}
                <Card className='about-us-card' >
                    <Card.Body>
                    <h4><b>What we offer?</b></h4>
                    Web application to manage car service information, such as: save, update and delete treatments date of cars that comes for treatment.
                    <br/>The number of car and worker who perfom this treatment is saved.
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default AboutUs; /* export the component */
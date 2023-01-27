import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import ReactTable from '../ReactTable/ReactTable';
import imageProfile from '../../images/profile-icon.png';
import imageEdit from '../../images/edit-car-image.png';
import imageDelete from '../../images/delete-car-image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

/* Dashboard Component */
const Dashboard = () => {
    
    const navigate = useNavigate(); /* define hook to navigate to other pages */
    const [carsTableData, setCarsTableData] = useState([]); /* define state to save the cars data */

    const storedUser = localStorage.getItem('user');
    if(!storedUser) { 
        navigate('*'); /* if the user is not exists in local storage, navigate to the 404 page */
    }
    const user = JSON.parse(storedUser); /* else get the user data from local storage */

    useEffect(() => {
        // Check for a stored session in local storage
        const storedConnected = localStorage.getItem('connected');
        if (!storedConnected) {
            navigate('*'); /* if the user is not logged in, navigate to the 404 page */
        }
        
        /* else get the cars data from the server */
        async function fetchData() {
            const response = await fetch('/getCarsData'); /* send request to the server */
            const json = await response.json(); /* get the response from the server */
            setCarsTableData(json); /* save the cars data in the carsTableData state */
            console.log(json);
        }
        fetchData();

    }, []); // Only run this effect once

    /* function that navigate to the addNewCarService page when click on edit specific car service*/
    const onClickEdit = (row) => {
        console.log('Edit button clicked for car with treatment number: ', row.original.treatmentNumber);
        localStorage.setItem('carService', JSON.stringify(row.original)); /* save the car service data that choose to edit in local storage */
        navigate('/editCarService'); /* navigate to the editCarService page */
    }

    /* function that delete the specific car service when click on delete specific car service*/
    const onClickDelete = async (row) => {
        console.log('Delete button clicked for car with treatment number: ', row.original.treatmentNumber);
        
        /* send request to the server to delete the specific car service */
        await fetch('/deleteCar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                treatmentNumber:   row.original.treatmentNumber,
            })
        })
       window.location.reload(false) /* reload the page after delete car service*/
    }

    /* function that navigate to the addNewCarService page when click on add new car service*/
    const handleClickAddNewCarService = () => {
        navigate('/addNewCarService');
    };

    /* function that implement log out- remove the coonected, user, session from the local storage and move to the home page */
    const handleOnClickLogOut = () => {
        localStorage.removeItem('connected');
        localStorage.removeItem('user');
        localStorage.removeItem('session');
        navigate('/');
    }

    /* define the columns of the cars service table */
    const tableColumns = useMemo(
        () => [
            {
                Header: 'Treatment Number',
                accessor: 'treatmentNumber',
            },
            {
                Header: 'Treatment Information',
                accessor: 'treatmentInfo',
            },
            {
                Header: 'Date',
                accessor: 'dateT',
                Cell: ({ cell: { row } }) => { /* define the date format */
                    const date = new Date(row.original.dateT);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const dateStr = `${day}/${month}/${year} ${hours}:${minutes}`;
                    return dateStr;
                }
            },
            {
                Header: 'Worker Email',
                accessor: 'workerEmail',
            },
            {
                Header: 'Car Number',
                accessor: 'carNumber',
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: row => (
                    <div>
                        <button onClick={() => onClickEdit(row.row)} className='button-image'> {/* define the edit button */}
                            <img src={imageEdit} alt="image-button" style={{ width: '30px', height: '30px' }}/>
                        </button>
                        <button onClick={(e) => onClickDelete(row.row)} className='button-image'> {/* define the delete button */}
                            <img src={imageDelete} alt="image-button" style={{ width: '30px', height: '30px' }}/>
                        </button>
                    </div>     
                )
            }
        ],
        [],
    );

    return (
        <div className='container'>
            <div id="page-top">

                {/* Page Wrapper */}
                <div id="wrapper">

                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* Main Content */}
                        <div id="content">

                            {/* Topbar */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                
                                <a href="#" className="nav-link link-log-out" onClick={handleOnClickLogOut}>Log Out</a>
                                {/* Topbar Navbar */}
                                <ul className="navbar-nav ml-auto">
                                    

                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* Nav Item - User Information */}
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 big">{`${user?.firstName} ${user?.lastName}`}</span>
                                            <img className="img-profile rounded-circle" src={imageProfile} style={{ width: '45px', height: '40px' }}/>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            {/* End of Topbar */}

                            {/* Begin Page Content */}
                            <div className="container-fluid">

                                {/* Page Heading */}
                                <h1 className="h3 mb-2 text-gray-800">Car Service Table</h1>
                                <button className="mb-4 btn btn-primary" onClick={handleClickAddNewCarService}>Add New Car Service</button>

                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <ReactTable columns={tableColumns} data={carsTableData} />
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}

                    </div>
                    {/* End of Content Wrapper */}

                </div>
                {/* End of Page Wrapper */}

                {/* Scroll to Top Button*/}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
        </div>
    </div>
    );
};

export default Dashboard;
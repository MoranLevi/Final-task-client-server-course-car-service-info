import { HashRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AboutUs from './components/AboutUs/AboutUs';
import Dashboard from './components/Dashboard/Dashboard';
import AddNewCarService from './components/AddNewCarService/AddNewCarService';
import EditCarService from './components/EditCarService/EditCarService';
import Page404 from './components/Page404/Page404';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* App.js is the main component of the application. It is the parent component of all other components. */
function App() {
  return (
    <div id='App'>
        {/* Router is the parent component of all other components. It is used to route the user to the desired component. */}
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/logIn" element={<LogIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path="/aboutUs" element={<AboutUs/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/addNewCarService" element={<AddNewCarService/>}/>
                <Route path="/editCarService" element={<EditCarService/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes> 
        </Router>  
    </div>
);
}

export default App; /* Exporting the App component */

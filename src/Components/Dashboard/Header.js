import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styles.css'


const Header = () => {

    return (
        <div className="jumbotron">
            <h5>WELCOME {localStorage.getItem('username')}</h5>
            <h5> CLOUD STORAGE </h5>
            <div className="logout-btn">
                <Link to="/"><Button >SIGNOUT</Button></Link>
            </div>
        </div>
    )
}



export default Header
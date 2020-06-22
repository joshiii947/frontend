import React from 'react';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './styles.css'


const Header = () => {


    if(localStorage.getItem('token')!=undefined){
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
    else{
        return(
            <Redirect to="/" />
        )
    }
}



export default Header
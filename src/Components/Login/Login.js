import React from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import { Input, Label } from 'reactstrap';
import { Cube } from 'styled-loaders-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PORTADDRESS } from '../fileconstant'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            success: false,
            disabled: false,
            loading: false
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }



    submitValue = (event) => {
        event.preventDefault()
        this.setState({
            disabled: !this.state.disabled,
            loading: !this.state.loading
        })

        const { username, password } = this.state

        if (username != '' && password != '') {


            axios({ method: 'post', url: `${PORTADDRESS}user/login`, data: qs.stringify({ username: username, password: password }), headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' } })
            .then((result) => {
                console.log(result)

                if (result['data']['result']['email'] == undefined) {
                    this.setState({
                        disabled: !this.state.disabled,
                        loading: false
                    })
                toast.error('USERNAME AND PASSWORD IS INCORRECT')
                }
                else {
                    localStorage.setItem('username', username)
                    localStorage.setItem('userId', result['data']['result']['_id'])
                    localStorage.setItem('token',result['data']['token'])

                    this.setState({
                        success: !this.state.success,
                        loading: false
                    })
                }
            })
            .catch((err) => console.log(err))
        }
        else {
            this.setState({
                loading: false
            })
            toast.error('PLEASE FILL ALL THE FIELDS')
        }
    }



    render() {
        return (

            <>
                {this.state.success === true && <Redirect to="/dashboard" /> || ''}

                {this.state.loading && <Cube /> ||
                    <div className="container vh-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-md-6">
                                <div id="login-page-side-img">

                                    <img src="signin.jpg" alt="Login page" />

                                </div>
                            </div>

                            <div className="col-md-5">
                                <div id="login-form" >

                                    <h2 className="text-center">Sign in</h2>
                                    <form>

                                        <div>
                                            <Label htmlFor="username"><b>USERNAME</b></Label>
                                            <Input id="login-form-input" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                                        </div>
                                        <div>
                                            <Label htmlFor="password"><b>PASSWORD</b></Label>
                                            <Input id="login-form-input" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                        </div>

                                        <button type="button" disabled={this.state.disabled} className="login-button btn btn-success" onClick={this.submitValue}>Submit</button>
                                    </form>
                                    <a className="register">Not registered ?<Link to="/register">Register</Link></a>
                                </div>

                            </div>
                        </div>
                        <ToastContainer />

                    </div>

                }
            </>

        )
    }
}





export default Login;
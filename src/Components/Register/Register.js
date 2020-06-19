import React from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import qs from 'qs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PORTADDRESS } from '../fileconstant'


class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            sucessmessage: '',
            touched: {
                name: '',
                username: '',
                email: '',
                password: ''
            }
        }
    }

    validate(name, username, email, password) {
        const errors = {
            name: '',
            username: '',
            email: '',
            password: ''
        };

        const reg = /^[a-zA-Z]+$/
        if (this.state.touched.name && name.length < 4)
            errors.name = 'Name should have atleast 4 character'
        else if (this.state.touched.name && name.length > 20)
            errors.name = 'Name should be less than 10 character'
        else if (this.state.touched.name && !reg.test(name))
            errors.name = 'Name should contain only letters'

        if (this.state.touched.username && username.length < 4)
            errors.username = 'Username should have atleast 4 character'
        else if (this.state.touched.username && username.length > 20)
            errors.username = 'Username should be less than 20 character'

        if (this.state.touched.email && email.length < 10)
            errors.email = 'Email should be atleast 5 characters'
        else if (this.state.touched.email && email.length > 35)
            errors.email = 'Email should be less than 35 character'
        else if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Not a valid email contain a @ sign'

        if (this.state.touched.password && password.length < 5)
            errors.password = 'Password should be atleast 5 character'
        else if (this.state.touched.password && password.length > 20)
            errors.password = 'Passowrd should be less than 15 character'


        return errors
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errmessage: '',
            sucessmessage: ''
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const { name, username, email, password } = this.state
        if (name.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim() === '') {
            this.setState({
                errmessage: 'Please fill all the fields'
            })
            toast('PLEASE FILL ALL THE FIELDS')
        }
        else {


            axios({ method: 'post', url: `${PORTADDRESS}user/register`, data: qs.stringify({ name: name, username: username, email: email, password: password }), headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' } })
            .then((result) => {
                if (result['data']['errmsg'] !== undefined) {
                    toast.error(result['data']['errmsg'].split('dup key:')[1].split(':')[0].split(' ')[2] + ' is already Registered')
                }
                else {
                    this.setState({
                        sucessmessage: 'SUCCESSFULY REGISTERED',
                        name: '',
                        username: '',
                        email: '',
                        password: ''
                    })
                toast.success('SUCCESFULY REGISTERED')
                }
            })
            .catch((err) => console.log(err))
        }
    }




    render() {

        const errors = this.validate(this.state.name, this.state.username, this.state.email, this.state.password)

        return (
            <>

                <div className="container">

                    <div className="row">

                        <div className="col-md-6">

                            <img className="register-image" src="signup.jpg" alt="RegistrationPage" />

                        </div>
                        <div className="col-md-5">

                            <div className="formdata">

                                {this.state.sucessmessage !== '' && <Link to="/"> Login</Link> || ''}

                                <h2 className="text-center">REGISTER</h2>
                                <form>

                                    <div className="form-group">
                                        <label className="text-muted"><b>Name</b></label>
                                        <input type="text" name="name" value={this.state.name} className="form-control" required onChange={this.handleChange} onBlur={this.handleBlur('name')} invalid={errors.name !== ''} />
                                        {this.state.sucessmessage == '' ? errors.name !== '' ? <h6 className="errmsg">{errors.name}</h6> : '' : ''}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-muted"><b>Username</b></label>
                                        <input type="text" name="username" value={this.state.username} className="form-control" required onChange={this.handleChange} onBlur={this.handleBlur('username')} invalid={errors.username !== ''} />
                                        {this.state.sucessmessage == '' ? errors.username !== '' ? <h6 className="errmsg">{errors.username}</h6> : '' : ''}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-muted"><b>Email</b></label>
                                        <input type="email" name="email" value={this.state.email} className="form-control" required onChange={this.handleChange} onBlur={this.handleBlur('email')} invalid={errors.email !== ''} />
                                        {this.state.sucessmessage == '' ? errors.email !== '' ? <h6 className="errmsg">{errors.email}</h6> : '' : ''}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-muted"><b>Password</b></label>
                                        <input type="password" name="password" value={this.state.password} className="form-control" required onChange={this.handleChange} onBlur={this.handleBlur('password')} invalid={errors.password !== ''} />
                                        {this.state.sucessmessage == '' ? errors.password !== '' ? <h6 className="errmsg">{errors.password}</h6> : '' : ''}
                                    </div>

                                    <button className="register-btn btn btn-raised btn-primary" disabled={errors.name !== '' || errors.username !== '' || errors.email !== '' || errors.password !== ''} onClick={this.handleSubmit}>Submit</button>

                                </form>

                                <div className="text-center"><a >Already register ?<Link to="/" >Login</Link></a></div>

                            </div>

                        </div>
                    </div>

                </div>
                <ToastContainer />
            </>
        )
    }

}

export default Register;


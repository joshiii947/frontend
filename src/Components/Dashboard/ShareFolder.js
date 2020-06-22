import React from 'react'
import { PORTADDRESS } from '../fileconstant'
import axios from 'axios'
import {Redirect} from 'react-router-dom'



class ShareFolder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sharedUser: []
        }
    }

    folderInfoDetails = () => {
        const folderId = this.props.folderInfo['folderId']
        axios({ method: 'post', url: `${PORTADDRESS}folder/folderdetails`, data: { id: folderId } })
        .then((result) => {
            this.setState({ sharedUser: result['data']['sharedWith'] })
        })
        .catch((err) => console.log(err))
    }


    componentDidMount = () => {
        this.folderInfoDetails()

    }

    removeFolderAccess = (item) => {
        const username = item['username']
        const email = item['email']
        const folderId = this.props.folderInfo['folderId']
        const folderName = this.props.folderInfo['folderName']
        const parentUsername = localStorage.getItem('username')


        axios({ method: 'post', url: `${PORTADDRESS}sharedfiles/removeFolderAccess`, data: { parentUsername: parentUsername, folderId: folderId, folderName: folderName, username: username, email: email } })
        .then((result) => {
            this.folderInfoDetails()
        })
        .catch((err) => console.log(err))


    }

    addFolderAccess = (item) => {
        const username = item['username']
        const email = item['email']
        const folderId = this.props.folderInfo['folderId']
        const folderName = this.props.folderInfo['folderName']
        const parentUsername = localStorage.getItem('username')

        axios({ method: 'post', url: `${PORTADDRESS}sharedfiles/addFolderAccess`, data: { parentUsername: parentUsername, folderId: folderId, folderName: folderName, username: username, email: email } })
        .then((result) => {
            this.folderInfoDetails()
        })
        .catch((err) => console.log(err))

    }



    handleChange = (event, item) => {
        const value = event.target.checked

        if (value) {
            this.addFolderAccess(item)
        }
        else {
            this.removeFolderAccess(item)
        }
    }

    render() {

        const users = this.props.userlist && (this.props.userlist || []).map((item, index) => {
            const isAlreadyShared = this.state.sharedUser.some((user) => user['username'] == item['username'])

            if (localStorage.getItem('username') !== item['username']) {
                return (
                    <div key={index}>
                        <form>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" checked={isAlreadyShared} onClick={(event) => this.handleChange(event, item)} />
                                <label className="form-check-label" htmlfor="username">{item['username']}</label>
                            </div>
                        </form>
                    </div>
                )
            }
        })

        if(localStorage.getItem('token')!=undefined){

        return (
            <>

                {users}

            </>
        )
        }
        else{
            return(
                <Redirect to="/" />
            )
        }
    }
}



export default ShareFolder

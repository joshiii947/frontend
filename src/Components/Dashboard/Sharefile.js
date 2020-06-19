import React from 'react'
import { PORTADDRESS } from '../fileconstant'
import axios from 'axios'


class Sharefile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sharedUser: []
        }

    }

    getFileInfo = () => {
        const fileId = this.props.fileInfo['fileId']

        axios({ method: 'post', url: `${PORTADDRESS}file/getfileinfo`, data: { id: fileId } })
            .then((result) => {

                this.setState({
                    sharedUser: result['data']['sharedWith']
                })
            })
            .catch((err) => console.log(err))
    }

    componentDidMount = () => {
        this.getFileInfo()
    }


    removeFileAcess = (item) => {
        const parentUsername = localStorage.getItem('username')
        const fileId = this.props.fileInfo['fileId']
        const username = item['username']
        const email = item['email']
        const fileName = this.props.fileInfo['fileName']

        axios({ method: 'post', url: `${PORTADDRESS}sharedfiles/removefileaccess`, data: { parentUsername: parentUsername, fileId: fileId, username: username, email: email, fileName: fileName } })
            .then((result) => {
                this.getFileInfo()
            })
            .catch((err) => console.log(err))

    }

    addFileAccess = (item) => {
        const parentUsername = localStorage.getItem('username')
        const fileId = this.props.fileInfo['fileId']
        const username = item['username']
        const email = item['email']
        const fileName = this.props.fileInfo['fileName']

        axios({ method: 'post', url: `${PORTADDRESS}sharedfiles/addfileaccess`, data: { parentUsername: parentUsername, fileId: fileId, username: username, email: email, fileName: fileName } })
            .then((result) => {
                this.getFileInfo()
            })
            .catch((err) => console.log(err))

    }


    handleChange = (item, event) => {
        const value = event.target.checked

        if (value) {
            this.addFileAccess(item)
        }
        else {
            this.removeFileAcess(item)
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
                                <input type="checkbox" className="form-check-input" checked={isAlreadyShared} onClick={(event) => this.handleChange(item, event)} />
                                <label className="form-check-label" htmlfor="username">{item['username']}</label>
                            </div>
                        </form>
                    </div>

                )
            }
        })

        return (

            <>

                {users}

            </>

        )
    }
}


export default Sharefile;
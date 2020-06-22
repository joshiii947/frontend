import React from 'react'
import { PORTADDRESS } from '../fileconstant'
import Header from '../Dashboard/Header'
import axios from 'axios'
import qs from 'qs'
import { Link,Redirect } from 'react-router-dom'
import '../Dashboard/styles.css'
import { Card, CardBody, CardFooter, CardTitle, CardSubtitle } from 'reactstrap'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Viewfile from '../Dashboard/ViewFile'


class ShareFiles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            fileId: ''
        }
    }


    getFileDetails = () => {
        const username = localStorage.getItem('username')

        axios({ method: 'post', url: `${PORTADDRESS}user/getuserinfo`, data: { username: username } })
        .then((result) => {
            this.setState({
                files: result['data']['sharedFilesWithUser']
            })
        })
        .catch((err) => console.log(err))
    }


    componentDidMount = () => {
        this.getFileDetails()
    }

    showFile = (item) => {
        const fileId = item['fileId']
        const username = localStorage.getItem('username')

        axios({ method: 'post', url: `${PORTADDRESS}file/getfileinfo`, data: { id: fileId } })
        .then((result) => {
            const value = result['data']['sharedWith'].some((user) => user['username'] == username)
            if (value) {
                this.setState({
                    fileId: fileId
                })
            }
            else {
                this.getFileDetails()
            }
        })
        .catch((err) => console.log(err))
    }


    render() {

        const allfiles = this.state.files && this.state.files.map((item, index) => {
            return (
                <div key={index} className="col-md-3 col-sm-6">
                    <Card className="folderview">

                        <CardTitle>
                            <div><h5 className="card-header">{item['fileName']}</h5></div>
                        </CardTitle>
                        <CardBody>
                            <CardSubtitle>Shared By: {item['parentUsername']}</CardSubtitle>
                        </CardBody>
                        <CardFooter>
                            <Tooltip title="Show file"><IconButton><GetAppIcon onClick={() => this.showFile(item)} /></IconButton></Tooltip>
                        </CardFooter>

                    </Card>
                </div>
            )
        })


        if(localStorage.getItem('token')!=undefined){
        return (
            <>
                <Header />

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">DASHBOARD</Link></li>
                    </ol>
                </nav>

                <div className="row">

                    <div className="col-md-3">
                        <ul className="list-group">
                            <li className="list-group-item active">Share File With User</li>
                            <li className="list-group-item"><Link to="/sharefolderwithuser">Share Folder With User</Link> </li>
                        </ul>

                        {this.state.fileId !== '' && <Viewfile fileId={this.state.fileId} />}

                    </div>

                    <div className="col-md-9">
                    {this.state.files.length == 0  &&  <div><Card className="card-empty"><h5>Sorry nothing has been shared with you </h5> </Card></div>}      

                        {allfiles}

                    </div>

                </div>

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


export default ShareFiles

import React from 'react'
import { PORTADDRESS } from '../fileconstant'
import axios from 'axios'
import qs from 'qs'
import Header from '../Dashboard/Header'
import { Link,Redirect } from 'react-router-dom'
import '../Dashboard/styles.css'
import { Card, CardBody, CardFooter, CardTitle, CardSubtitle } from 'reactstrap'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import ViewFile from '../Dashboard/ViewFile'


class SharedFolder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folders: [],
            files: [],
            fileId: ''
        }
    }

    getFolderDetails = () => {
        const username = localStorage.getItem('username')

        axios({ method: 'post', url: `${PORTADDRESS}user/getuserinfo`, data: { username: username } })
        .then((result) => {
            this.setState({
                folders: result['data']['sharedFolderWithUser']
            })
        })
        .catch((err) => console.log(err))
    }


    getAllFiles = (folderId) => {
        axios({ method: 'post', url: `${PORTADDRESS}folder/folderdetails`, data: { id: folderId } })
        .then((result) => {
            this.setState({
                files: result['data']['files']
            })
        })
        .catch((err) => console.log(err))
    }

    componentDidMount = () => {
        this.getFolderDetails();
    }

    showFolderItems = (item) => {
        const folderId = item['folderId']
        const username = localStorage.getItem('username')

        axios({ method: 'post', url: `${PORTADDRESS}folder/folderdetails`, data: { id: folderId } })
            .then((result) => {
                const value = result['data']['sharedWith'].some((user) => user['username'] == username)
                if (value) {
                    this.setState({
                        files: result['data']['files']
                    })
                }
                else {
                    this.getFolderDetails()
                }
            })
            .catch((err) => console.log(err))
    }

    onFileChange = (item) => {
        this.setState({
            fileId: item['fileId']
        })
    }

    render() {

        const allfolders = this.state.folders && this.state.folders.map((item, index) => {
            return (

                <div key={index} className="col-md-3 col-sm-6 ">
                    <Card className="folderview">
                        <CardTitle>
                            <div><h5 className="card-header">{item['folderName']}</h5></div>
                        </CardTitle>

                        <CardBody className="cardbody">
                            <CardTitle>Shared By : {item['parentUsername']}</CardTitle>
                        </CardBody>

                        <CardFooter>
                            <Tooltip title="Click to view the files" ><IconButton><FolderOpenIcon onClick={() => this.showFolderItems(item)} /></IconButton></Tooltip>
                        </CardFooter>

                    </Card>
                </div>
            )
        })

        const allfiles = this.state.files && this.state.files.map((item, index) => {
            return (
                <div key={index} className="col-md-3 col-sm-6">
                    <Card className="folderview">

                        <CardTitle>
                            <div><h5 className="card-header">{item['fileName']}</h5></div>
                        </CardTitle>
                        <CardBody>
                            <CardSubtitle>Uploaded on {item['createdAt'].split('T')[0]}</CardSubtitle>
                            <CardSubtitle>Uploaded time {item['createdAt'].split('T')[1].split('.')[0]}</CardSubtitle>
                        </CardBody>
                        <CardFooter>
                            <Tooltip title="Show file"><IconButton><GetAppIcon onClick={() => this.onFileChange(item)} /></IconButton></Tooltip>
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
                            <li className="list-group-item"><Link to="/sharefilewithuser">Share File With User</Link></li>
                            <li className="list-group-item active">Share Folder With User </li>
                        </ul>

                        <ViewFile fileId={this.state.fileId} />

                    </div>

                    <div className="col-md-9">

                        <div classsName="row">
                        {this.state.folders.length == 0  &&  <div><Card className="card-empty"><h5>Sorry nothing has been shared with you</h5> </Card></div>}

                            {allfolders}

                        </div>
                        <div className="row">

                            {allfiles}

                        </div>

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


export default SharedFolder
import React from 'react'
import { PORTADDRESS } from '../fileconstant'
import axios from 'axios'
import qs from 'qs'
import Header from '../Dashboard/Header'
import { Link, Redirect } from 'react-router-dom'
import '../Dashboard/styles.css'
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap'


class ShareFile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folders: [],
            fileId: ''
        }
    }


    componentDidMount = () => {
        const username = localStorage.getItem('username')

        axios({ method: 'post', url: `${PORTADDRESS}user/getuserinfo`, data: { username: username } })
        .then((result) => {
            this.setState({
                folders: result['data']['sharedFolderByUser']
            })
        })
        .catch((err) => console.log(err))
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
                            <CardTitle>Shared with : {item['username']}</CardTitle>
                            {/* <CardTitle>Creation time : {item['createdAt'].split('T')[1].split('.')[0]} </CardTitle> */}
                        </CardBody>

                        <CardFooter>
                            {/* <Tooltip title="Click to view the folder" ><IconButton><FolderOpenIcon  onClick={()=>this.showFolderItems(item)} /></IconButton></Tooltip>  */}
                            {/* <Tooltip title="Click to share with users" className="shareicon" ><IconButton><ShareIcon onClick={()=>this.folderToggle(item)}/></IconButton></Tooltip> */}
                            {/* <Tooltip title="Delete(Cannot be undone)" className="folderdeleteicon" ><IconButton><DeleteIcon  onClick={()=>this.deleteFolder(item)} /></IconButton></Tooltip>  */}
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
                            <li className="list-group-item"><Link to="/usersharefile">Share File By User</Link></li>
                            <li className="list-group-item active">Share Folder By User </li>
                        </ul>

                    </div>
                    <div className="col-md-9">
                    
                    {this.state.folders.length == 0  &&  <div><Card className="card-empty"><h5>you have not share folders with anyone</h5> </Card></div>}

                        {allfolders}

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



export default ShareFile;

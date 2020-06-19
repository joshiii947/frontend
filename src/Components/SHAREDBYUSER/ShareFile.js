import React from 'react';
import { PORTADDRESS } from '../fileconstant';
import axios from 'axios';
import qs from 'qs';
import Header from '../Dashboard/Header';
import { Link } from 'react-router-dom';
import '../Dashboard/styles.css';
import { Card, CardBody, CardTitle, CardFooter, CardSubtitle } from 'reactstrap';


class ShareFile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
    }


    componentDidMount = () => {
        const username = localStorage.getItem('username')

        axios({ method: 'post', url: `${PORTADDRESS}user/getuserinfo`, data: { username: username } })
        .then((result) => {
            this.setState({
                files: result['data']['sharedFilesByUser']
            })
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
                            <CardSubtitle><h5>Shared with:</h5> {item['username']}</CardSubtitle>
                        </CardBody>
                        <CardFooter>
                            {/* <Tooltip title="Show file"><IconButton><GetAppIcon onClick={()=>this.props.onFileChange(item)} /></IconButton></Tooltip> */}
                            {/* <Tooltip title="Click to share with users" className="shareicon" ><IconButton><ShareIcon onClick={()=>this.fileToggle(item)}/></IconButton></Tooltip> */}
                            {/* <Tooltip title="Delete(cannot be undonve)" className="deleteicon"><IconButton><DeleteIcon onClick={()=>this.deleteFile(item)} /></IconButton></Tooltip>  */}
                        </CardFooter>
                    </Card>
                </div>
            )
        })

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
                            <li className="list-group-item active">Share File By User</li>
                            <li className="list-group-item"><Link to="/usersharefolder">Share Folder By User</Link> </li>
                        </ul>

                    </div>
                    <div className="col-md-9">

                        {allfiles}
                        {/* {console.log(this.state.files)} */}

                    </div>

                </div>
            </>
        )
    }
}



export default ShareFile;
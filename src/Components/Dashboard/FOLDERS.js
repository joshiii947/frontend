import React from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, ModalBody, Label, Input, Card, CardFooter, CardTitle, Form, FormGroup, CardBody, CardSubtitle, ModalFooter } from 'reactstrap';
import './styles.css'
import axios from 'axios'
import qs from 'qs'
import 'react-toastify/dist/ReactToastify.css'
import DeleteIcon from '@material-ui/icons/Delete';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { ToastContainer, toast } from 'react-toastify'
import { PORTADDRESS } from '../fileconstant'
import SHAREDFOLDER from './ShareFolder'




class FOLDERS extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userlist: [],
            shareFolder: false,
            folderInfo: []
        }
    }

    componentDidMount = () => {
        axios({ method: 'post', url: `${PORTADDRESS}user/getlist` })
        .then((result) => {
            this.setState({
                userlist: result['data']['registersuser']
            })
        })
        .catch((err) => console.log(err))
    }




    deleteFolder = (item) => {
        const id = this.props.id

        axios({ method: 'post', url: `${PORTADDRESS}folder/deleteFolder`, data: { id: item['folderId'], parentId: id } })
        .then((result) => console.log(result))
        .catch((err) => console.log(err))

        this.props.onFolderChange()
    }

    showFolderItems = (item) => {
        this.props.showFolder(item['folderId'])
    }


    folderToggle = (item) => {
        this.setState({
            shareFolder: !this.state.shareFolder,
            folderInfo: item
        })
    }

    render() {

        const allfolders = this.props.folders && this.props.folders.map((item, index) => {
            return (

                <div key={index} className="col-md-3 col-sm-6 ">
                    <Card className="folderview">
                        <CardTitle>
                            <div><h5 className="card-header">{item['folderName']}</h5></div>
                        </CardTitle>

                        <CardBody className="cardbody">
                            <CardTitle>Created at : {item['createdAt'].split('T')[0]}</CardTitle>
                            <CardTitle>Creation time : {item['createdAt'].split('T')[1].split('.')[0]} </CardTitle>
                        </CardBody>

                        <CardFooter>
                            <Tooltip title="Click to view the folder" ><IconButton><FolderOpenIcon onClick={() => this.showFolderItems(item)} /></IconButton></Tooltip>
                            <Tooltip title="Click to share with users" className="shareicon" ><IconButton><ShareIcon onClick={() => this.folderToggle(item)} /></IconButton></Tooltip>
                            <Tooltip title="Delete(Cannot be undone)" className="folderdeleteicon" ><IconButton><DeleteIcon onClick={() => this.deleteFolder(item)} /></IconButton></Tooltip>
                        </CardFooter>
                    </Card>
                </div>
            )
        })


        return (
            <>


                {allfolders}

                <Modal isOpen={this.state.shareFolder}>
                    <ModalBody>
                        <SHAREDFOLDER parentId={this.props.parentId} userlist={this.state.userlist} folderInfo={this.state.folderInfo} />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="secondary" onClick={() => this.folderToggle(this.state.folderInfo)}>CLOSE</Button>
                    </ModalFooter>
                </Modal>

            </>
        )
    }
}



export default FOLDERS

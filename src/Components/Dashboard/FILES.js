import React from 'react'
import { Card, CardFooter, CardTitle, Form, FormGroup, CardBody, CardSubtitle, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import './styles.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { PORTADDRESS } from '../fileconstant'
import Sharefile from './Sharefile';


class Files extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userlist: [],
            fileShare: false,
            fileInfo: []
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


    deleteFile = (item) => {
        this.props.onDeleteFile(item)
    }

    fileToggle = (item) => {
        this.setState({
            fileShare: !this.state.fileShare,
            fileInfo: item
        })
    }


    render() {

        const allfiles = this.props.files && this.props.files.map((item, index) => {
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
                            <Tooltip title="Show file"><IconButton><GetAppIcon onClick={() => this.props.onFileChange(item)} /></IconButton></Tooltip>
                            <Tooltip title="Click to share with users" className="shareicon" ><IconButton><ShareIcon onClick={() => this.fileToggle(item)} /></IconButton></Tooltip>
                            <Tooltip title="Delete(cannot be undonve)" className="deleteicon"><IconButton><DeleteIcon onClick={() => this.deleteFile(item)} /></IconButton></Tooltip>
                        </CardFooter>
                    </Card>
                </div>
            )
        })

        return (
            <>


                {allfiles}

                <Modal isOpen={this.state.fileShare}>
                    <ModalBody>
                        <Sharefile parentId={this.props.parentId} userlist={this.state.userlist} fileInfo={this.state.fileInfo} />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="secondary" onClick={() => this.fileToggle(this.state.fileInfo)} >CLOSE</Button>
                    </ModalFooter>
                </Modal>

            </>
        )
    }
}



export default Files
import React from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, ModalBody, Label, Input, Form, FormGroup, Card, CardBody } from 'reactstrap';
import './styles.css'
import axios from 'axios'
import qs from 'qs'
import 'react-toastify/dist/ReactToastify.css'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { ToastContainer, toast } from 'react-toastify'
import { PORTADDRESS } from '../fileconstant'
import VIEWFILE from './ViewFile'
import FOLDERS from './FOLDERS'
import FILES from './FILES'
import Header from './Header'


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            folders: [],
            files: [],
            folderName: '',
            folderInput: false,
            fileInput: false,
            file: null,
            fileId: '',
            parentId: ''
        }
    }


    componentDidMount = () => {
        const parentId = localStorage.getItem('userId')
        this.setState({ parentId: parentId })

        if (localStorage.getItem('ID') == undefined) {
            axios({ method: 'post', url: `${PORTADDRESS}folder/userfolderdetails`, data: { id: parentId } })
                .then((result) => {
                    this.setState({
                        folders: result['data']['folders'],
                        files: result['data']['files'],
                        id: result['data']['_id'],
                        parentId: result['data']['parentId']
                    })
                    localStorage.setItem('ID', result['data']['_id'])
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            const id = localStorage.getItem('ID')
            this.folderdetails(id);
        }
    }


    folderdetails = (id) => {
        axios({ method: 'post', url: `${PORTADDRESS}folder/folderdetails`, data: { id: id } })
            .then((result) => {

                this.setState({
                    folders: result['data']['folders'],
                    files: result['data']['files'],
                    id: result['data']['_id'],
                    parentId: result['data']['parentId']
                })
                localStorage.setItem('ID', result['data']['_id'])
            })
            .catch((err) => console.log(err))
    }

    folderToggle = (event) => {
        event.preventDefault()
        this.setState({
            folderInput: !this.state.folderInput
        })
    }

    fileToggle = (event) => {
        event.preventDefault()
        this.setState({
            fileInput: !this.state.fileInput
        })
    }


    handleFileChange = (event) => {
        event.preventDefault()
        this.setState({ file: event.target.files[0] })
    }


    addFile = (event) => {

        event.preventDefault()
        const file = this.state.file
        const id = this.state.id
        const size = file['size']
        const fileName = file['name']
        const type = file['type'].split('/')[0]

        var data = new FormData()


        if (type == 'image') {
            data.append(type, file);
        }
        else if (type == 'application') {
            data.append(type, file);
        }
        else if (type == 'video') {
            data.append(type, file);
        }

        data.append('fileName', file['name'])
        data.append('id', id)


        if (file['size'] < 3000001 && file['size'] > 0) {
            fetch(`${PORTADDRESS}file/addfile`, { method: "POST", headers: { Accept: "multipart/form-data" }, body: data })
                .then((result) => {
                    this.setState({
                        fileInput: false
                    })
                    this.folderdetails(id)
                })
                .catch((err) => console.log(err))
        }
        else {
            toast.error('FILE SIZE EXCEEDED 3 mb size')
        }
    }



    addFolder = (event) => {
        event.preventDefault()
        const { folderName, id, parentId } = this.state
        const value = this.state.folders.some((user) => user['folderName'] == folderName)

        if (!value) {
            axios({ method: 'post', url: `${PORTADDRESS}folder/createFolder`, data: { folderName: folderName, id: id, parentId: parentId } })
                .then((result) => {
                    this.setState({ folderInput: false })

                    if (result['data']['folderName'] == folderName) {
                        toast.error('DUPLICATES FOLDERS IS NOT ALLOWED')
                    }
                    else {
                        this.folderdetails(id)
                    }
                })
                .catch((err) => console.log(err))
        }
        else {
            toast.error('DUPLICATED FOLDER NOT ALLOWED')
            this.setState({
                folderInput: false
            })
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    setFileId = (item) => {
        this.setState({
            fileId: item['fileId']
        })
    }

    deleteFile = (item) => {
        const { id } = this.state

        axios({ method: 'post', url: `${PORTADDRESS}file/removefile`, data: { id: item['fileId'], parentId: id } })
            .then((result) => {
                toast.success('OPERATION SUCCEESFULL')
            })
            .catch((err) => console.log(err))
        this.folderdetails(id)
    }


    render() {

        return (
            <>
                <Header />

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">

                        <li className="breadcrumb-item"><Link to="/dashboard">DASHBOARD</Link></li>
                        {this.state.parentId !== localStorage.getItem('userId') && <li className="breadcrumb-item" onClick={() => this.folderdetails(this.state.parentId)}><Link >PREVIOUS FOLDER</Link></li>}

                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-3">

                        <ul className="list-group">
                            <li className="list-group-item " ><FolderOpenIcon onClick={this.folderToggle} />  Add an folder</li>
                            <li className="list-group-item"><AddToPhotosIcon onClick={this.fileToggle} /> Add an file</li>
                            <li className="list-group-item"><Link to="/sharefilewithuser">Shared With User</Link></li>
                            <li className="list-group-item"><Link to="/usersharefile">Shared By User</Link></li>
                        </ul>

                        {this.state.fileId !== '' && <VIEWFILE fileId={this.state.fileId} /> || ' '}


                    </div>

                    <div className="col-md-9">

                        {this.state.folders.length == 0 && this.state.files.length == 0 &&

                            <div><Card className="card-empty"><h5>ADD SOME FOLDERS AND FILES</h5> </Card></div>}

                        {this.state.folders.length > 0 && <div className="text-center"><h5> TOTAL FOLDERS : {this.state.folders.length} </h5> </div>}
                        <div className="row">


                            {this.state.folders.length > 0 && <FOLDERS folders={this.state.folders} onFolderChange={() => this.folderdetails(this.state.id)} id={this.state.id} showFolder={this.folderdetails} parentId={this.state.parentId} /> || ''}

                        </div>
                        <div style={{ marginTop: "100px" }}></div>

                        {this.state.files.length > 0 && <div className="text-center"><h5>TOTAL FILES : {this.state.files.length} </h5> </div> || ''}

                        <div className="row">


                            {this.state.files.length > 0 && <FILES files={this.state.files} onFileChange={this.setFileId} onDeleteFile={this.deleteFile} parentId={this.state.parentId} /> || ''}


                        </div>

                    </div>

                </div>

                <Modal isOpen={this.state.folderInput}>
                    <ModalBody>
                        <div>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="folderName">FOLDER NAME</Label>
                                    <Input type="text" name="folderName" value={this.state.folderName} placeholder="Enter your foldername" onChange={this.handleChange} />
                                </FormGroup>
                                <Button type="submit" color="secondary" onClick={this.folderToggle}>CANCEL</Button>
                                <Button type="submit" color="success" onClick={this.addFolder}>ADD</Button>
                            </Form>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.fileInput} >
                    <ModalBody>
                        <div>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="file">UPLOAD FILE</Label>
                                    <Input type="file" name="file" onChange={this.handleFileChange} />
                                </FormGroup>
                                <Button type="submit" color="secondary" onClick={this.fileToggle}>Cancel</Button>
                                <Button type="submit" color="success" onClick={this.addFile}>UPLOAD</Button>
                            </Form>
                        </div>

                    </ModalBody>
                </Modal>
                <ToastContainer />

            </>
        )
    }

}

export default Dashboard;
import React, { useState } from 'react'
import { PORTADDRESS } from '../fileconstant'
import axios from 'axios'
import qs from 'qs'
import './styles.css'
import Header from './Header'

const File = (props) => {

    const [fileId, setFileId] = useState('')
    const [content, setContent] = useState('')
    const [contentType, setContentType] = useState('')


    function fetchInformation() {
        axios.post(`${PORTADDRESS}file/getfileinfo`, { id: props.fileId })
            .then((result) => {
                {
                    setFileId(result['data']['_id'])
                    setContent(result['data']['contentType'].split('/')[0])
                    setContentType(result['data']['contentType'])
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>

            {props.fileId !== fileId && fetchInformation() || ''}

            {fileId != '' && content === 'image' && contentType !== '' && <img src={`${PORTADDRESS}file/getfile?id=${fileId}`} width="300px" height="300px" alt="IMAGE TAG" className="mediaMargin" /> || ' '}

            {fileId != '' && content === 'video' && contentType !== '' && <video width="320px" height="200px" controls className="mediaMargin" ><source src={`${PORTADDRESS}file/getfile?id=${fileId}`} type={contentType} /> YOUR BROWSER DOES NOT SUPPORT VIDEO FORMAT</video> || ''}

            {fileId != '' && content === 'application' && contentType !== '' && <embed src={`${PORTADDRESS}file/getfile?id=${fileId}`} style={{ width: "350px", height: '450px' }} className="mediaMargin" /> || ' '}


        </>
    )


}

export default File
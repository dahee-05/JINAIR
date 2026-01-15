import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function QnaImaMulti({getFileName}) {
    const [oldFile,setOldFile] = useState([]); 


        const handleFileUploadMultiple = (e) => {
            const formData = new FormData();
            const files = e.target.files;
            for (const file of files) {
                formData.append('files', file);
            }
            formData.append ( 'oldFiles',oldFile ) ;  // 
            axios.post(`http://localhost:9000chatbot/QnaUpload?maxFiles=${files.length}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(res => {
                    console.log('업로드파일',res.data);                    
                    getFileName(res.data);
                    setOldFile(res.data.oldFile);
                })
                .catch(error => console.log(error));    
    }

    

    return (
        <>
            <Form.Control type='file' 
                onChange={(e)=>{handleFileUploadMultiple(e)}}   
                multiple   />
        </>
    );
}
'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function ServicesPage() {

    const [filesData, setFilesData] = useState({});

    const onFilesChangeHandler = (target) => {

        let mbody = new FormData();
        mbody.append('length', target.files.length);

        for (let i = 0; i < target.files.length; i++) {
            // console.log(target.files[i])
            mbody.append('files_' + i, target.files[i]);
        }
    
        setFilesData(mbody);

    }

    const handleSubmit = async (e) => {

        e.preventDefault();


        let response = await fetch('http://localhost:3000/api/multiple', {
            method: 'POST',
            body: filesData
        }).then((response) => response.json()).then((data) => console.log(data));

  

    }


    return (
        <div className={styles.page}>

            <h1>Edit Subscriptions</h1>

            <form onSubmit={handleSubmit}>
                <label> Choose File
                    <input type="file" name="files" placeholder="Select File" onChange={(e) => onFilesChangeHandler(e.target)} multiple/>
                </label>
                <button>Upload</button>
            </form>   

        </div>
    )
    
}
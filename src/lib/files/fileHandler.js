

/* 

    MCDM - FileHandler.js - 2021-04-20
    
    Denne fil indeholder funktioner til håndtering af filer.
    Vi kan arbejde med én subfolder. Hvis vi ikke angiver en subfolder, bliver filen gemt i /public/uploads.

    Har man brug for mere anvanceret filhåndtering skal man enten udvide eller overveje at benytte en tredjeparts løsning.
    Man kunne arbejde med en Blob storage løsning som fx Azure Blob Storage eller AWS S3.
*/

import { writeFile } from 'fs/promises';
import fs from 'fs';

export const fileHandler = async ({file, folder, fileName}) => {

    if(!file){
        return { success: false, message: 'Provide a file' }
    }
    
    // Check if a file name is provided
    let newFileName = fileName ? fileName : file.name;

    // Default folder name. Can be overwritten by providing a folder name
    let rootFolder = './public';
    let newFolderName = 'uploads';

    // Check if folder name is provided
    if(folder)
    {
        if(folder.match('^[a-zA-Z0-9_.-]*$')) {

            newFolderName = folder.toLowerCase().replaceAll(' ', '_');

        } else {

            return { success: false, message: 'Folder name can only contain letters, numbers, underscores, dashes and dots and no spaces' }
    
        }
       
    } 

    // Replace spaces with underscores and make lowercase
    newFileName = newFileName.replaceAll(' ', '_').toLowerCase();

    // Add file extension from original file. If no file name is provided, use original file name
    if(fileName)
    {
        newFileName = newFileName + '.' + file.name.split('.').pop().toLowerCase();
    }
    
    // Check if file already exists
    if(!fs.existsSync(`${rootFolder}/${newFolderName}`))
    {
        fs.mkdir(`${rootFolder}/${newFolderName}`, 
        { recursive: true }, (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            // console.log('Directory created successfully!'); 
        })

    }

    // Setting path for file
    const path = newFolderName ? `${rootFolder}/${newFolderName}/${newFileName}`: `${rootFolder}/${newFileName}`

    // Write file to path
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(path, buffer).catch((err) => {

        return { success: false }

    });
    
    return { success: true, file: newFileName, folder: newFolderName, path: `/${newFolderName}/${newFileName}` }
};

export const deleteFolder = async (dir) => {

    if(!fs.existsSync(dir))
    {

        return { success: false, message: 'No folder to delete' }

    } else {

        fs.rmSync(dir, { recursive: true, force: true });
        
        return { success: true, message: 'Folder deleted' }
    }

};

export const deleteFile = async (filepath) => {
    let rootFolder = './public';
    
    if(!fs.existsSync(`${rootFolder}/${filepath}`))
    {
        return { success: false, message: 'No file deleted' }
    }
    else {

        fs.unlinkSync(`${rootFolder}/${filepath}`)

        return { success: true, message: 'File deleted' }

    }

};

export const renameFile = async ({oldFilepath, newFilepath}) => {

    if(!fs.existsSync(`${rootFolder}/${oldFilepath}`))
    {
        return { success: false, message: 'No file to rename' }
    }
    else {

        fs.renameSync(`${rootFolder}/${oldFilepath}`, `${rootFolder}/${newFilepath}`)

        return { success: true, message: 'File renamed' }

    }

}
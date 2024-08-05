import React, { useState } from 'react'
import logo from './image/vs-code-logo-transp.png'
import bin from './image/bin.png'
import pencil from './image/pencil.png'
import plus from './image/plus.png'


export default function Home({ openEditor }) {
    const [folderName, setFolderName] = useState('')
    const [fileName, setFileName] = useState('')
    const [language, setLanguage] = useState('')
    const [creationFileIndex, setCreationFileIndex] = useState(-1)

    const [folders, setFolders] = useState([
       { name:'aman', files:[
            {name:'item 1-1',language: 'item 1-2'}]
       },
       { name:'verma', files:[
            {name:'item 2-1',language: 'item 2-2'}]
       },
    ])
    const createPlg = (folderIndex, newFile) => {
        console.log('createPlg running',creationFileIndex,language,newFile);
        setFolders(prevNestedArray =>
            prevNestedArray.map((folder, index) =>
            index === folderIndex ? { ...folder, files: [...folder.files, newFile] } : folder)
        )
    }

    const createFolder = (newFolder) => {
        newFolder.name=folderName
        newFolder.files=[{name:fileName,language: language}]
        setFolders([...folders, newFolder])
    }
    const languageMap={
        cpp:'cpp',
        python:'py',
        c:'c',
        Java:'js'
    }

    const deletePlg=(fileIndex,folderIndex)=>{
        const tempArray=folders[folderIndex]
        const tempFilesArray=[...tempArray.files]
        setFolders(prevFolders =>{
            const newFolders=[...prevFolders]
            const reqFolder=newFolders[folderIndex]
            const reqFile=[...reqFolder.files]
            reqFile.splice(fileIndex,1)
            reqFolder.files=reqFile;
            return newFolders;
        }
        )
        console.log('deletePlg running',fileIndex); 
    }
    const editPlg=()=>{
        console.log('delete running'); 
    }
    const deleteFolder=(folderIndex)=>{
        const tempArray=[...folders]
        tempArray.splice(folderIndex,1)
        setFolders(tempArray)
        console.log('deleteFolder running',tempArray); 
    }
    const editFolder=(folderIndex)=>{
        console.log('delete running'); 
    }


    return (
        <div className="bigbox flexdisplay">
            <div id="box1" className="flexdisplay">
                <div>
                    <img src={logo} alt="vscodeimage" width="200px" />
                    <p className="flexdisplay textwhite my-2"><span id="text1" className="text">Code</span>&nbsp;<span id="text2"
                        className="text">Park</span></p>
                    <p className="flexdisplay textwhite belowtext my-0">
                        <span className="text3">Play.</span><span className="text3">Create.</span><span
                            className="text3">Innovate</span>
                    </p>
                    <a href="#addelement1"><button type="button"  className="btn btn-light">+ Create New Playground</button></a>
                </div>
            </div>

            <div id="box2">
                <div className="d-flex justify-content-between my-4 mx-3 sidebox1">
                    <span>My Playground</span>
                    <a href="#addelement2"><span>+ New Folder</span></a>
                </div>
                {folders.map((folder, folderIndex) => (
                    // return(
                    <div key={folderIndex} >
                        <div className="d-flex justify-content-between my-4 mx-3 sidebox1 ">
                            <span >
                                {/* <img src="folder.png" alt="folderpng" height="15px" width="15px" style="margin-right:10px;" /> */}
                                {folder.name}
                            </span>
                            <span>
                                <a href="#" onClick={()=>deleteFolder(folderIndex)}><img src={bin} alt="bin" height="15px" width="15px"
                                    className='mx-2' /></a>
                                <a href="#editFolderBox" onClick={editFolder}><img src={pencil} alt="pencil" height="15px" width="15px"
                                    className='mx-2' /></a>
                                <a href='#addelement3' onClick={()=>setCreationFileIndex(folderIndex)} ><img src={plus} alt="bin" height="15px"
                                    width="15px" className='mx-2' />
                                    New Playground</a>
                            </span>

                        </div>

                        <div className="d-flex flex-wrap justify-content-between my-4 mx-3">
                            {folder.files.map((file, fileIndex) => {
                                return (
                                    <div onClick={()=>openEditor(file.name)}  key={fileIndex} className="coursebox d-flex justify-content-between align-items-center my-2">
                                        <div className="start d-flex mx-2">
                                            <img src={logo} alt="pencil" height="60px" width="50px" />
                                            <p className="mx-3 mt-2 small font-weight-bold ">{file.name}.{languageMap[language]}<br />Language: {file.language}</p>
                                        </div>
                                        <div>
                                            <a href="#" onClick={()=>deletePlg(fileIndex,folderIndex)} ><img src={bin} alt="bin" height="15px"
                                                width="15px" className='margin-right' /></a>
                                            <a href="#" onClick={editPlg}><img src={pencil} alt="pencil" height="15px" width="15px"
                                                className='margin-right mx-2' /></a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}


                <div>
                    <div className='addelement' id='editedFolderBox'><input  className="form-control" type="text" placeholder="Readonly input here…" readonly/></div>
                    <div className="addelement" id="addelement1">
                        <span className=" mx-4 belowtext my-4">Create New Playground & Create New Folder</span>
                        <a href="#"><button type="button" className="btn btn-dark my-2 closebtn " id="closeinput" >X</button></a>
                        <form onSubmit={createFolder}>
                            <div className="form-group row d-flex justify-content-between mt-5 mx-4">
                                <label for="staticEmail" className="col-sm-4 col-form-label">Enter Folder Name</label>
                                <div className="col-sm-7">
                                    <input value={folderName} onChange={(e)=>setFolderName(e.target.value)} className="form-control" id="foldername" placeholder="Folder Name" />
                                </div>
                            </div>
                            <div className="form-group row d-flex justify-content-between mx-4 mt-2">
                                <label for="inputPassword" className="col-sm-4 col-form-label ">Enter Card Name</label>
                                <div className="col-sm-7 ">
                                    <input value={fileName} onChange={(e)=>setFileName(e.target.value)} className="form-control" id="cardname" placeholder="Card Name" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between my-4 mx-4">
                                <select onChange={(e)=>setLanguage(e.target.value)} className="form-select form-select-sm" id="language" aria-label=".form-select-sm example">
                                    {/* <option selected>C</option> */}
                                    <option value="cpp">cpp</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                </select>
                                <button type="submit" className="btn btn-dark" >Create Playground</button>
                            </div>
                        </form>
                    </div>


                    <div id="addelement2" className="addelement">

                        <div className="d-flex justify-content-between my-2 mx-4">
                            <span className=" belowtext">Create New Folder</span>
                            <a href="#"><button type="button" id="closeinput2" className="btn btn-dark closebtn" >X</button></a>
                        </div>
                        <form onSubmit={createFolder} className="row g-3 d-flex justify-content-between my-2 mx-4">
                            <div className="col-auto">
                                <label for="inputPassword2" className="visually-hidden">Password</label>
                                <input value={folderName} onChange={(e) => setFolderName(e.target.value)} className="form-control" id="inputPassword2" placeholder="Enter Folder Name" />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-dark mb-3" >Create Folder</button>
                            </div>
                        </form>
                    </div>

                    <div id="addelement3" className="addelement">
                        <div className="d-flex justify-content-between my-2 mx-4">
                            <span className=" belowtext">Create New Playground</span>
                            <a href="#" id='closebtn'><button type="button" className="btn btn-dark closebtn" id="closeinput3 " >X</button></a>
                        </div>
                        <div  className="row g-3 d-flex justify-content-between my-2 mx-4">
                            <div className="col-auto">
                                <label for="inputPassword3" className="visually-hidden">Password</label>
                                <input value={fileName} onChange={(e) => setFileName(e.target.value)} className="form-control" id="inputPassword3" placeholder="Enter Playground Name" />
                            </div>
                            <div>
                                <select onChange={(e)=>setLanguage(e.target.value)} className="form-select form-select-sm" aria-label=".form-select-sm example" id="language2">
                                    {/* <option selected>C</option> */}
                                    <option value="cpp">cpp</option>
                                    <option value="Java">Java</option>
                                    <option value="Python">Python</option>
                                </select>
                                <input type="text" id="idvalue" />
                            </div>
                            <div className="col">
                                <button onClick={()=>createPlg(creationFileIndex,{name:`${fileName}`,language:`${language}`})} className="btn btn-dark mb-3" >Create Playground</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


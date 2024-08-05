import React, { useState } from 'react'
import logo from './image/vs-code-logo-transp.png'
import pencil from './image/pencil.png'
import axios from 'axios'
import Editor from '@monaco-editor/react'
export default function Code({plgName}) {
    const [output, setOutput] = useState('')
    const [input, setInput] = useState('')
    const [screenSize, setScreenSize] = useState('Full Screen')
    const [code, setCode] = useState(`#include <iostream>
using namespace std;
    int main() {
    cout << "Hello World!";
    return 0;
    }`)
    const [language, setLanguage] = useState('cpp')

    const handleLanguage = () => {
        let value = document.getElementById('languageTag').value
        console.log(value, language);

        setLanguage(value)
        // if(language){
        // console.log(language);
        // }
        console.log('language running', language, value);
        if (value === 'python') {
            setCode('print("Hello World!")')
        }
        else if (value === 'java') {
            setCode(`public class Main {
public static void main(String[] args) {
    System.out.println("Hello World!");
    }
}`)
        }
        else if (value === 'cpp') {
            setCode(`#include <iostream>
using namespace std;
    int main() {
    cout << "Hello World!";
    return 0;
    }`)
        }
        console.log(code);



    }

    // const [downloadState,setDownloadState]=useState('')

    const handleDownloadOutput = () => {
        const data = output
        handleDownload(data)
    }
    const handleDownloadCode = () => {
        if (code) {
            const data = code
            handleDownload(data)
        }
    }

    const handleDownload = (data) => {
        console.log('handleDownload Running')
        if (data) {
            // const data=output
            const blob = new Blob([data], { type: 'text/plain' })
            const url = window.URL.createObjectURL(blob)
            const atag = document.createElement('a')
            atag.href = url
            atag.download = 'output.txt'
            document.body.appendChild(atag)
            atag.click()
            document.body.removeChild(atag)
            window.URL.revokeObjectURL(url)
        }
    }

    const handleFullScreen = () => {
        if (screenSize === 'Full Screen') {
            setScreenSize('Minimise Screen')
            document.getElementById('topbar').classList.add('display-none')
            document.getElementById('bigbox').classList.add('flex-column')
            document.getElementById('box1').classList.add('full')
            document.getElementById('box2').classList.add('full')
        }
        else {
            setScreenSize('Full Screen')
            document.getElementById('topbar').classList.remove('display-none')
            document.getElementById('bigbox').classList.remove('flex-column')
            document.getElementById('box1').classList.remove('full')
            document.getElementById('box2').classList.remove('full')

        }

    }
    const handleInput = (importedFile)=>{
        const file = importedFile.target.files[0]
        console.log('handleInputValue running');
        
        if (file) {
            const read = new FileReader(file)
            read.onload = (e) => {
                console.log(read.result);
                setInput(read.result)
            }
            // console.log(read,code);
            read.readAsText(file)
        }
    }

    const handleCodeInput = (event) => {
        console.log('handleCodeInput running');
        const file = event.target.files[0]
        if (file) {
            const read = new FileReader(file)
            read.onload = (e) => {
                console.log(read.result);
                setCode(read.result)
            }
            // console.log(read,code);
            read.readAsText(file)
        }
    }

    const languageCodeMap = {
        cpp: 54,
        python: 92,
        java: 91,
        c: 93
    }

    async function GetSubmissin(tokenId) {
        console.log('getsubmission running', tokenId);

        const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "ccbace7427mshfc3355546a7a3a9p109ec6jsnccc0f48b0dc5",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(atob(result.stdout));
            setOutput(atob(result.stdout))

            return result;
        } catch (error) {
            console.log(error);

            //   callback({ apiStatus: "error", message: JSON.stringify(error) });
        }
    }



    async function handleCodeRun() {
        console.log('handleCoderun running', code, btoa(code));
        const url =
            "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
        const httpoptions = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "ccbace7427mshfc3355546a7a3a9p109ec6jsnccc0f48b0dc5",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
            body: JSON.stringify({
                language_id: languageCodeMap[language],
                source_code: btoa(code),
                // stdin: btoa(stdin),
            }),
        };

        try {
            //   callback({ apiStatus: "loading" });
            const response = await fetch(url, httpoptions);
            const result = await response.json();
            const tokenid = result.token;
            let statusCode = 1;
            let apiSubmissinResult;
            let ApiSubmissinResultObject;
            while (statusCode === 1 || statusCode === 2) {
                try {
                    apiSubmissinResult = await GetSubmissin(tokenid);
                    ApiSubmissinResultObject = JSON.parse(apiSubmissinResult);
                    statusCode = ApiSubmissinResultObject["status_id"];
                    alert('SaveCode success')
                } catch (error) {
                    console.log(error);

                    //   callback({ apiStatus: "error", message: JSON.stringify(error) });
                    break;
                }
            }
            if (ApiSubmissinResultObject) {
                // callback({ apiStatus: "success", data: ApiSubmissinResultObject });
            }
        } catch (error) {

            console.log(error);

        }
    }
    const saveCode = async () => {
        console.log('saveCode running', code);
        try {
            if (code) {
                const encodedCode = btoa(code)
                console.log(encodedCode);
                const res = await axios.post('http://localhost:3000/savecode', { encodedCode })
                console.log(res, 'savecode success from frontend');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeCode=(updatedCode)=>{
        console.log(updatedCode);
        setCode(updatedCode)
        
    }

    return (
        // <div>
        <div>
            <nav className="navbar navbar-dark bg-dark d-flex justify-content-center align-items-center ">
                <div className='mx-2'> <img src={logo} alt='logo' height='50px' width='50px' /></div>
                <div className="text-bg-dark fs-1">CodePark</div>
            </nav>
            <div className="d-flex" id='bigbox'>
                <div className='border box1' >
                    <div id="topbar" className="topbar d-flex justify-content-between " >
                        <div className="cl border d-flex align-items-center">
                            <p className='fs-5 '>{plgName}</p>
                            {/* <button type="button" class="btn btn-info">Info</button> */}
                            <a href="#"  className='mx-2'><img src={pencil} alt="edit" height='15px' width='15px' /></a>
                            <button onClick={saveCode} type="button " className="btn btn-info rounded-pill mx-2">Save Code</button>
                        </div>
                        <div className="cr border d-flex">
                            <select onChange={handleLanguage} id='languageTag' className="form-select form-select-sm" aria-label="Small select example">
                                {/* <option selected>{language}</option> */}
                                <option value="cpp">cpp</option>
                                <option value="java">java</option>
                                <option value="python">python</option>
                                <option value="c">C</option>
                            </select>
                            <div className="dropdown mx-2">
                                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Theme
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">githubDark</a></li>
                                    <li><a className="dropdown-item" href="#">githubLight</a></li>
                                    <li><a className="dropdown-item" href="#">veronica</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Editor
                        height={500} 
                        language={language} 
                        onChange={onChangeCode}
                        className="codearea half"
                        id='codearea'
                        value={code}
                        />
                    {/* <textarea value={code} onChange={(e) => setCode(e.target.value)} className="codearea half" id='codearea'></textarea> */}
                    <div className='d-flex justify-content-between'>
                        <p onClick={handleFullScreen} className='fs-5'>{screenSize}</p>
                        <label for="formFileSm1" className="form-label fs-5">Import Code</label>
                        <input onChange={handleCodeInput} className="form-control form-control-sm visually-hidden" id="formFileSm1" type="file" />
                        {/* <p className='fs-5'>Import Code</p> */}
                        <a href='#'><p onClick={handleDownloadCode} className='fs-5'>Export Code</p></a>
                        <button onClick={handleCodeRun} type="button " className="btn btn-info rounded-pill">Run Code</button>
                    </div>
                </div>
                <div className='border box2' >
                    <div className="input coderun">
                        <div className='d-flex justify-content-between align-items-center coderunnav'>
                            <p className='fw-semibold fs-5 mx-1' >Input :</p>
                            <div className="mb-3 ">
                                <label for="formFileSm2" className="form-label fs-5">Import Input</label>
                                <input onChange={handleInput} className="form-control form-control-sm visually-hidden"  id="formFileSm2"  type="file" />
                            </div>
                        </div>
                        <div>{input}</div>
                        {/* <textarea value={input} onChange={(e)=>setInput(e.target.value)} type='text'></textarea> */}
                    </div>
                    <div className="output coderun mx-2">
                        <div className='d-flex justify-content-between align-items-baseline coderunnav'>
                            <p className='fw-semibold fs-5' >Output :</p>
                            <a onClick={handleDownloadOutput} value={output} onChange={(e) => setOutput(e.target.value)}><p className='fs-5' >Export Output</p></a>
                        </div>
                        <div>{output}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}



import logo from './logo.svg';
import './App.css';
import Code from './components/Code'
import Home from './components/Home'
import { useState } from 'react';


function App() {
  const [editor,setEditor]=useState(false)
  const [plgName,setPlgName]=useState('')
  const openEditor=(plgname)=>{
    setEditor(true)
    setPlgName(plgname)
  }
  return (
    <>
    {editor ? <Code plgName={plgName}/> :<Home  openEditor={openEditor} />}
    {/* <Code/> */}
    </>

  );
}

export default App;

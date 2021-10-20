import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

let user;
const sendUser=()=>{
    user=document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
}

const Login=()=>{

    const [name,setName]=useState("")
    return (
        <div>
            <div className="JoinPage">
                <div className="JoinContainer">
                   <h1>V Chat</h1>
                   <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Your Name" id="joinInput"/>
                   <Link to='/chat' onClick={(e)=>name===""?e.preventDefault():null}><button onClick={sendUser} className="joinbtn">Login</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
export {user};
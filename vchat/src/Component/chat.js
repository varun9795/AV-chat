import React, { useEffect, useState } from "react";
import {user} from './login'
import socketIO from "socket.io-client";
import './chat.css';
import Message from './Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';


let socket;
const ENDPOINT='https://varun-chat.herokuapp.com/';


const Chat=()=>{

    const [id,setid]=useState("");
    const [messages,setMessages]=useState([])

    const send=()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id})
        document.getElementById('chatInput').value="";
    }

    useEffect(()=>{
        socket = socketIO(ENDPOINT , { transports:['websocket']});
        socket.on('connect',()=>{
            // alert("connected");
            setid(socket.id)
        })

        socket.emit('joined',{user})

        socket.on('welcome',(data)=>{
            setMessages([...messages,data])
            console.log(data.user,data.message);
        })

        // socket.on('userJoined',(data)=>{
        //     setMessages([...messages,data])
        //     console.log(data.user,data.message);
        // })

        // socket.on('leave',(data)=>{
        //     setMessages([...messages,data])
        //     console.log(data.user,data.message)
        // })

        return ()=>{
            socket.emit('disconnect')
            socket.off();
        }
    },[])

    useEffect(()=>{
        socket.on('userJoined',(data)=>{
            setMessages([...messages,data])
            console.log(data.user,data.message);
        })

        socket.on('leave',(data)=>{
            setMessages([...messages,data])
            console.log(data.user,data.message)
        })
        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data])
           console.log(data.user,data.message)
        })
        return ()=>{
            socket.off();
        }
    },[messages])
    return(
        <div className="chatPage">
           <div className="chatContainer">
             <div className="header">
                 <h2>V Chat</h2>
                 <a href='/'>Logout</a>
             </div>
             <ReactScrollToBottom className="chatBox">
                 {messages.map((item,i)=>{
                    return <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>
                 })}
             </ReactScrollToBottom>
             <div className="inputBox">
                 <input onKeyPress={(e)=>e.key==='Enter'?send():null} type="text" id="chatInput"/>
                 <button onClick={send} className="sendBtn">Send</button>
             </div>
           </div>
        </div>
    )
}

export default Chat;
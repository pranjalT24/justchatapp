import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { user } from '../Login/Login'
import socketIo from "socket.io-client"
import Message from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"

const ENDPOINT = "https://justchatappbypranjal.herokuapp.com/";
let socket;

const Chat = () => {

    const [id, setid] = useState("")
    const [messages, setmessages] = useState([])

    const send = () => {
        const message = document.getElementById("messageBox").value;
        socket.emit("message", { message, id });
        console.log(id);
        document.getElementById("messageBox").value = "";
    }

    useEffect(() => {

        socket = socketIo(ENDPOINT, { transports: ['websocket'] })

        //socket.on is use to recive data from server to client
        socket.on("connect", () => {
            alert("Connected")
            setid(socket.id);
        })

        //socket.emit is use to send data from client to server
        socket.emit("joined", { user })

        //welcome event 
        socket.on("welcome", (data) => {
            setmessages([...messages, data])
            console.log(data.user + " " + data.message);
        })

        //userjoined event
        socket.on("userjoined", (data) => {
            setmessages([...messages, data])
            console.log(data.user + " " + data.message);
        })

        //userleave event
        socket.on("userleft", (data) => {
            setmessages([...messages, data])
            console.log(data.user + " " + data.message);
        })

        return () => {
            socket.emit("disconnect");
            socket.off();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //this use effect is for fetching of the message 
    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setmessages([...messages, data])
            console.log(data);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <section className="vh-100  gradient-custom d-flex justify-content-center align-items-center py-2">
            <div className="container justchat_main bg-dark h-100">
                <div className="header_chatbox"><h2 className="fw-bold my-3 mx-2 text-uppercase">JUST <span className="justchat-logo-text">CHAT</span></h2>
                    <a href="/" className='closeIconLink'>  <i class="fas fa-times-circle"></i></a>
                </div>
                <ReactScrollToBottom className="message_container mx-2 my-3 bg-primary py-2">
                    {messages.map((item, i) => <Message message={item.message} user={item.id === id ? "" : item.user} classes={item.id === id ? "right" : "left"} />)
                    }
                </ReactScrollToBottom>
                <div className="control_container mx-2 pb-2">
                    <input type="text" className="message_box" id='messageBox' />
                    <button className="message_send btn d-flex justify-content-center align-items-center" onClick={send} >
                        <i className="far fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Chat

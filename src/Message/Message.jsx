import React from 'react'
import "./Message.css"
const Message = ({ user, message, classes }) => {

    if (user) {
        return (
            <div className={`sended_message m-3 p-3 ${classes}`}>
                {`${user}: ${message}`}
            </div>
        )
    } else {
        return (
            <div className={`sended_message m-3 p-3 ${classes}`}>
                {`You: ${message}`}
            </div>
        )
    }


}

export default Message

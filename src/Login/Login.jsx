import React, { useState } from 'react'
import "./Login.css"
import { Link, Redirect } from 'react-router-dom'

let user;

const Login = () => {

    const sendUser = () => {
        user = document.getElementById("usernameinput").value;
        document.getElementById("usernameinput").value = "";
    }

    const [userName, setuserName] = useState("")

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase logo_text">JUST CHAT</h2>
                                    <div className="form-outline form-white my-4">
                                        <input type="text" id="usernameinput" className="form-control form-control-lg"
                                            onChange={(e) => setuserName(e.target.value)} />
                                        <label className="form-label" for="usernameinput">ENTER YOUR NAME</label>
                                    </div>
                                    <Link onClick={(e) => !userName ? e.preventDefault() : null} to="/chat">
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={sendUser}>Join Chat</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
export { user }

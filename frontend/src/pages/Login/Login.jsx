import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { VscEyeClosed, VscEye } from "react-icons/vsc"
import InputField from '../../components/subComponents/InputField'
import signin from "../../images/signin-image.jpg"
import "../../css/loginOrSignup.css"
import Navbar from "../../components/Navbar"
import { UserContext } from "../../App"
import { SERVER_URL } from '../../constants'


const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("staff");
    const [showPassword, setShowPassword] = useState(false);

    const onType = () => {
        setError("");
    };

    const loginUser = async (e) => {
        e.preventDefault();

        const config = { withCredentials: true }

        localStorage.setItem("emailId", JSON.stringify(email));

        if (!email || !password) {
            setError("Fill all the fields");
        } else {
            axios.post(`${SERVER_URL}/${activeTab}/login`, { email, password }, config)
                .then((res) => {
                    dispatch({ type: "USER", payload: activeTab });

                    navigate('/');
                })
                .catch(err => {
                    setError(err.response.data.error);
                });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container-main">
                <div className="container">
                    <Tabs className="register-tab">
                        <TabList className="register-tab-menu">
                            <Tab className={"staff" === activeTab ? `register-tab-menu-item-active` : `register-tab-menu-item`} onClick={() => { setActiveTab("staff"); console.log(activeTab) }}>
                                <h1>Staff</h1>
                            </Tab>
                            <Tab className={"user" === activeTab ? `register-tab-menu-item-active` : `register-tab-menu-item`} onClick={() => { setActiveTab("user"); console.log(activeTab) }}>
                                <h1>User</h1>
                            </Tab>
                        </TabList>

                        <TabPanel className="register-tab-content">
                            <div className="signin-content">
                                <div className="signin-image">
                                    <figure><img src={signin} alt="img" /></figure>
                                    <div className='below-image'>
                                        <span className="new-here">New here?</span>
                                        <NavLink to="/register" className="signup-image-link">Create an account</NavLink>
                                    </div>
                                </div>
                                <div className="signin-form">
                                    <h2 className="form-title">Sign In</h2>
                                    <form method="POST" className="register-form" id="login-form">

                                        <InputField htmlFor="your_name" className="zmdi zmdi-account material-icons-name" type="text" name="your_email" id="your_email"
                                            value={email} onChange={event => setEmail(event.target.value)} placeholder="Your Email"
                                            onType={onType}
                                        />

                                        <div className="form-group">
                                            <label htmlFor="pass"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                            <input type={showPassword ? "text" : "password"} name="password" id="pass" autoComplete='off'
                                                value={password}
                                                onChange={event => setPassword(event.target.value)}
                                                placeholder="Password"
                                                onClick={onType}
                                            />
                                            <div className='eye-div' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VscEye style={{ color: "blue" }} /> : <VscEyeClosed />}</div>
                                        </div>

                                        <span className="form-error" style={{ display: error ? "block" : "none" }}>{error}</span>

                                        {(password && email) ? (
                                            <div className="form-group form-button">
                                                <input method="" type="submit" name="signin" id="signin" className="form-submit"
                                                    value="Log in" onClick={loginUser} />
                                            </div>
                                        ) : (<div className="form-group form-not-button">
                                            <input method="" type="submit" name="signin" id="signin" className="form-not-submit"
                                                value="Fill the form" onClick={loginUser} />
                                        </div>)}

                                    </form>
                                    <div className="forgot-password">
                                        <div className='below-image'>
                                            <span className="new-here">Forgot password?</span>
                                            <NavLink to="/forgotPassword" className="signup-image-link">Need help</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="register-tab-content">
                            <div className="signin-content">
                                <div className="signin-image">
                                    <figure><img src={signin} alt="img" /></figure>
                                    <div className='below-image'>
                                        <span className="new-here">New here?</span>
                                        <NavLink to="/register" className="signup-image-link">Create an account</NavLink>
                                    </div>
                                </div>
                                <div className="signin-form">
                                    <h2 className="form-title">Sign In</h2>
                                    <form method="POST" className="register-form" id="login-form">

                                        <InputField htmlFor="your_name" className="zmdi zmdi-account material-icons-name" type="text" name="your_email" id="your_email"
                                            value={email} onChange={event => setEmail(event.target.value)} placeholder="Your Email"
                                            onType={onType}
                                        />

                                        <div className="form-group">
                                            <label htmlFor="pass"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                            <input type={showPassword ? "text" : "password"} name="password" id="pass" autoComplete='off'
                                                value={password}
                                                onChange={event => setPassword(event.target.value)}
                                                placeholder="Password"
                                                onClick={onType}
                                            />
                                            <div className='eye-div' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VscEye style={{ color: "blue" }} /> : <VscEyeClosed />}</div>
                                        </div>

                                        <span className="form-error" style={{ display: error ? "block" : "none" }}>{error}</span>

                                        {(password && email) ? (
                                            <div className="form-group form-button">
                                                <input method="" type="submit" name="signin" id="signin" className="form-submit"
                                                    value="Log in" onClick={loginUser} />
                                            </div>
                                        ) : (<div className="form-group form-not-button">
                                            <input method="" type="submit" name="signin" id="signin" className="form-not-submit"
                                                value="Fill the form" onClick={loginUser} />
                                        </div>)}

                                    </form>
                                    <div className="forgot-password">
                                        <div className='below-image'>
                                            <span className="new-here">Forgot password?</span>
                                            <NavLink to="/forgotPassword" className="signup-image-link">Need help</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default Login

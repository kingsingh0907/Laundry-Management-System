import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import PasswordStrengthBar from "react-password-strength-bar";
import InputField from "../../components/subComponents/InputField";
import signup from "../../images/signup-image.jpg";
import "../../css/loginOrSignup.css";
import Navbar from "../../components/Navbar"

import { SERVER_URL } from "../../constants";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", phone: "", registration: "", room: "", password: "", cpassword: "" });
  const [staff, setStaff] = useState({ name: "", email: "", phone: "", staffId: "", password: "", cpassword: "" });

  const [error, setError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [activeTab, setActiveTab] = useState("staff");

  const onType = () => {
    setError("");
  };

  const handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleStaffInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setStaff({ ...staff, [name]: value });
  };

  const postData = async (event) => {
    event.preventDefault();

    if (activeTab === "staff") {
      if (!staff.name || !staff.email || !staff.phone || !staff.staffId || !staff.password || !staff.cpassword) {
        setError("Fill all the fields");
      } else {
        if (staff.password !== staff.cpassword) {
          setError("Passwords didn't match");
        } else {
          localStorage.setItem("emailId", JSON.stringify(user.email));
          axios
            .post(`${SERVER_URL}/${activeTab}/register`, staff)

            .then((res) => {
              console.log(res);
              window.alert(" Registration successfull");

              navigate("/login");
            })
            .catch((err) => {
              setError(err.response.data.error);
            });
        }
      }
    } else {
      if (!user.name || !user.email || !user.phone || !user.registration || !user.room || !user.password || !user.cpassword) {
        setError("Fill all the fields");
      } else {
        if (user.password !== user.cpassword) {
          setError("Passwords didn't match");
        } else {
          localStorage.setItem("emailId", JSON.stringify(user.email));

          axios
            .post(`${SERVER_URL}/${activeTab}/register`, user)
            .then((res) => {
              window.alert(" Registration successfull");

              navigate("/login");
            })
            .catch((err) => {
              setError(err.response.data.error);
            });
        }
      }
    }
  };


  return (
    <>
      <Navbar />
      <section className="container-main">
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
              <div className="signup-content">
                <div className="signup-form">
                  <form method="" className="register-form" id="register-form">

                    <InputField htmlFor="name" className="zmdi zmdi-account material-icons-name" type="text" name="name" id="name"
                      value={staff.name}
                      onChange={handleStaffInput}
                      placeholder="Your Name"
                      onType={onType}
                    />

                    <InputField htmlFor="email" className="zmdi zmdi-email material-icons-name" type="email" name="email" id="email"
                      value={staff.email}
                      onChange={handleStaffInput}
                      placeholder="College Email"
                      onType={onType}
                    />

                    <InputField htmlFor="phone" className="zmdi zmdi-phone material-icons-name" type="tel" name="phone" id="phone"
                      value={staff.phone}
                      onChange={handleStaffInput}
                      placeholder="Phone No."
                      onType={onType}
                    />

                    <InputField htmlFor="staffId" className="zmdi zmdi-assignment-account material-icons-name" type="text" name="staffId" id="staffId"
                      value={staff.staffId}
                      onChange={handleStaffInput}
                      placeholder="Staff ID"
                      onType={onType}
                    />

                    <div className="form-group">

                      <label htmlFor="pass"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                      <input type={showPassword1 ? "text" : "password"} name="password" id="pass" autoComplete="off"
                        value={staff.password}
                        onChange={handleStaffInput}
                        placeholder="Password"
                        onClick={onType}
                      />

                      <div className="eye-div" onClick={() => setShowPassword1(!showPassword1)}>
                        {showPassword1 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    <div className="password-strength"><PasswordStrengthBar password={staff.password} /></div>

                    <div className="form-group">

                      <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline material-icons-name"></i></label>
                      <input type={showPassword2 ? "text" : "password"} name="cpassword" id="re_pass" autoComplete="off"
                        value={staff.cpassword}
                        onChange={handleStaffInput}
                        placeholder="Confirm password"
                        onClick={onType}
                      />

                      <div className="eye-div" onClick={() => setShowPassword2(!showPassword2)}>
                        {showPassword2 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    <span className="form-error" style={{ display: error ? "block" : "none" }}>{error}</span>

                    {staff.name && staff.email && staff.phone && staff.staffId && staff.password && staff.cpassword ? (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-submit"
                          value="Register"
                          onClick={postData}
                        />
                      </div>
                    ) : (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-not-submit"
                          value="Fill the form"
                          onClick={postData}
                        />
                      </div>
                    )}
                  </form>
                </div>

                <div className="signup-image">
                  <figure><img src={signup} alt="img" /></figure>
                  <div className="below-image">
                    <span className="new-here">Already member?</span>
                    <NavLink to="/login" className="signup-image-link">Login here</NavLink>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="register-tab-content">
              <div className="signup-content">
                <div className="signup-form">
                  <form method="" className="register-form" id="register-form">

                    <InputField htmlFor="name" className="zmdi zmdi-account material-icons-name" type="text" name="name" id="name"
                      value={user.name}
                      onChange={handleUserInput}
                      placeholder="Your Name"
                      onType={onType}
                    />

                    <InputField htmlFor="email" className="zmdi zmdi-email material-icons-name" type="email" name="email" id="email"
                      value={user.email}
                      onChange={handleUserInput}
                      placeholder="College Email"
                      onType={onType}
                    />

                    <InputField htmlFor="phone" className="zmdi zmdi-phone material-icons-name" type="tel" name="phone" id="phone"
                      value={user.phone}
                      onChange={handleUserInput}
                      placeholder="Phone No."
                      onType={onType}
                    />

                    <InputField htmlFor="registration" className="zmdi zmdi-assignment-account material-icons-name" type="number" name="registration" id="registration"
                      value={user.registration}
                      onChange={handleUserInput}
                      placeholder="Registration No."
                      onType={onType}
                    />

                    <InputField htmlFor="room" className="zmdi zmdi-hotel material-icons-name" type="text" name="room" id="room"
                      value={user.room}
                      onChange={handleUserInput}
                      placeholder="Room No."
                      onType={onType}
                    />

                    <div className="form-group">

                      <label htmlFor="pass"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                      <input type={showPassword1 ? "text" : "password"} name="password" id="pass" autoComplete="off"
                        value={user.password}
                        onChange={handleUserInput}
                        placeholder="Password"
                        onClick={onType}
                      />

                      <div className="eye-div" onClick={() => setShowPassword1(!showPassword1)}>
                        {showPassword1 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    <div className="password-strength"><PasswordStrengthBar password={user.password} /></div>

                    <div className="form-group">

                      <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline material-icons-name"></i></label>
                      <input type={showPassword2 ? "text" : "password"} name="cpassword" id="re_pass" autoComplete="off"
                        value={user.cpassword}
                        onChange={handleUserInput}
                        placeholder="Confirm password"
                        onClick={onType}
                      />

                      <div className="eye-div" onClick={() => setShowPassword2(!showPassword2)}>
                        {showPassword2 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    <span className="form-error" style={{ display: error ? "block" : "none" }}>{error}</span>

                    {user.name && user.email && user.phone && user.registration && user.room && user.password && user.cpassword ? (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-submit"
                          value="Register"
                          onClick={postData}
                        />
                      </div>
                    ) : (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-not-submit"
                          value="Fill the form"
                          onClick={postData}
                        />
                      </div>
                    )}
                  </form>
                </div>

                <div className="signup-image">
                  <figure><img src={signup} alt="img" /></figure>
                  <div className="below-image">
                    <span className="new-here">Already member?</span>
                    <NavLink to="/login" className="signup-image-link">Login here</NavLink>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Register;

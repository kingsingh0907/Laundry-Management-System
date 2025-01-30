import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "../About/about.css"
import Navbar from  "../../components/Navbar"
import aboutPic from "../../images/about.png"
import UpdateProfile from "../../components/UpdateProfile"
import { SERVER_URL } from '../../constants'

const About = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const config = { withCredentials: true }
    axios.get(`${SERVER_URL}/user/getData`, config)
      .then((result) => {
        setUserData(result.data);
        console.log(result.data);

      }).catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  return (
    <>
    <Navbar/>
      <div className="container-main">
        <div className="emp-profile">
          <h2>Staff Profile</h2>

          <form method="GET">
            <div className="row ">

              <div className="profile-photo">
                <img src={userData?.image ? userData?.image : aboutPic} className="pphoto" alt="profile photo" />

                <UpdateProfile />

              </div>
            </div>
            <div className='about-details'>
              <div>Student Name</div>
              <div>{userData?.name}</div>
              <div>Student Email</div>
              <div>{userData?.email}</div>
              <div>Staff ID</div>
              <div>{userData?.userId || userData?.staffId}</div>
              <div>Phone No.</div>
              <div>{userData?.phone}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default About

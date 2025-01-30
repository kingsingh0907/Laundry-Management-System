import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../Home Page/home.css"
import Navbar from "../../components/Navbar"
import { SERVER_URL } from '../../constants'
import { UserContext } from "../../App"

const Home = () => {

  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);

  // useEffect(() => {
  //   const config = { withCredentials: true }
  //   axios.get(`${SERVER_URL}/`, config)
  //     .then((result) => {

  //       dispatch({ type: "USER", payload: true });

  //     }).catch((err) => {
  //       dispatch({ type: "USER", payload: false });
  //       console.log(err);
  //       navigate("/login");
  //     });
  // }, []);

  return (
    <>
      <Navbar />
      <section className='body'>
        <h2 className='heading'>Laundry Management System</h2>
      </section>
    </>
  )
}

export default Home

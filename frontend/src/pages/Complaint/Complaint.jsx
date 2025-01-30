import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Complaint/complaint.css"
import Navbar from "../../components/Navbar"
import { SERVER_URL } from '../../constants'
import axios from 'axios'

const Complaint = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const [selectedFile, setSelectedFile] = useState(null);

  const [imageURL, setImageURL] = useState();

  const callContactUs = async () => {

    try {
      const res = await fetch(`${SERVER_URL}/user/getData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });

      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone, message: data.message });

      if (!res.status === 200) {
        throw new Error(res.error);
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callContactUs();
  }, []);

  const handleUpload = (event) => {
    event.preventDefault();
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        setImageURL(reader.result);
      };

    } else {
      console.log('No file selected');
    }
    setSelectedFile(null);
  }

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserData({ ...userData, [name]: value });

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");

    try {

      let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

      axios.post(`${SERVER_URL}/user/complaint`, { userData, cookieValue })
        .then((res) => {
          console.log(res);
          window.alert("omplaint Registered Successfully");
          console.log("omplaint Registered Successfully");
        })
        .catch(err => {
          console.log(err);
          window.alert("Error");
          console.log("Error");
        });

    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <section className="contact-body">
        <section className="contact-contact-form">
          <h2>Complaint</h2>
          <form method="POST">
            <div className="contact-row">
              <div className="contact-form-group" style={{ width: "200px" }}>
                <label htmlFor="name"></label>
                <input type="text" name="name" id="name"
                  value={userData.name}
                  onChange={handleInput}
                  placeholder="Your Name" required />
              </div>
              <div className="contact-form-group" style={{ width: "200px" }}>
                <label htmlFor="phone"></label>
                <input type="tel" name="phone" id="phone"
                  value={userData.phone}
                  onChange={handleInput}
                  placeholder="Your Mobile" required />
              </div>
              <div className="contact-form-group" style={{ width: "200px" }}>
                <label htmlFor="email"></label>
                <input type="email" name="email" id="email"
                  value={userData.email}
                  onChange={handleInput}
                  placeholder="Your Email" required />
              </div>
            </div>
            <div className="contact-form-group">
              <label htmlFor="message"></label>
              <textarea name="message" id="message"
                value={userData.message}
                onChange={handleInput}
                placeholder="Your Complaint" rows="5" required ></textarea>
            </div>

            <span className='complaint-image-form'>Select Relevant Image to upload</span>
            {/* <form action="" method="" encType="multipart/form-data" > */}
              <input type="file" accept="image/*" name="fileToUpload" id="fileToUpload" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
            {/* </form> */}
            {selectedFile && (
              <div>
                <span className='complaint-preview-text'>Selected Image:</span>
                <div className='complaint-preview'>
                  <img className='complaint-preview-img'
                    alt="not found"
                    width={"50px"}
                    src={URL.createObjectURL(selectedFile)}
                  />
                </div>
              </div>
            )}
            <div className="contact-form-group contact-form-button">
              <button type="submit" className="contact-form-submit" onClick={handleSubmit}
              >Submit</button>
            </div>

          </form>
        </section>
      </section>
    </>
  )
}

export default Complaint

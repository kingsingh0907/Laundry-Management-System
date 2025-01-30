import React, { useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useState } from 'react';
import axios from 'axios';
import Feedback from "../../components/feedback";
import Navbar from '../../components/Navbar';
import "../Complaint/previousComplaint.css"

const PreviousComplaints = () => {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                if (cookieValue) {
                    const response = await axios.get(`${SERVER_URL}/staff/getComplaints/${cookieValue}`);
                    setComplaints(response.data.complaints);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [])

    return (
        <>
            <Navbar />
            <div className='cards-container'>
                {complaints.map((complaint) => (
                    <ul key={complaint._id} className='card-container'>
                        <p className='roomNo'>Name : {complaint.name}</p>
                        <p className='email'>Email : {complaint.email}</p>
                        <p className='description'>Description : {complaint.message}</p>
                        <Feedback id={complaint.id} />
                    </ul>
                ))}
            </div>
        </>
    )
}

export default PreviousComplaints;

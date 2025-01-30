import React, { useState } from 'react'
import "../css/feedback.css"
import axios from 'axios';
import { SERVER_URL } from '../constants';

const Feedback = (props) => {

    const [showModel, setModel] = useState(false);
    const [feedback, setFeedback] = useState("");
    const id = props.id;

    const submitFeedback = (e) => {
        e.preventDefault();

        const config = { withCredentials: true }
        console.log(feedback);
        
        axios.post(`${SERVER_URL}/staff/submitFeedback`, {feedback,id}, config)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        setModel(false);
        setFeedback("");
    }

    return (
        <>
            <button className='feedback-btn' onClick={() => setModel(!showModel)}>{showModel? "Close" : "Feedback"}</button>

            {showModel &&
                <>
                    <div className="feedback-modal-parent" onClick={() => setModel(false)}></div>
                    <div className="feedback-modal-child">
                        <p>Write the feedback Below :</p>
                        <textarea className="feedbackText"
                            rows="3"
                            value={feedback}
                            onChange={(event) => setFeedback(event.target.value)}
                        />
                        <button className="modal-upload-btn" onClick={submitFeedback}>Submit Feedback</button>
                    </div>
                </>
            }
        </>
    )
}

export default Feedback

import React, { useState } from 'react'
import axios from 'axios';
import "../css/addClothes.css"
import { SERVER_URL } from '../constants'

const AddClothes = () => {

    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState({ shirt: "", pent: "", tShirt: "", lower: "", shorts: "", towel: "", pillowCover: "", bedSheet: "" })

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async () => {

        let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //here cookies are being searched with name "jwtoken"
        console.log(typeof(user.shirt));
        axios.post(`${SERVER_URL}/user/addClothes`, { user, cookieValue })
            .then((res) => {
                console.log(res);
                window.alert("Clothes Added Successfully");
            })
            .catch(err => {
                console.log(err);
                window.alert("Error");
                console.log("Error");
            });
        setShowModal(false);
        window.location.reload(true);

    };

    return (
        <>
            <div className="add-cloth">
                <button className="add-cloth-btn" type="submit" onClick={(e) => { e.preventDefault(); setShowModal(true) }}>Add Clothes</button>
            </div>
            {showModal && (
                <>
                    <div className="addClothes-modal-parent"></div>
                    <div className="addClothes-modal-child">
                        <form encType="multipart/form-data" method="POST" >
                            <table className="addClothes-styled-table">
                                <thead>
                                    <tr>
                                        <th >Shirt</th>
                                        <th >Pent</th>
                                        <th >T Shirt</th>
                                        <th >Lower</th>
                                        <th >Shorts</th>
                                        <th >Towel</th>
                                        <th >Pillow Cover</th>
                                        <th >Bed Sheet</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td ><label htmlFor="shirt"></label><input type="number" name="shirt" id="shirt"
                                            value={user.shirt}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                        <td ><label htmlFor="pent"></label><input type="number" name="pent" id="pent"
                                            value={user.pent}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                        <td ><label htmlFor="tShirt"></label><input type="number" name="tShirt" id="tShirt"
                                            value={user.tShirt}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                        <td ><label htmlFor="lower"></label><input type="number" name="lower" id="lower"
                                            value={user.lower}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                        <td ><label htmlFor="shorts"></label><input type="number" name="shorts" id="shorts"
                                            value={user.shorts}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                        <td ><label htmlFor="towel"></label><input type="number" name="towel" id="towel"
                                            value={user.towel}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                        <td ><label htmlFor="pillowCover"></label><input type="number" name="pillowCover" id="pillowCover"
                                            value={user.pillowCover}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                        <td ><label htmlFor="bedSheet"></label><input type="number" name="bedSheet" id="bedSheet"
                                            value={user.bedSheet}
                                            onChange={handleInput}
                                            placeholder='0' /></td>

                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        <button onClick={handleSubmit} className="addClothes-upload-btn" type="submit">Upload</button>
                        <button onClick={() => setShowModal(false)} className="addClothes-close-btn" type="submit">Cancel</button>
                    </div>
                </>
            )}
        </>
    )
}

export default AddClothes

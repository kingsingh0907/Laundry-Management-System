import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "../About/about.css"
import Navbar from "../../components/Navbar"
import AddClothes from '../../components/AddClothes'
import { SERVER_URL } from '../../constants'

const Dashboard = () => {

    const GetClothes = (props) => {
        const clothes = props.clothes;
        return (
            <tr>
                <td >{clothes.serialNo}</td>
                <td >{clothes.collectedOn}</td>
                <td >{clothes.shirt}</td>
                <td >{clothes.pent}</td>
                <td >{clothes.tShirt}</td>
                <td >{clothes.lower}</td>
                <td >{clothes.shorts}</td>
                <td >{clothes.towel}</td>
                <td >{clothes.pillowCover}</td>
                <td >{clothes.bedSheet}</td>
                <td>-</td>
            </tr>
        )
    }

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const config = { withCredentials: true }
        axios.get(`${SERVER_URL}/user/getData`, config)
            .then((result) => {
                setUserData(result.data);

            }).catch((err) => {
                console.log(err);
                navigate("/login");
            });
    }, []);


    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <AddClothes />
                <div className="table-profile">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table">
                                <table className="styled-table">
                                    <thead>
                                        <tr>
                                            <th >S No.</th>
                                            <th >Collected On</th>
                                            <th >Shirt</th>
                                            <th >Pent</th>
                                            <th >T Shirt</th>
                                            <th >Lower</th>
                                            <th >Shorts</th>
                                            <th >Towel</th>
                                            <th >Pillow Cover</th>
                                            <th >Bed Sheet</th>
                                            <th >Distributed On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.clothes?.slice(0).reverse().map((item, index) => (
                                            <GetClothes key={index} clothes={item} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

import { Router } from "express";
import {staffHome,staffRegister,staffLogin,staffGetData,staffGetDataUser,staffUpdateProfile, staffGetComplaints, staffGetDetailsUser, staffDistributeClothes} from "../controller/staffController.js"
const staffRoutes = Router();

staffRoutes.get("/", staffHome);
staffRoutes.post("/staff/register", staffRegister);
staffRoutes.post("/staff/login", staffLogin);
staffRoutes.get("/staff/getData", staffGetData);
staffRoutes.get("/staff/getComplaints/:cookieValue", staffGetComplaints);
staffRoutes.get('/staff/getData/:cookieValue', staffGetDataUser);
staffRoutes.get('/staff/getDetails/:userId', staffGetDetailsUser);
staffRoutes.post('/staff/distributeClothes', staffDistributeClothes);
staffRoutes.post('/staff/updateProfile', staffUpdateProfile);

export default staffRoutes;
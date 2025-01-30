import { Router } from "express";
import { userHome, userRegister, userLogin, userGetData, userComplaint, userAddClothes, userUpdateProfile, } from "../controller/userController.js";
const userRoutes = Router();

userRoutes.get("/", userHome);
userRoutes.post("/user/register", userRegister);
userRoutes.post("/user/login", userLogin);
userRoutes.get("/user/getData", userGetData);
userRoutes.post("/user/complaint", userComplaint);
userRoutes.post("/user/addClothes", userAddClothes);
userRoutes.post('/user/updateProfile', userUpdateProfile);

export default userRoutes;
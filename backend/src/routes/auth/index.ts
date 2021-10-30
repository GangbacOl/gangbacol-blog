import express from "express";
import { check } from "express-validator";

import controller from "./auth.controller";

const router = express.Router();

const registerValidateList = [
  check("username", "MissingParameter").notEmpty(),
  check("account", "MissingParameter").notEmpty(),
  check("password", "MissingParameter").notEmpty(),
];

const loginValidateList = [
  check("account", "MissingParameter").notEmpty(),
  check("password", "MissingParameter").notEmpty(),
];

const verifyTokenValidateList = [check("token", "MissingParameter").notEmpty()];

router.post("/register", registerValidateList, controller.registerCtrl);
router.post("/login", loginValidateList, controller.loginCtrl);
router.post("/verifyToken", verifyTokenValidateList, controller.verifyTokenCtrl);

export default router;

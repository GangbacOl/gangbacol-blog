import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { usersRepository } from "./../../models/index";
import { passwordValidator, bodyValidator, checkSecretCode } from "../../validator/auth";

const registerCtrl = async (req: Request, res: Response) => {
  try {
    const { username, account, password, secretCode } = req.body;

    const isSecretCodeIncorrect = checkSecretCode(secretCode);
    const isMissingParameter = bodyValidator(req, res);
    const isExistingAccount = await usersRepository.findAll({ where: { account } }).then((data) => data);
    const isInvalidPassword = passwordValidator(password);

    const encryptedPassowrd = bcrypt.hashSync(password, 10);

    if (isSecretCodeIncorrect) return res.status(400).json({ errorCode: "IncorrectSecretCode" });
    if (isMissingParameter) return res.status(400).json({ errorCode: "MissingParameter" });
    if (isExistingAccount.length)
      return res
        .status(400)
        .json({ errorCode: "ExistingAccount", msg: "Provided account is already taken." });
    if (isInvalidPassword)
      return res.status(400).json({
        errorCode: "InvalidPassword",
        msg: "Provided password is too short or easy",
      });

    await usersRepository.create({ username, account, password: encryptedPassowrd });
    res.status(201).json({ success: true, msg: "Register successful" });
  } catch (error) {
    console.log(error);
  }
};

const loginCtrl = async (req: Request, res: Response) => {
  try {
    const { account, password } = req.body;

    const isMissingParameter = bodyValidator(req, res);
    const isExistingAccount = await usersRepository.findAll({ where: { account } });

    if (isMissingParameter) return res.status(400).json({ errorCode: "MissingParameter" });
    if (!isExistingAccount.length) return res.status(400).json({ errorCode: "UserNotFound" });

    const isCorrectPassword = await bcrypt.compare(password, isExistingAccount[0].password);
    if (!isCorrectPassword) return res.status(400).json({ errorCode: "PasswordNotCorrect" });

    const token = jwt.sign(
      {
        _id: account,
        username: isExistingAccount[0].username,
      },
      process.env.SECRET_KEY,
      {
        issuer: "localhost",
        subject: "userInfo",
        expiresIn: "5d",
      }
    );
    res.status(200).json({
      success: true,
      msg: "Login successful",
      username: isExistingAccount[0].username,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyTokenCtrl = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) return res.status(400).json({ success: false, errorCode: "InvalidToken" });
    });
    res.status(200).json({
      success: true,
      msg: "Verify token successful",
      decoded,
    });
  } catch (error) {
    console.log(error);
  }
};

export default { registerCtrl, loginCtrl, verifyTokenCtrl };

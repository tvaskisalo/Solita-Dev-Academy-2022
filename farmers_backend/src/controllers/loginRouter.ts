//This file is responsible for handling logging in. This will use url /api/login

import express  from "express";
import UserModel from "../models/user";
import bcrypt from 'bcrypt';
import { SECRET } from "../utils/config";
import jwt = require('jsonwebtoken');
import { toUserInfo } from "../utils/typeParsers";


const router = express.Router();

router.post('/', (req,res) => {
    void (async () => {
        try {
            const { username, password } = toUserInfo(req.body);
            const user = await UserModel.findOne({ username: username });
            const passwordIsCorrect = user === null
                ? false
                : await bcrypt.compare(password, user.passwordHash);
            if (!(user && passwordIsCorrect)) {
                res.status(401).json({
                    error: 'invalid login credintials'
                });
                return;
            } else {
                const token = jwt.sign(
                    {
                        username: user.username,
                        id: user._id as string
                    },
                    SECRET
                );
                res
                    .status(200)
                    .send({ token, username: user.username });
            }
        } catch (e) {
            res.status(400).end();
        }
    })();
});


export default router;
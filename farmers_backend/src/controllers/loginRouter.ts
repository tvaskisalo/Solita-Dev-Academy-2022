//This file is responsible for handling logging in. This will use url /api/login

import express  from "express";
import UserModel from "../models/user";
import bcrypt from 'bcrypt';
import { SECRET } from "../utils/config";
import jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/', (req,res) => {
    void (async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body = req.body;
        console.log(body);
        if (!body.username || !body.password) {
            res.status(400).end();
            return;
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const user = await UserModel.findOne({ username: body.username});
            const passwordIsCorrect = user === null
                ? false
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                : await bcrypt.compare(body.password, user.passwordHash);
            if (!(user && passwordIsCorrect)) {
                console.log(user);
                
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
                    .send({ token, username: user.username});
            }
        } catch (e) {
            console.log(e);
        }
    })();
});


export default router;
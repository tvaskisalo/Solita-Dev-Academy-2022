//This file is responsible for user's data management. The api will use the url /api/user

import express  from "express";
import { addUser } from "../services/userService";
import { toUserInfo } from "../utils/typeParsers";

const router = express.Router();

router.post('/', (req,res) => {
    void (async () => {
        try {
            const { username, password } = toUserInfo(req.body);
            const user = await addUser(username, password);
            if (!user) {
                res.status(400).end();
            }
            res
                .status(200)
                .send({ username: user?.username });
        } catch (e) {
            res.status(400).end();
        }
    })();
});


export default router;
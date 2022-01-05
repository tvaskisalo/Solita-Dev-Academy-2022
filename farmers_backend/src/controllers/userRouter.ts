//This file is responsible for user's data management. The api will use the url /api/user

import express  from "express";
import { addUser } from "../services/userService";

const router = express.Router();

router.post('/', (req,res) => {
    void (async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body = req.body;
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const user = await addUser(body.username, body.password);
            if (!user) {
                res.status(400).end();
            }
            res
                .status(200)
                .send({username: user?.username});
        } catch (e) {
            console.log(e);
        }
    })();
});


export default router;
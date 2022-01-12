// This is the main file.

import { PORT } from "./utils/config";
import http from 'http';
import app from "./app";



// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


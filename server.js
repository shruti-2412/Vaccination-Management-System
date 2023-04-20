import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './index.js'
const server=http.createServer(app);
server.listen(process.env.PORT);

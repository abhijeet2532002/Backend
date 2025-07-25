import express from 'express';
import dotenv from 'dotenv';
import apiGateWay from './router/ApiGateway.js';
import DBConfig from './config/DBConfig.js';

dotenv.config();
const port = process.env.port || 9192;

const app = express();

app.use(express.json());
app.use('/', apiGateWay);


app.listen(port, () => {
    console.log(`Server Started on ${port}`);
})
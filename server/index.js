import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(cors());

app.get('/', (req, res) => {
    res.send({ message: "Hello Legeon"});
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        
        app.listen(8080, () => console.log('Server started on http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }
}

startServer();
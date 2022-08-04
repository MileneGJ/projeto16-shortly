import express from 'express';
import cors from 'cors';
import './application/setup.js';
import authRouters from './routers/authRouters.js'
import userRouters from './routers/userRouters.js'
import urlRouters from './routers/urlRouters.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouters);
app.use(userRouters);
app.use(urlRouters);

app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT ${process.env.PORT}`)
})
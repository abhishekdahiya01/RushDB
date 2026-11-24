import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.Routes.js';
import pdfRoutes from './routes/pdf.routes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})
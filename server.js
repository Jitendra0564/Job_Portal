import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import connectDB from "./config/db.js";
import 'express-async-errors';
import testRoute from "./Routes/testRoute.js";
import authRoutes from "./Routes/authRoutes.js";
import errormiddleware from "./middleware/errormiddleware.js";
import userRoutes from './Routes/userRoutes.js';
import jobRoutes from './Routes/jobRoutes.js';

//dotenv
dotenv.config();

connectDB();
//swagger api config
const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: 'job portal Apllication',
            description: 'Node Expressjs Job portal Application'
        },
        servers: [
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis:['./Routes/*.js'],
};

const spec = swaggerDoc(options);

//rest object
const app = express()



//middleware
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


//validation middleware
app.use(errormiddleware);

app.use('/api/v1/test',testRoute);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/job',jobRoutes);

//homeorute
app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(spec));

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`Node Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`);
})
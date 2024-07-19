import express from 'express';
import cors from 'cors';
import connectMongoDB from './connectDB.js';
import dotenv from 'dotenv'
import Post from './models/post.model.js';
import { v2 as cloudinary } from 'cloudinary'
import  bodyParser  from 'body-parser'
import cookieParser from 'cookie-parser';

import authRotes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
  }),
);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.get('/', async (req,res) => {
    try {
        const posts = await Post.find().select("title coverImg tags createdAt")
        
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
})


app.use('/',authRotes)

app.use('/',postRoutes)



app.listen(PORT, () => {
    console.log(`connected to the port ${PORT}`);
    connectMongoDB();
})





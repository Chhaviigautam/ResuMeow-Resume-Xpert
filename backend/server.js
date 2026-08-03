import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js';
import userRoutes from './routes/userRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();
const PORT = 4000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://resu-meow-resume-xpert.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(null, true); // Fallback allow for web requests
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.options('*', cors());

//CONNECT Data base DB
connectDB();

//MIDDLEWARE
app.use(express.json())
app.use('/api/auth', userRoutes)
app.use('/api/resume', resumeRoutes)


app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'), {
        setHeaders: (res, _path) => {
            res.set('Access-Control-Allow-Origin','https://resu-meow-resume-xpert.vercel.app/')
        }
    })
)

//ROUTES

app.get('/', (req,res) => {
    res.send('API WORKING')
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
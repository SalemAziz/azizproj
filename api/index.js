import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import matchRoutes from './routes/match.js';
import postRoutes  from './routes/post.js';
import demandeRoutes  from './routes/demande.js';



import cookieParser from 'cookie-parser';



dotenv.config();

mongoose
  .connect(process.env.URL_MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/match", matchRoutes)
app.use('/api/post', postRoutes);
app.use('/api/demande', demandeRoutes);






app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

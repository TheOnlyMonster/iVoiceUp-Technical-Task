import express from 'express';

import { connectToDB } from './config/dbConnection';
import { bodyParserConfig } from './middlewares/bodyParserConfig';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import cors from 'cors';

const app = express();

app.use(bodyParserConfig());

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));


app.use('/auth', authRoutes);

app.use('/employee', employeeRoutes);

app.use('/attendance', attendanceRoutes);

app.use(errorHandler);

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});

export { app };

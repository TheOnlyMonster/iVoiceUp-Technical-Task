const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.dev' });

const app = express();

app.use(bodyParser.json({
  limit: process.env.PAYLOAD_LIMIT || '10kb'
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: process.env.PAYLOAD_LIMIT || '10kb'
}));

const dbConnection: string | undefined = process.env.MONGODB_URI;

if (!dbConnection) {
  throw new Error('DB connection string not found. Please set MONGODB_URI in environment variables.');
}

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose.connect(dbConnection)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(`DB Connection Error: ${err.message}`));
});


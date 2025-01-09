import * as express from 'express';

import { connectToDB } from './config/dbConnection';
import { bodyParserConfig } from './middlewares/bodyParserConfig';


const app = express();

app.use(bodyParserConfig());

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});

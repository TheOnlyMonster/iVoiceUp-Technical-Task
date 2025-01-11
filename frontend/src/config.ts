import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const API_URL = process.env.API_URL || 'http://localhost:5000';
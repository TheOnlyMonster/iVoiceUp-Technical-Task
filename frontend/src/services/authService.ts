import axios from 'axios';
import { API_URL } from '../config';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);

    if (response.status !== 200) {
      throw new Error('Failed to sign in.');
    }

    return response.data;
};
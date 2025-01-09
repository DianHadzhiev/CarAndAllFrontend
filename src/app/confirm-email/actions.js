'use server';

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "http://localhost:5279",
  withCredentials: true,
});

export async function verifyEmail({email, confirmationCode}) {
  if (!email) {
    return { error: 'Email is required' };
  }

  if(!confirmationCode){
    return { error: 'Confirmation code is required' };
  }

  if(confirmationCode.length !== 6) {
    return { error: 'Confirmation code must be 6 characters long' };
  }

  try {
    const response = await apiClient.post('/api/Register/confirm-email', {
      Email: email,
      Code: confirmationCode
    });
    
    if (response.status === 200) {
      return { success: true, message: response.data };
    } else {
      return { error: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        return { error: 'User not found' };
      } else if (error.response.status === 400) {
        return { error: 'Invalid confirmation code' };
      }
    }
    return { error: 'Failed to verify email' };
  }
}


import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5279",
  withCredentials: true,
  }
);

export async function checkAuth() {
  try {
    const response = await apiClient.get("api/auth/AuthMe");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await apiClient.post('api/auth/refreshToken');
        if (!refreshResponse.data) {
          throw new Error('Refresh token invalid or expired');
        }
        const retry = await apiClient.get("api/auth/AuthMe");
        return retry.data;
      } catch (err) {
        console.error('Refresh token error:', err);
        if (err.response?.status === 404) {
          throw new Error('Refresh token endpoint not found. Please check your API configuration.');
        }
        throw new Error(err.response?.data?.message || err.message || 'Failed to refresh authentication');
      }
    }
    console.error('Authentication error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Authentication failed');
  }
}

export async function login(credentials) {
  try {
    const url = credentials.type === "personal"
      ? 'api/auth/login'
      : 'api/auth/loginBedrijf';
    const response = await apiClient.post(url, {
      Email: credentials.email,
      Password: credentials.password
    });
    if (response.status !== 200) {
      throw new Error(response.data.Message || "Login failed");
    }
    return await checkAuth();
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
}

export async function logout() {
  try {
    await apiClient.post('api/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Logout failed');
  }
}

export const fetchVehicle = async (vehicleId, pickupDate, returnDate, type) => {
  try {
    const response = await apiClient.get('api/Voertuig/vehicleData', {
      params: { id: vehicleId, pickupDate, returnDate, type },
    });
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn('Vehicle not found:', vehicleId);
    } else {
      console.error('Unexpected error:', error.message || 'Unknown error');
    }
    throw error;
  }
};

export const submitHuuraanvraag = async (vehicleId, userId, email, pickupDate, returnDate) => {
    return await apiClient.post('/api/Huur/AanvraagIndienen', {
      IdVoertuig: vehicleId,       
      HuurderId: userId,               
      UserEmail: email,                
      PickupDate: pickupDate,
      ReturnDate: returnDate,
    });
  };

export async function register(){
  await apiClient.post('/api/Register/Particulier', {

  });
}
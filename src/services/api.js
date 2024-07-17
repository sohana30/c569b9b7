import axios from 'axios';

const BASE_URL = 'https://aircall-backend.onrender.com';

export const getActivities = () => axios.get(`${BASE_URL}/activities`);
export const getActivityDetail = (id) => axios.get(`${BASE_URL}/activities/${id}`);
export const updateActivity = (id, data) => axios.patch(`${BASE_URL}/activities/${id}`, data);
export const resetActivities = () => axios.patch(`${BASE_URL}/reset`);
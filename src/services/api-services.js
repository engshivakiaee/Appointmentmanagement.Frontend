import axios from 'axios';
import { handleResponse, handleError } from './Response.ts';

const API_ROOT = 'https://localhost:7237/api';

axios.interceptors.request.use(
  (config) => {
    config.headers.TimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return config;
  },
  (error) => Promise.reject(error),
);

export const postAgentList = (search) =>
  axios.post(`${API_ROOT}/Agent/agentlist-with-availabilities`, search)
    .then(handleResponse)
    .catch(handleError);

export const getAgentAvailabilityById = (id) =>
  axios.get(`${API_ROOT}/AgentAvailability/byid?id=${id}`)
    .then(handleResponse)
    .catch(handleError);


export const createAppointment = (createAppointmentCommand) =>
  axios.post(`${API_ROOT}/appointment/create`, createAppointmentCommand).then(handleResponse).catch(handleError);

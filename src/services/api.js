import axios from 'axios';

const DEV_ENV_PORT = 8080;
const PROD_ENV_PORT = 8090;

// Criamos uma instância do axios com o endereço base do seu back-end
export const api = axios.create({
  baseURL: `http://localhost:${DEV_ENV_PORT}/api`,
});
import axios from 'axios';

// Criamos uma instância do axios com o endereço base do seu back-end
export const api = axios.create({
  baseURL: 'http://localhost:8090/api',
});
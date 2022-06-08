import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.mailcheck.ai',
});

export default instance;

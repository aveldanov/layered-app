import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://layered-app.firebaseio.com/'
});

export default instance;
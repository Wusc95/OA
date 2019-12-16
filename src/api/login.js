import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
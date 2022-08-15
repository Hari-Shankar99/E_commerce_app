import axios from 'axios';

 export default axios.create({
    baseURL: 'https://api.opensea.io/api/v1/collections',
 })
 //?offset=0&limit=10


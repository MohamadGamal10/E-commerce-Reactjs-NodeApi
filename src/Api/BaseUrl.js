import axios from 'axios'

export const backUrl = "https://backend-for-ecommerce-plateform2.onrender.com";
// export const backUrl = "http://localhost:8000";

export const BaseUrl = axios.create({
    baseURL: backUrl
});
import axios from "axios";

const api = axios.create({
    baseURL: 'https://product-management-system-backend-mpqf.onrender.com'
})

export default api

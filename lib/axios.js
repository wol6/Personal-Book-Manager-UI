import axios from "axios";

const API = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials:true
})

API.interceptors.response.use(
    (response)=>{
        return response
    },

    (error)=>{
        const message = error.response.data.message

          if (message) {
            alert(`Error: ${message}`);
        } else if (error.request) {
            alert("Network Error: Cannot connect to the server.");
        } else {
            alert(`Unexpected Error: ${error.message}`);
        }

        return Promise.reject(error)
    }
)

export default API
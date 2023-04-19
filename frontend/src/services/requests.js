import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4001/api',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

const { baseURL } = instance.defaults;
export const postBuilding = async (formData) => {
    const { data } = await instance.post(`${baseURL}/edificios`, formData);
    return data;
}
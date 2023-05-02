import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4001/api',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

//edificio
const { baseURL } = instance.defaults;
export const postBuilding = async (formData) => {
    const { data } = await instance.post(`${baseURL}/edificios`, formData);
    return data;
}
export const getAllBuildingName = async () => {
    const { data } = await instance.get(`${baseURL}/edificios/nomes`);
    return data;
}
export const getAllBuildingFloor = async (id) => {
    // if (!id) {
    //     return; // se o ID do edifício não está definido, retorna sem fazer nada
    // }
    const { data } = await instance.get(`${baseURL}/edificios/${id}/andares`);
    return data;
}
export const getAllApartmentNumber = async (id, andar) => {
    // if (!id || !andar) {
    //     return; // se o ID do edifício não está definido, retorna sem fazer nada
    // }
    const { data } = await instance.get(`${baseURL}/edificios/${id}/andares/${andar}/apartamentos`);
    return data;
}

//apartamento
export const postApartment = async (id, newApartment) => {
    const { data } = await instance.post(`${baseURL}/edificios/${id}/apartamentos`, newApartment);
    return data;
}
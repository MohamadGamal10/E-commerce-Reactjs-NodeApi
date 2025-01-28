import { BaseUrl } from "../Api/BaseUrl";

const useGetData = async(url, parmas) => {
    const res = await BaseUrl.get(url, parmas);
    return res.data;
}

const useGetDataToken = async(url, parmas) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await BaseUrl.get(url, config);
    return res.data;
}

export { useGetData, useGetDataToken };
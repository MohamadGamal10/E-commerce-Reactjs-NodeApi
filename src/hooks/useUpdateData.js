import { BaseUrl } from "../Api/BaseUrl";

const useUpdateData = async(url, parmas) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const res = await BaseUrl.put(url, parmas, config);
    return res;
}

const useUpdateDataWithImage = async(url, parmas) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const res = await BaseUrl.put(url, parmas, config);
    // console.log(res);
    return res;
}

export { useUpdateData, useUpdateDataWithImage };
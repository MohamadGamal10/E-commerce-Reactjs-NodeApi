import { BaseUrl } from "../Api/BaseUrl";

const useInsertData = async(url, parmas) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const res = await BaseUrl.post(url, parmas, config);
    // console.log(res);
    return res;
};

const useInsertDataWithImage = async(url, parmas) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const res = await BaseUrl.post(url, parmas, config);
    return res;
};

export { useInsertData, useInsertDataWithImage };
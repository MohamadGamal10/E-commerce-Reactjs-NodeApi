import { CREATE_CATEGORY, GET_ALL_CATEGORY, GET_ERROR, GET_ONE_CATEGORY } from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useInsertData";


export const getAllCategory = (limit) => async(dispatch) => {
    try {
        // const res = await BaseUrl.get(`/api/v1/categories`);
        const response = await useGetData(`/api/v1/categories?limit=${limit}`);
        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const getAllCategoryPage = (page) => async(dispatch) => {
    try {
        // const res = await BaseUrl.get(`/api/v1/categories`);
        const response = await useGetData(`/api/v1/categories?limit=6&page=${page}`);
        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const createCategory = (formData) => async(dispatch) => {
    try {
        const res = await useInsertDataWithImage(`/api/v1/categories`, formData);
        dispatch({
            type: CREATE_CATEGORY,
            payload: res,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const getOneCategory = (id) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories/${id}`);
        dispatch({
            type: GET_ONE_CATEGORY,
            payload: response,
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}
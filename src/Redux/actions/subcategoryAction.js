import { useGetData } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData"
import { CREATE_SUB_CATEGORY, GET_ERROR, GET_SUB_CATEGORY } from "../type";


export const createSubCategory = (data) => async(dispatch) => {
    try {
        const res = await useInsertData(`/api/v1/subcategories`, data);
        dispatch({
            type: CREATE_SUB_CATEGORY,
            payload: res,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        })
    }
}

export const getSubCatsBasedOnCategory = (cat_id) => async(dispatch) => {
    try {
        const res = await useGetData(`/api/v1/categories/${cat_id}/subcategories`);
        dispatch({
            type: GET_SUB_CATEGORY,
            payload: res,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        })
    }
}
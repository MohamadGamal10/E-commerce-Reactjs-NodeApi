import { useInsertDataWithImage } from "../../hooks/useInsertData";
import { CREATE_PRODUCTS, DELETE_PRODUCT, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_BRAND, GET_ALL_PRODUCTS_CATEGORY, GET_ERROR, GET_PRODUCT_DETALIS, GET_PRODUCT_LIKE, UPDATE_PRODUCT } from "../type";
import { useGetData } from "../../hooks/useGetData";
import UseDeleteData from "../../hooks/useDeleteData";
import { useUpdateDataWithImage } from "../../hooks/useUpdateData";

export const createProduct = (data) => async(dispatch) => {
    try {
        const res = await useInsertDataWithImage(`/api/v1/products`, data);
        dispatch({
            type: CREATE_PRODUCTS,
            payload: res,
            loading: true
        });
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error  " + error,
        });
    }
}


export const getAllProducts = (limit) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const getAllProductsPage = (page, limit) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?page=${page}&limit=${limit}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const getAllProductsSearch = (queryString) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?${queryString}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const getOneProduct = (pro_id) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products/${pro_id}`);
        dispatch({
            type: GET_PRODUCT_DETALIS,
            payload: response,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const getProductLike = (cat_id) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?category=${cat_id}`);
        dispatch({
            type: GET_PRODUCT_LIKE,
            payload: response,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const deleteProduct = (id) => async(dispatch) => {
    try {
        const response = await UseDeleteData(`/api/v1/products/${id}`);
        dispatch({
            type: DELETE_PRODUCT,
            payload: response,
            loading: true
        })
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error :" + error
        });
    }
}

export const updateProduct = (id, data) => async(dispatch) => {
    try {
        const res = await useUpdateDataWithImage(`/api/v1/products/${id}`, data);
        dispatch({
            type: UPDATE_PRODUCT,
            payload: res,
            loading: true
        });
    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: "Error  " + error,
        });
    }
}


export const getAllProductsByCategory = (page, limit, categoryID) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}&category=${categoryID}&page=${page}`);
        dispatch({
            type: GET_ALL_PRODUCTS_CATEGORY,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS_CATEGORY,
            payload: e.response,
        })
    }
}


export const getAllProductsByBrand = (page, limit, brandID) => async(dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}&brand=${brandID}&page=${page}`);
        dispatch({
            type: GET_ALL_PRODUCTS_BRAND,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS_BRAND,
            payload: e.response,
        })
    }
}
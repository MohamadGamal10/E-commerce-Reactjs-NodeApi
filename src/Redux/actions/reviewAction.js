import UseDeleteData from "../../hooks/useDeleteData";
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import { useUpdateData } from "../../hooks/useUpdateData";
import { ALL_REVIEW_PRODUCT, CREATE_REVIEW, DELETE_REVIEW, UPDATE_REVIEW } from "../type";


export const createReview = (prodId, data) => async(dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/products/${prodId}/reviews`, data);
        dispatch({
            type: CREATE_REVIEW,
            payload: response,
        })
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW,
            payload: error.response,
        })
    }
}

export const allReviewProduct = (prodId, page, limit) => async(dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/products/${prodId}/reviews?page=${page}&limit=${limit}`);
        dispatch({
            type: ALL_REVIEW_PRODUCT,
            payload: response,
        })
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_PRODUCT,
            payload: error.response,
        })
    }
}

export const deleteReviewOnProduct = (id) => async(dispatch) => {
    try {
        const response = await UseDeleteData(`/api/v1/reviews/${id}`);
        dispatch({
            type: DELETE_REVIEW,
            payload: response,
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW,
            payload: error.response,
        })
    }
}

export const updateReviewOnProduct = (id, data) => async(dispatch) => {
    try {
        const response = await useUpdateData(`/api/v1/reviews/${id}`, data);
        dispatch({
            type: UPDATE_REVIEW,
            payload: response,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_REVIEW,
            payload: error.response,
        })
    }
}
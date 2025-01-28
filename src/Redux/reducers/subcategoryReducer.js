import { CREATE_SUB_CATEGORY, GET_ERROR, GET_SUB_CATEGORY } from "../type";

const initialState = {
    subcategory: [],
    loading: true,
};

export const subcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SUB_CATEGORY:
            return { subcategory: action.payload, loading: false };
        case GET_ERROR:
            return {
                loading: true,
                subcategory: action.payload,
            };
        case GET_SUB_CATEGORY:
            return {
                loading: false,
                subcategory: action.payload,
            };
        default:
            return state;
    }
};
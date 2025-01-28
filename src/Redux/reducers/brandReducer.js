import { CREATE_BRAND, GET_ALL_BRAND, GET_ERROR, GET_ONE_BRAND } from "../type";

const initialState = {
    brand: [],
    oneBrand: [],
    loading: true
};

export const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BRAND:
            return {...state, brand: action.payload, loading: false };
        case GET_ONE_BRAND:
            return { oneBrand: action.payload, loading: false };
        case CREATE_BRAND:
            return { brand: action.payload, loading: false };
        case GET_ERROR:
            return { brand: action.payload, loading: true };
        default:
            return state;
    }
};
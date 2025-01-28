import {
    CREATE_PRODUCTS,
    DELETE_PRODUCT,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_BRAND,
    GET_ALL_PRODUCTS_CATEGORY,
    GET_ERROR,
    GET_PRODUCT_DETALIS,
    GET_PRODUCT_LIKE,
    UPDATE_PRODUCT,
} from "../type";

const initialState = {
    products: [],
    allProducts: [],
    oneProduct: [],
    productLike: [],
    deleteProducts: [],
    updateProducts: [],
    allProductCat: [],
    allProductBrand: [],
    loading: true,
};

export const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCTS:
            return {...state, products: action.payload, loading: false };
        case GET_ALL_PRODUCTS:
            return {...state, allProducts: action.payload, loading: false };
        case GET_PRODUCT_DETALIS:
            return { oneProduct: action.payload, loading: false };
        case GET_PRODUCT_LIKE:
            return {...state, productLike: action.payload, loading: false };
        case DELETE_PRODUCT:
            return {...state, deleteProducts: action.payload, loading: false };
        case UPDATE_PRODUCT:
            return {...state, updateProducts: action.payload, loading: false };
        case GET_ERROR:
            return {
                loading: true,
                products: action.payload,
            };
        case GET_ALL_PRODUCTS_CATEGORY:
            return {
                loading: false,
                allProductCat: action.payload,
            };
        case GET_ALL_PRODUCTS_BRAND:
            return {
                loading: false,
                allProductBrand: action.payload,
            };
        default:
            return state;
    }
};
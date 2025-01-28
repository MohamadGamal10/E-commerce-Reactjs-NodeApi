import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsByBrand } from '../../Redux/actions/productsAction';

const ViewAllProductsBrandHook = (brandID) => {
    let limit = 8;
    const dispatch = useDispatch();

    const getBrands = async() => {
        await dispatch(getAllProductsByBrand('', limit, brandID));
    }

    useEffect(() => {
        getBrands();
    }, [])

    const onPress = async(page) => {
        await dispatch(getAllProductsByBrand(page, limit, brandID));
    }

    const allBrand = useSelector((state) => state.allProducts.allProductBrand);

    let items = [];
    let pagination = [];

    try {
        if (allBrand.data)
            items = allBrand.data;
        else
            items = []
    } catch (e) {}

    try {
        if (allBrand.paginationResult)
            pagination = allBrand.paginationResult.numberOfPages;
        else
            pagination = []
    } catch (e) {}

    return [items, pagination, onPress];
}

export default ViewAllProductsBrandHook;
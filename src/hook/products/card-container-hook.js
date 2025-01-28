import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../Redux/actions/wishListAction';

const CardContainerHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [favProd, setFavProd] = useState([]);

    useEffect(() => {
        const get = async() => {
            setLoading(true);
            await dispatch(getProductWishList());
            setLoading(false);
        }
        get();
    }, []);

    const res = useSelector((state) => state.addToWishListReducer.allWishList);

    useEffect(() => {
        if (loading === false) {
            if (res.data && res.data.length >= 1) {
                setFavProd(res.data.map(item => item._id))
            } else {
                setFavProd([]);
            }
        }
    }, [loading]);

    return [favProd];
}

export default CardContainerHook;
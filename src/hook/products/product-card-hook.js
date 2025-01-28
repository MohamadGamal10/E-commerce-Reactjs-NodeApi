import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import favoff from "../../Images/fav-off.png";
import favon from "../../Images/fav-on.png";
import { addProductToWishList, removeProductToWishList } from '../../Redux/actions/wishListAction';
import { notify } from '../useNotifaction';
const ProductCardHook = (item, favProd) => {
    const dispatch = useDispatch();
    const [favImg, setFavImg] = useState(favoff);
    let Fav = favProd.some(fitem => fitem === item._id);
    const [loadingAdd, setLoadingAdd] = useState(true);
    const [loadingRemove, setLoadingRemove] = useState(true);
    const [isFav, setIsFav] = useState(Fav);

    useEffect(() => {
        setIsFav(favProd.some(fitem => fitem === item._id))
    }, [favProd])

    const handleFav = () => {
        if (isFav) {
            removeToWishListData();
        } else {
            addToWishListData();
        }
    }

    useEffect(() => {
        if (isFav === true) {
            setFavImg(favon)
        } else {
            setFavImg(favoff)
        }
    }, [isFav]);

    const addToWishListData = async() => {
        setIsFav(true);
        setFavImg(favon);
        setLoadingAdd(true);
        await dispatch(addProductToWishList({
            productId: item._id,
        }));
        setLoadingAdd(false);
    }
    const removeToWishListData = async() => {
        setIsFav(false);
        setFavImg(favoff);
        setLoadingRemove(true);
        await dispatch(removeProductToWishList(item._id));
        setLoadingRemove(false);
    }
    const resAdd = useSelector(state => state.addToWishListReducer.addWishList);
    const resRemove = useSelector(state => state.addToWishListReducer.removeWishList);

    useEffect(() => {
        if (loadingAdd === false) {
            console.log(resAdd);
            if (resAdd && resAdd.status === 200) {
                notify("تمت اضافة المنتج للمفضلة بنجاح", "success");
            } else if (resAdd && resAdd.status === 401) {
                notify("انت غير مسجل", "error");
            }
        }
    }, [loadingAdd]);


    useEffect(() => {
        if (loadingRemove === false) {
            console.log(resRemove)
            if (resRemove && resRemove.status === "success") {
                notify("تمت حذف المنتج من المفضلة بنجاح", "warning")
            } else if (resAdd && resAdd.status === 401) {
                notify("انت غير مسجل", "error")
            }
        }
    }, [loadingRemove]);


    return [removeToWishListData, addToWishListData, handleFav, favImg];
}

export default ProductCardHook;
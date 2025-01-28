import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../Redux/actions/cartAction";
import { notify } from "../useNotifaction";

const AddToCartHook = (prodID, item) => {
    const dispatch = useDispatch();

    const [indexColor, setIndexColor] = useState('');
    const [colorText, setColorText] = useState('');
    const [loading, setLoading] = useState(true);
    const colorClick = (index, color) => {
        setIndexColor(index);
        setColorText(color);
    }

    const addToCartHandel = async() => {
        console.log(item.availableColors);
        if (item.availableColors.length >= 1) {
            if (colorText === "") {
                notify("من فضلك اختر لون اولا للمنتج", "warning");
                return;
            }
        } else {
            setColorText('');
        };
        setLoading(true);
        await dispatch(addProductToCart({
            productId: prodID,
            color: colorText
        }));
        setLoading(false);
    }

    const res = useSelector((state) => state.cartReducer.addToCart);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("تمت اضافة المنتج للعربه بنجاح", "success");
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            } else {
                notify("قم بتسجيل الدخول اولا", "warning");
            }
        }
    }, [loading]);

    return [colorClick, indexColor, addToCartHandel];
}

export default AddToCartHook;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupnCart } from "../../Redux/actions/cartAction";
import { notify } from "../useNotifaction";
import { useNavigate } from "react-router-dom";

const ApplyCouponHook = (cartItems) => {

    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [loading, setLoading] = useState(true);

    const onChangeCoupon = (e) => {
        setCouponName(e);
    }

    const handelSubmitCoupon = async() => {
        if (couponName === "") {
            notify("من فضلك ادخل الكوبون", "warning");
            return;
        }

        setLoading(true);
        await dispatch(applyCoupnCart({
            couponName
        }));
        setLoading(false);
    }

    const res = useSelector(state => state.cartReducer.applyCoupon);

    useEffect(() => {
        if (loading === false) {
            console.log(res);
            if (res && res.status === 200) {
                notify("تم تطبيق الكوبون بنجاح", "success");
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);

            } else {
                notify("هذا الكوبون غير صحيح او منتهى الصلاحيه", "warning");
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            }
        }
    }, [loading]);

    const navigate = useNavigate();
const handleCheckout = () => {
  if(cartItems.length > 0){
    navigate('/order/paymethod');
  }else{
    notify('من فضلك اضف منتجات في العربة','warning');
  }
  
}

    return [couponName, onChangeCoupon, handelSubmitCoupon, handleCheckout]
}

export default ApplyCouponHook;
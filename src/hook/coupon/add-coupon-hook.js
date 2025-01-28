import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCoupon, getAllCoupon } from "../../Redux/actions/couponAction";
import { notify } from "../useNotifaction";

const AddCouponHook = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const [loading, setLoading] = useState(true);

    const onChangeName = (event) => {
        setCouponName(event.target.value)
    }

    const onChangeDate = (event) => {
        setCouponDate(event.target.value)
    }
    const onChangeValue = (event) => {
        setCouponValue(event.target.value)
    }

    const onSubmit = async() => {
        if (couponName === "" || couponDate === "" || couponValue <= 0) {
            notify("من فضلك اكمل البيانات", "warning");
            return;
        }

        setLoading(true);
        await dispatch(addCoupon({
            name: couponName,
            expire: couponDate,
            discount: couponValue
        }));
        setLoading(false);
    }

    const res = useSelector(state => state.couponReducer.addCoupon);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 201) {
                notify("تمت اضافة الكوبون بنجاح", "success")
                window.location.reload(false);
            } else if (res && res.status === 400) {
                notify("هذا الكوبون موجود من قبل ", "error")
            } else if (res && res.status === 403) {
                notify("انت غير مسموح لك بالاضافة", "error")
            }
        }
    }, [loading]);

    useEffect(() => {
        const get = async() => {
            await dispatch(getAllCoupon())
        }
        get();
    }, []);

    const allCoupon = useSelector(state => state.couponReducer.allCoupon);

    let coupons = []
    try {
        if (allCoupon && allCoupon.data.length >= 1)
            coupons = allCoupon.data
    } catch (e) {}

    return [couponName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit, coupons];
}

export default AddCouponHook;
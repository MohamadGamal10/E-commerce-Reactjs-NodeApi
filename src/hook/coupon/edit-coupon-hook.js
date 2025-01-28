import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editCoupon, getOneCoupon } from "../../Redux/actions/couponAction";
import { notify } from "../useNotifaction";

const EditCouponHook = (id) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [coupnName, setCoupnName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        const get = async() => {
            setLoadingData(true);
            await dispatch(getOneCoupon(id));
            setLoadingData(false);
        }
        get();
    }, []);

    const oneCoupon = useSelector((state) => state.couponReducer.oneCoupon);
    // console.log(oneCoupon)

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    useEffect(() => {
        if (loadingData === false) {
            if (oneCoupon.data) {
                setCoupnName(oneCoupon.data.name);
                setCouponDate(formatDate(oneCoupon.data.expire));
                setCouponValue(oneCoupon.data.discount);
            }
        }
    }, [loadingData]);

    const onChangeName = (event) => {
        setCoupnName(event.target.value)
    }

    const onChangeDate = (event) => {
        setCouponDate(event.target.value)
    }
    const onChangeValue = (event) => {
        setCouponValue(event.target.value)
    }

    const onSubmit = async() => {
        if (coupnName === "" || couponDate === "" || couponValue <= 0) {
            notify("من فضلك اكمل البيانات", "warning")
            return;
        }
        setLoading(true);
        await dispatch(editCoupon(id, {
            name: coupnName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false);
    }

    const res = useSelector(state => state.couponReducer.editCoupon)

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("تمت عملية التعديل بنجاح", "success")
                setTimeout(() => {
                    navigate('/admin/addcoupon')
                }, 1000);
            } else {
                notify("حدث خطا في عملية التعديل ", "error")
            }
        }
    }, [loading]);

    return [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit]
}

export default EditCouponHook;
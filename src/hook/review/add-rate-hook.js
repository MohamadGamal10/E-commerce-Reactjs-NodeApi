import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../useNotifaction";
import { createReview } from "../../Redux/actions/reviewAction";

const AddRateHook = (id) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rateText, setRateText] = useState('');
    const [rateValue, setRateValue] = useState(0);
    const [loading, setLoading] = useState(true);

    const OnChangeRateText = (e) => {
        setRateText(e.target.value);
    }
    const OnChangeRateValue = (val) => {
        setRateValue(val);
    }

    var user = "";
    if (localStorage.getItem("user") != null) {
        user = JSON.parse(localStorage.getItem("user"));
    }

    const onSubmit = async() => {

        if (rateText === "") {
            notify("من فضلك اكتب تقييم", "error");
            return;
        }

        setLoading(true);
        await dispatch(createReview(id, {
            review: rateText,
            rating: rateValue
        }));
        setLoading(false);
    };

    const res = useSelector(state => state.reviewReducer.createReview);

    useEffect(() => {
        if (loading === false) {
            if (res) {
                console.log(res);
                if (res.status && res.status === 403) {
                    notify("غير مسموح للادمن بالتقييم", "error")
                } else if (res.data.errors && res.data.errors[0].msg === "You already added review on this product") {
                    notify("لقد قمت باضافة تقييم لهذا المنتج مسبقا", "error")
                } else if (res.status && res.status === 201) {
                    notify("تمت اضافة التقييم بنجاح", "success")
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);
                }

            }
        }
    }, [loading]);

    return [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit];
}

export default AddRateHook;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../useNotifaction";
import { allReviewProduct, createReview } from "../../Redux/actions/reviewAction";

const ViewAllReviewHook = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const allReview = useSelector(state => state.reviewReducer.allReviewProduct);

    useEffect(() => {
        setLoading(true);
        dispatch(allReviewProduct(id, 1, 5));
        setLoading(false);
    }, []);

    const onPress = async(page) => {
        await dispatch(allReviewProduct(id, page, 5))
    }

    return [allReview, onPress];
}

export default ViewAllReviewHook;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteReviewOnProduct } from "../../Redux/actions/reviewAction";
import { notify } from "../useNotifaction";

const DeleteRateHook = (review) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleClose = () => setShowDelete(false);
    const handleShow = () => setShowDelete(true);

    let user = JSON.parse(localStorage.getItem("user"));




    useEffect(() => {
        try {
            if (review.user && review.user._id === user._id) {
                setIsUser(true);
            }
        } catch (e) {}
    }, []);



    const handelDelete = async() => {
        setLoading(true);
        await dispatch(deleteReviewOnProduct(review._id));
        setLoading(false);
        handleClose();
    };

    const res = useSelector((state) => state.reviewReducer.deleteReview);

    useEffect(() => {
        if (loading === false) {
            if (res === "") {
                notify("تم حذف التقييم بنجاح", "success");
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            } else notify("هناك مشكله فى عملية المسح", "error");
        }
    }, [loading]);

    return [isUser, handelDelete, handleShow, handleClose, showDelete];
};

export default DeleteRateHook;
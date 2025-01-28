import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllCartItem, deleteCartItem, updateCartItem } from "../../Redux/actions/cartAction";
import { notify } from "../useNotifaction";

const DeleteCartHook = (item) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const handelDeleteCart = async() => {
        setLoading(true);
        await dispatch(clearAllCartItem());
        setLoading(false);
    }

    const res = useSelector((state) => state.cartReducer.clearCart);

    useEffect(() => {
        if (loading === false) {
            if (res === "") {
                notify("تم الحذف بنجاح", "success");
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            } else {}
        }
    }, [loading]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handelDeleteItem = async() => {
        await dispatch(deleteCartItem(item._id));
        setShow(false);
        window.location.reload(false);
    }

    const [itemCount, setItemCount] = useState(0);

    const onChangeCount = (e) => {
        setItemCount(e.target.value)
    }

    useEffect(() => {
        if (item) {
            setItemCount(item.count);
        }

    }, []);

    const handeleUpdateCart = async() => {
        await dispatch(updateCartItem(item._id, {
            count: itemCount
        }));

        window.location.reload(false);
    }

    return [handelDeleteCart, show, handleClose, handleShow, handelDeleteItem, itemCount, onChangeCount, handeleUpdateCart]
}

export default DeleteCartHook;
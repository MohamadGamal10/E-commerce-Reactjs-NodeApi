import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../useNotifaction";
import { editUserAddress, getOneUserAddress } from "../../Redux/actions/userAddressesAction";

const EditAddressHook = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [alias, setAlias] = useState('');
    const [detalis, setDetalis] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingEdit, setLoadingEdit] = useState(true);

    const onChangeAlias = (event) => {
        setAlias(event.target.value)
    }

    const onChangeDetalis = (event) => {
        setDetalis(event.target.value)
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }

    useEffect(() => {
        const get = async() => {
            setLoading(true);
            await dispatch(getOneUserAddress(id));
            setLoading(false);
        }
        get();
    }, []);

    const resAddress = useSelector(state => state.userAddressesReducer.oneAddress);
    // console.log(resAddress);

    useEffect(() => {
        if (loading === false) {
            if (resAddress && resAddress.status === "success") {
                setAlias(resAddress.data.alias)
                setDetalis(resAddress.data.details)
                setPhone(resAddress.data.phone)
            }
        }
    }, [loading]);

    const handelEdit = async() => {
        if (alias === "" || detalis === "" || phone === "") {
            notify("من فضلك اكمل البيانات", "warning");
            return;
        }

        setLoadingEdit(true);
        await dispatch(editUserAddress(id, {
            alias,
            details: detalis,
            phone,
        }))
        setLoadingEdit(false);
    }

    const resEdit = useSelector(state => state.userAddressesReducer.editAddress);
    // console.log(resEdit);

    useEffect(() => {

        if (loadingEdit === false) {
            if (resEdit && resEdit.status === 200) {
                notify("تمت عملية التعديل بنجاح", "success");
                setTimeout(() => {
                    navigate('/user/addresses')
                }, 2000);
            } else {
                notify("فشل فى عملية التعديل", "error")
            }
        }
    }, [loadingEdit]);

    return [handelEdit, alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone]
}

export default EditAddressHook;
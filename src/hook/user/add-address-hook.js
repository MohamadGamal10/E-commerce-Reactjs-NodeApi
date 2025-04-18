import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { notify } from "../useNotifaction"
import { addUserAddress } from "../../Redux/actions/userAddressesAction"

const AddAddressHook = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [alias, setAlias] = useState('');
    const [detalis, setDetalis] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);

    const onChangeAlias = (event) => {
        setAlias(event.target.value);
    }

    const onChangeDetalis = (event) => {
        setDetalis(event.target.value);
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value);
    }

    const onSubmit = async() => {
        if (alias === "" || detalis === "" || phone === "") {
            notify("من فضلك اكمل البيانات", "warning");
            return;
        }

        setLoading(true);
        await dispatch(addUserAddress({
            alias: alias,
            details: detalis,
            phone: phone,
            city: '',
            postalCode: ''
        }));
        setLoading(false);
    }

    const res = useSelector(state => state.userAddressesReducer.addUserAddress);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("تمت اضافة العنوان بنجاح", "success")
                setTimeout(() => {
                    navigate('/user/addresses')
                }, 1000);
            } else {
                notify("هناك مشكله فى عملية الاضافة ", "error")
            }
        }
    }, [loading])

    return [alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone, onSubmit];
}

export default AddAddressHook;
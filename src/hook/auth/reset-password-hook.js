import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword, verifyPassword } from "../../Redux/actions/authAction";
import { notify } from "../useNotifaction";

const ResetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);


    const OnChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const OnChangeConfirmPassword = (e) => {
        setComfirmPassword(e.target.value)
    }

    const onSubmit = async() => {
        if (password === "") {
            notify("من فضلك ادخل كلمة السر", "error")
            return
        }
        if (password != confirmPassword) {
            notify("كلمة السر غير متطابقه مع تاكيد كلمة السر", "error")
            return
        }

        setLoading(true);
        await dispatch(resetPassword({
            email: localStorage.getItem('user-email'),
            newPassword: password
        }));
        setLoading(false);
    };

    const res = useSelector(state => state.authReducer.resetPassword);

    useEffect(() => {
        if (loading === false) {
            if (res) {
                console.log(res);
                if (res.status === 200) {
                    notify("تم تغيير كلمة السر بنجاح", "success");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                }

                if (res.data.status === "fail") {
                    notify("من فضلك اطلب كود جديد", "error");
                }
            }
        }

    }, [loading]);


    return [password, confirmPassword, OnChangePassword, OnChangeConfirmPassword, onSubmit];
}

export default ResetPasswordHook;
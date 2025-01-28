import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notify } from '../useNotifaction';
import { updateUserPassword, updateUserProfileData } from '../../Redux/actions/authAction';

const ProfileHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let user = [];
    if (localStorage.getItem("user") !== null);
    user = JSON.parse(localStorage.getItem("user")) || {};

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [loading, setLoading] = useState(true);

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }

    let body;
    if (user.email && user.email === email) {
        body = {
            name: name,
            phone: phone
        }
    } else {
        body = {
            name: name,
            email: email,
            phone: phone
        }
    }

    const handelSubmit = async() => {
        setLoading(true);
        await dispatch(updateUserProfileData(body));
        setLoading(false);
    }

    const res = useSelector(state => state.authReducer.userProfile)
    useEffect(() => {
        if (loading === false) {
            // console.log(res)
            if (res && res.status === 200) {
                notify("تم الحديث بنجاح", "success")
                localStorage.setItem("user", JSON.stringify(res.data.data.user))
                setTimeout(() => {
                    window.location.reload(false);
                }, 1500);
            } else {
                notify("فشل عملية التحديث", "warning")
            }
        }
    }, [loading])


    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loadingPass, setLoadingPass] = useState(true);


    const onChangeOldPass = (event) => {
        setOldPassword(event.target.value)
    }

    const onChangeNewPass = (event) => {
        setNewPassword(event.target.value)
    }
    const onChangeConfirmPass = (event) => {
        setConfirmNewPassword(event.target.value)
    }

    const changePassword = async() => {
        if (confirmNewPassword != newPassword) {
            notify("تاكيد كلمة المرور غير متطابق", "warn")
            return;
        }

        setLoadingPass(true);
        await dispatch(updateUserPassword({
            currentPassword: oldPassword,
            password: newPassword,
            passwordConfirm: confirmNewPassword
        }))
        setLoadingPass(false);
    }

    const resPass = useSelector(state => state.authReducer.userChangePassword);

    useEffect(() => {
        if (loadingPass === false) {
            console.log(resPass)
            if (resPass && resPass.status === 200) {
                notify("تم تغير كلمة المرور بنجاح", "success")
                setTimeout(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate('/login');
                }, 1500);

            } else {
                notify("فشل عملية التحديث", "warning");
            }
        }
    }, [loadingPass])

    return [user, show, handleClose, handleShow, handelSubmit, name, email, phone, onChangeName, onChangeEmail, onChangePhone, changePassword, oldPassword, newPassword, confirmNewPassword, onChangeOldPass, onChangeNewPass, onChangeConfirmPass]
}

export default ProfileHook;
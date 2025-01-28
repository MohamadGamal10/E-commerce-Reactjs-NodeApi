import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../Images/avatar.png";
import { createCategory } from "../../Redux/actions/categoryAction";
import { notify } from "../../hook/useNotifaction";

export const AddCategoryHook = () => {

    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar);
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);


    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImg(URL.createObjectURL(e.target.files[0]));
            setSelectedFile(e.target.files[0]);
        }
    };


    const handelSubmit = async(e) => {
        e.preventDefault();

        if (name === "" || selectedFile === null) {
            notify("من فضلك اكمل البيانات", "warning");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", selectedFile);

        setLoading(true);
        setIsPress(true);
        await dispatch(createCategory(formData));
        setLoading(false);
    };

    const res = useSelector((state) => state.allCategory.category);
    console.log(res);




    useEffect(() => {
        if (loading === false) {
            setName("");
            setImg(avatar);
            setSelectedFile(null);
            console.log("finish");
            setLoading(true);
            setTimeout(() => setIsPress(false), 1000);

            if (res.status === 201) {
                notify("تمت عملية الاضافة بنجاح", "success");
            } else {
                notify("هناك مشكله فى عملية الاضافة", "error");
            }
        }
    }, [loading])

    return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName];
};
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../Images/avatar.png";
import { createBrand } from "../../Redux/actions/brandAction";
import { notify } from "../useNotifaction";

const AddBrandHook  = () => {

    const dispatch = useDispatch();
    const [name , setName] = useState("");
    const [img, setImg] = useState(avatar);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
  
    // console.log(res);     
  
    const onChangeName = (e) => {
        setName(e.target.value);
    };
  
    const onImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setImg(URL.createObjectURL(e.target.files[0]));
        setSelectedFile(e.target.files[0]);
      }
    };
  
    const handelSubmit = async(e) => {
      e.preventDefault();
  
      if(name === "" || selectedFile === null) {
        notify("من فضلك اكمل البيانات", "warning");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", selectedFile);
      setLoading(true);
      setIsPress(true);
      await dispatch(createBrand(formData));
      setLoading(false);
    };
  
    const res = useSelector((state) => state.allBrand.brand);
    console.log(res);
    

  
    useEffect(() => {
      if(loading === false){
        setImg(avatar);
        setName("");
        setSelectedFile(null);
        setLoading(true);
        setTimeout(() => setIsPress(false), 3000);
  
        if (res.status === 201) {
          notify("تمت عملية الاضافة بنجاح", "success");
        } else {
          notify("هناك مشكله فى عملية الاضافة", "error");
        }
      }
    
    }, [loading]);

   
  
  
  return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName];
}

export default AddBrandHook 

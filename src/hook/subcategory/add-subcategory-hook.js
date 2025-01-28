import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Redux/actions/categoryAction";
import { notify } from "../../hook/useNotifaction";
import { createSubCategory } from "../../Redux/actions/subcategoryAction";


const AddSubcategoryhook = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [id , setId] = useState("0");
    const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
        if (!navigator.onLine) {
            notify("هناك مشكله فى الاتصال بالانترنت", "warn")
            return;
        }
      dispatch(getAllCategory());
    }, []);
    const categories = useSelector((state) => state.allCategory.category);
  
    console.log(categories);

    const onChangeName = (e) => {
      setName(e.target.value);
    };
  
    const handleChange = (e) => {
      setId(e.target.value);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();

      if (!navigator.onLine) {
        notify("هناك مشكله فى الاتصال بالانترنت", "warn")
        return;
    }
  
      if (name === "") {
        notify("من فضلك اختر اسم التصنيف ", "warning");
        return;
      }
  
      if (id === "0") {
        notify("من فضلك اختر تصنيف رئيسي", "warning");
        return;
      }
  
      setLoading(true);
      await dispatch(createSubCategory({
        name ,
        category: id
        }));
      setLoading(false);
    }
  
    const subcategory = useSelector((state) => state.subCategory.subcategory);
    console.log(subcategory);
    
  
    useEffect(() => {
       if (loading === false) {
         setLoading(true);
         setName("");
         setId("0");
        
         if(subcategory.status === 201){
          notify("تم اضافة التصنيف بنجاح ", "success");
         }else if(subcategory === "Error :AxiosError: Request failed with status code 400"){
            notify("هذا التصنيف موجود بالفعل من فضلك ادخل اسم جديد", "warning");
         }else {
          notify("لم يتم اضافة التصنيف", "error");
         }
       }
    }, [loading]);

    return [id, name, loading, categories, subcategory, handleChange, handleSubmit, onChangeName]
}

export default AddSubcategoryhook

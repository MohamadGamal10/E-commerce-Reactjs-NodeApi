import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Redux/actions/categoryAction";
import { getAllBrand } from "../../Redux/actions/brandAction";
import { getSubCatsBasedOnCategory } from "../../Redux/actions/subcategoryAction";
import { notify } from "../useNotifaction";
import { createProduct } from "../../Redux/actions/productsAction";

export const AdminAddProductsHook = () => {

    const [images, setImages] = useState({});
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
    const [priceAfter, setPriceAfter] = useState("السعر بعد الخصم");
    const [qty, setQty] = useState("الكمية المتاحة");
    const [CatID, setCatID] = useState('');
    const [BrandID, SetBrandID] = useState('');
    const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    const dispatch = useDispatch();
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);


    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value)
    }

    const onChangeDesName = (event) => {
        setProdDescription(event.target.value)
    }

    const onChangePriceBefor = (event) => {
        setPriceBefore(event.target.value)
    }

    const onChangePriceAfter = (event) => {
        setPriceAfter(event.target.value)
    }
    const onChangeQty = (event) => {
        setQty(event.target.value)
    }
    const onChangeColor = (event) => {
        setShowColor(!showColor)
    }

    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList);
    };
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList);
    };

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllBrand());
    }, [dispatch]);

    const categories = useSelector((state) => state.allCategory.category);
    const brands = useSelector((state) => state.allBrand.brand);
    const subcategory = useSelector((state) => state.subCategory.subcategory);

    

    const onSelectCategory = async(e) => {
        if (e.target.value !== 0) {
            await dispatch(getSubCatsBasedOnCategory(e.target.value));
        }
        setCatID(e.target.value);
    };

    useEffect(() => {
        if (CatID !== 0) {
            if (subcategory.data) {
                setOptions(subcategory.data);
            }
        }
    }, [CatID]);

    const onSelectBrand = (e) => {
        SetBrandID(e.target.value);
    };

    const handleChangeComplete = (color) => {
        setShowColor(!showColor);
        setColors([...colors, color.hex]);
        console.log(color.hex);
    };

    const removeColor = (color) => {
        setColors(() => colors.filter((c) => c !== color));
    };

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (
            CatID === 0 ||
            prodName === "" ||
            prodDescription === "" ||
            images.length <= 0 ||
            priceBefore <= 0
        ) {
            notify("من فضلك اكمل البيانات", "warning");
            return;
        }

        const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(images[index], Math.random() + ".png");
            }
        );

        const imgCover = dataURLtoFile(images[0], Math.random() + ".png");
        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("priceAfterDiscount", priceAfter);
        formData.append("imageCover", imgCover);
        formData.append("category", CatID);
        formData.append("brand", BrandID);

        itemImages.map((item) => formData.append("images", item));
        colors.map((color) => formData.append("availableColors", color));
        seletedSubID.map((item) => formData.append("subcategory", item._id));

        setLoading(true);
        await dispatch(createProduct(formData));
        setLoading(false);
    };

    const products = useSelector((state) => state.allProducts.products);

    useEffect(() => {
        if (loading === false) {
            setCatID(0);
            SetBrandID(0);
            setSeletedSubID([]);
            setColors([]);
            setImages([]);
            setProdName("");
            setProdDescription("");
            setPriceBefore("السعر قبل الخصم");
            setPriceAfter("السعر بعد الخصم");
            setQty("الكمية المتاحة");
            setTimeout(() => setLoading(true), 1500);


            if (products) {
                if (products.status === 201) {
                    notify("تم اضافه المنتج بنجاح", "success");
                } else {
                    notify("لم يتم اضافه المنتج", "error");
                }
            }
        }
    }, [loading]);

    return [onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, categories, brands, priceAfter, images, setImages, onSelect, onRemove, options, handleChangeComplete, removeColor, onSelectCategory, handleSubmit, onSelectBrand, colors, priceBefore, qty, prodDescription, prodName];
}
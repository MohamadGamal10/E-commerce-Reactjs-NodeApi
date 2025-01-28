import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Redux/actions/categoryAction";
import { getAllBrand } from "../../Redux/actions/brandAction";
import { getSubCatsBasedOnCategory } from "../../Redux/actions/subcategoryAction";
import { notify } from "../useNotifaction";
import {
    getOneProduct,
    updateProduct,
} from "../../Redux/actions/productsAction";

export const AdminEditProductsHook = (id) => {
    const [images, setImages] = useState({});
    const [prodName, setProdName] = useState("");
    const [prodDescription, setProdDescription] = useState("");
    const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
    const [priceAfter, setPriceAfter] = useState("السعر بعد الخصم");
    const [qty, setQty] = useState("الكمية المتاحة");
    const [CatID, setCatID] = useState("");
    const [BrandID, SetBrandID] = useState("");
    const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    const dispatch = useDispatch();
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);


    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value);
    };

    const onChangeDesName = (event) => {
        setProdDescription(event.target.value);
    };

    const onChangePriceBefor = (event) => {
        setPriceBefore(event.target.value);
    };

    const onChangePriceAfter = (event) => {
        setPriceAfter(event.target.value);
    };
    const onChangeQty = (event) => {
        setQty(event.target.value);
    };
    const onChangeColor = (event) => {
        setShowColor(!showColor);
    };

    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList);
    };
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList);
    };

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllBrand());
        dispatch(getOneProduct(id));
    }, [dispatch]);

    const categories = useSelector((state) => state.allCategory.category);
    const brands = useSelector((state) => state.allBrand.brand);
    const subcategory = useSelector((state) => state.subCategory.subcategory);
    const oneProduct = useSelector((state) => state.allProducts.oneProduct);

    useEffect(() => {
        if (oneProduct && oneProduct.data) {
            setImages(oneProduct.data.images);
            setProdName(oneProduct.data.title);
            setProdDescription(oneProduct.data.description);
            setPriceBefore(oneProduct.data.price);
            setPriceAfter(oneProduct.data.priceAfterDiscount);
            setQty(oneProduct.data.quantity);
            setCatID(oneProduct.data.category);
            SetBrandID(oneProduct.data.brand);
            setColors(oneProduct.data.availableColors);
        }
    }, [oneProduct]);

    const onSelectCategory = async(e) => {
        setCatID(e.target.value);
    };

    useEffect(() => {
        if (CatID !== 0) {
            const run = async() => {
                await dispatch(getSubCatsBasedOnCategory(CatID));
            };
            run();
        }
    }, [CatID]);

    useEffect(() => {
        if (subcategory.data) {
            setOptions(subcategory.data);
        }
    }, [subcategory]);

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

    //to convert base 64 to file
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

    //convert url to file
    const convertURLtoFile = async(url) => {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.blob();
        const ext = url.split(".").pop();
        const filename = url.split("/").pop();
        const metadata = { type: `image/${ext}` };
        return new File([data], Math.random(), metadata);
    };

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

        let imgCover;
        try {
            if (images[0].length <= 1000) {
                convertURLtoFile(images[0]).then((file) => {
                    // console.log(file);
                    imgCover = file;
                });
            } else {
                imgCover = dataURLtoFile(images[0], Math.random() + ".png");
            }
        } catch (e) {}


        const itemImages = [];
        Array.from(Array(Object.keys(images).length).keys()).map((item, index) => {
            let imgCover;
            if (images[index].length <= 1000) {
                convertURLtoFile(images[index]).then((file) => {
                    // console.log(file);
                    itemImages.push(file);
                });
            } else {
                itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"));
            }
        });

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("priceAfterDiscount", priceAfter);
        formData.append("category", CatID);
        formData.append("brand", BrandID);

        setTimeout(() => {
            formData.append("imageCover", imgCover);
            itemImages.map((item) => formData.append("images", item));
        }, 1000);

        colors.map((color) => formData.append("availableColors", color));
        seletedSubID.map((item) => formData.append("subcategory", item._id));

        setTimeout(async() => {
            setLoading(true);
            await dispatch(updateProduct(id, formData));
            setLoading(false);
        }, 1000);


    };

    const products = useSelector((state) => state.allProducts.updateProducts);

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
                if (products.status === 200) {
                    notify("تم تعديل المنتج بنجاح", "success");
                } else {
                    notify("هناك مشكله", "error");
                }
            }
        }
    }, [loading]);

    return [
        CatID,
        BrandID,
        onChangeDesName,
        onChangeQty,
        onChangeColor,
        onChangePriceAfter,
        onChangePriceBefor,
        onChangeProdName,
        showColor,
        categories,
        brands,
        priceAfter,
        images,
        setImages,
        onSelect,
        onRemove,
        options,
        handleChangeComplete,
        removeColor,
        onSelectCategory,
        handleSubmit,
        onSelectBrand,
        colors,
        priceBefore,
        qty,
        prodDescription,
        prodName,
    ];
};
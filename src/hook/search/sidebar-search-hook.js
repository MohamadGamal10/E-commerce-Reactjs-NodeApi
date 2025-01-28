import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Redux/actions/categoryAction";
import { getAllBrand } from "../../Redux/actions/brandAction";
import ViewSearchProductsHook from "../products/view-search-products-hook";

const SidebarSearchHook = () => {
    const [items, pagination, onPress, getProducts, results] = ViewSearchProductsHook();
    const dispatch = useDispatch();

    useEffect(() => {
        const get = async() => {
            await dispatch(getAllCategory());
            await dispatch(getAllBrand());
        }
        get();
    }, []);

    const allCat = useSelector((state) => state.allCategory.category);
    const allBrand = useSelector((state) => state.allBrand.brand);

    let category = [];
    if (allCat && allCat.data)
        category = allCat.data

    let brand = [];
    if (allBrand && allBrand.data)
        brand = allBrand.data

    var queryCat = "",
        queryBrand = "";
    const [catChecked, setCatChecked] = useState([]);
    const changeCategory = (e) => {

        let value = e.target.value;
        if (value === "0") {
            setCatChecked([])
        } else {
            if (e.target.checked === true) {
                setCatChecked([...catChecked, value]);
            } else if (e.target.checked === false) {
                const newCatChecked = catChecked.filter((cat) => cat !== value);
                setCatChecked(newCatChecked);
            }
        }

    }
    useEffect(() => {
        queryCat = catChecked.map((val) => 'category[in][]=' + val).join('&');
        localStorage.setItem("catChecked", queryCat);
        setTimeout(() => {
            getProducts(queryCat);
        }, 1000);
    }, [catChecked]);


    // console.log(queryCat);



    const [brandChecked, setBrandChecked] = useState([]);
    const changeBrand = (e) => {

        let value = e.target.value;
        if (value === "0") {
            setBrandChecked([]);
        } else {
            if (e.target.checked === true) {
                setBrandChecked([...brandChecked, value]);
            } else if (e.target.checked === false) {
                const newbrandChecked = brandChecked.filter((brand) => brand !== value);
                setBrandChecked(newbrandChecked);
            }
        }

    }

    useEffect(() => {
        queryBrand = brandChecked.map(val => "brand[in][]=" + val).join("&");
        localStorage.setItem("brandChecked", queryBrand);
        setTimeout(() => {
            getProducts();
        }, 1000);
    }, [brandChecked])

    // console.log(brandChecked);

    const [From, setPriceFrom] = useState(0)
    const [To, setToFrom] = useState(0)

    const priceFrom = (e) => {
        localStorage.setItem("priceFrom", e.target.value)

        setPriceFrom(e.target.value)
    }
    const priceTo = (e) => {
        localStorage.setItem("priceTo", e.target.value)
        setToFrom(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            getProducts();
        }, 1000);
    }, [From, To])

    return [category, brand, changeCategory, changeBrand, priceFrom, priceTo];
}

export default SidebarSearchHook;
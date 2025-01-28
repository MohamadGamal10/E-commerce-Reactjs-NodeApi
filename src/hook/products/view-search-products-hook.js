import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    // getAllProducts,
    // getAllProductsPage,
    getAllProductsSearch,
} from "../../Redux/actions/productsAction";

const ViewSearchProductsHook = () => {
    let limit = 4;
    const dispatch = useDispatch();


    const getProducts = async() => {
        getStorge();
        sorData();
        await dispatch(getAllProductsSearch(`sort=${sort}&limit=${limit}&keyword=${word}&${queryCat}&${brandCat}${pricefromString}${priceToString}`));
    };

    useEffect(() => {
        getProducts();
    }, []);

    const products = useSelector((state) => state.allProducts.allProducts);

    let items = [];
    let pagination = [];
    let results = 0;

    try {
        if (products && products.data) {
            items = products.data;
        } else {
            items = [];
        }
    } catch (error) {}

    try {
        if (products && products.paginationResult) {
            pagination = products.paginationResult.numberOfPages;
        } else {
            pagination = [];
        }
    } catch (error) {};

    try {
        if (products && products.results) {
            results = products.results;
        } else {
            results = 0;
        }
    } catch (error) {};

    const onPress = async(page) => {
        getStorge();
        sorData();
        await dispatch(getAllProductsSearch(`sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCat}&${brandCat}${pricefromString}${priceToString}`));
    }

    let pricefromString = "",
        priceToString = ""
    let word = "",
        queryCat = "",
        brandCat = "",
        priceTo = "",
        priceFrom = "";
    const getStorge = () => {
        if (localStorage.getItem("searchWord") != null)
            word = localStorage.getItem("searchWord")
        if (localStorage.getItem("catChecked") != null)
            queryCat = localStorage.getItem("catChecked")
        if (localStorage.getItem("brandChecked") != null)
            brandCat = localStorage.getItem("brandChecked")
        if (localStorage.getItem("priceTo") != null)
            priceTo = localStorage.getItem("priceTo")
        if (localStorage.getItem("priceFrom") != null)
            priceFrom = localStorage.getItem("priceFrom")

        if (priceFrom === "" || priceFrom <= 0) {
            pricefromString = ""
        } else {
            pricefromString = `&price[gt]=${priceFrom}`
        }

        if (priceTo === "" || priceTo <= 0) {
            priceToString = ""
        } else {
            priceToString = `&price[lte]=${priceTo}`
        }
    }

    let sortType = "",
        sort;
    const sorData = () => {
        if (localStorage.getItem("sortType") != null) {
            sortType = localStorage.getItem("sortType");
        } else {
            sortType = "";
        }

        if (sortType === "السعر من الاقل للاعلي")
            sort = "+price";
        else if (sortType === "السعر من الاعلي للاقل")
            sort = "-price"
        else
        if (sortType === "")
            sort = ""
        else if (sortType === "الاكثر مبيعا")
            sort = "-sold"
        else if (sortType === "الاعلي تقييما")
            sort = "-quantity"
    }

    return [items, pagination, onPress, getProducts, results];
};

export default ViewSearchProductsHook;
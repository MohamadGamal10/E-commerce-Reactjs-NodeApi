import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllProductsPage } from "../../Redux/actions/productsAction";

const ViewProductAdminHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts(12))
    }, [dispatch]);

    const products = useSelector((state) => state.allProducts.allProducts);

    let items = [];
    if (products && products.data) {
        items = products.data;
    } else {
        items = [];
    }

    let pagination = [];
    if (products && products.paginationResult) {
        pagination = products.paginationResult.numberOfPages;
    } else {
        pagination = [];
    }
    const onPress = async(page) => {
        await dispatch(getAllProductsPage(page, 12))
    }

    return [items, pagination, onPress];
}

export default ViewProductAdminHook;
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/actions/productsAction";
import { useEffect } from "react";

const ViewHomeProductsHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    let products = useSelector((state) => state.allProducts.allProducts);

    let items = [];
    if (products && products.data) {
        items = products.data.slice(0, 4);
    } else {
        items = [];
    }

    return [items];
};

export default ViewHomeProductsHook;
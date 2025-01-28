import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct, getProductLike } from '../../Redux/actions/productsAction';
import mobile from "../../Images/mobile.png";
import { getOneCategory } from '../../Redux/actions/categoryAction';
import { getOneBrand } from '../../Redux/actions/brandAction';

const ViewProductsDetalisHook = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneProduct(id));
    }, [dispatch, id]);

    const oneProduct = useSelector((state) => state.allProducts.oneProduct);
    const oneCategory = useSelector((state) => state.allCategory.oneCategory);
    const oneBrand = useSelector((state) => state.allBrand.oneBrand);
    const productLike = useSelector((state) => state.allProducts.productLike);


    let item = [];
    try {
        if (oneProduct.data) {
            item = oneProduct.data;
        } else {
            item = [];
        }
    } catch (e) {}

    useEffect(() => {
        if (item.category) {
            dispatch(getOneCategory(item.category));
        }

        if (item.brand) {
            dispatch(getOneBrand(item.brand));
        }

        if (item.category) {
            dispatch(getProductLike(item.category));
        }

    }, [item]);

    let images = [];
    try {
        // let images = [];
        if (item.images) {
            images = item.images.map((img) => {
                return {
                    original: img,
                };
            });
        } else {
            images = [{
                original: `${mobile}`,
            }];
        }
    } catch (e) {}

    let cat = [];
    try {

        if (oneCategory.data) {
            cat = oneCategory.data;
        } else {
            cat = [];
        }
    } catch (e) {}

    let brand = [];
    try {
        if (oneBrand.data) {
            brand = oneBrand.data;
        } else {
            brand = [];
        }
    } catch (e) {}

    let prodL = [];
    try {
        if (productLike && productLike.data) {
            prodL = productLike.data.slice(0, 4);
        } else {
            prodL = [];
        }
    } catch (e) {}

    return [item, images, cat, brand, prodL];
}

export default ViewProductsDetalisHook;
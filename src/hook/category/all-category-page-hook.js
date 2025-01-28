import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCategory,
    getAllCategoryPage,
} from "../../Redux/actions/categoryAction";

export const AllCategoryHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const get = async() => {
            await dispatch(getAllCategory(6));
        };
        get();
    }, []);

    const allData = useSelector((state) => state.allCategory.category);
    const loading = useSelector((state) => state.allCategory.loading);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (allData) {
            setCategories(allData.data);
        }
    }, [allData]);

    let pageCount = 0;

    try {
        if (allData.paginationResult)
            pageCount = allData.paginationResult.numberOfPages;
    } catch (e) {}

    const getPage = (page) => {
        dispatch(getAllCategoryPage(page));
    };

    return [categories, loading, pageCount, getPage, allData];
};
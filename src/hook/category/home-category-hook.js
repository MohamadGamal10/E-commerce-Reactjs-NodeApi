import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../Redux/actions/categoryAction';

const HomeCategoryHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const categories = useSelector((state) => state.allCategory.category);
    const loading = useSelector((state) => state.allCategory.loading);

    const colors = [
        "#FFD3E8",
        "#F4DBA5",
        "#55CFDF",
        "#FF6262",
        "#0034FF",
        "#FFD3E8",
    ];

    return [categories, loading, colors];
}

export default HomeCategoryHook;
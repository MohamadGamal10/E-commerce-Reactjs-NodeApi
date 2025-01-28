import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand, getAllBrandPage } from "../../Redux/actions/brandAction";

const AllBrandHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrand(4));
  }, [dispatch]);

  const res = useSelector((state) => state.allBrand.brand);
  const loading = useSelector((state) => state.allBrand.loading);

  let pageCount = 0;
  if (res.paginationResult) {
    pageCount = res.paginationResult.numberOfPages;
  }

  const getPage = (page) => {
    dispatch(getAllBrandPage(page));
  };

  return [res , loading , pageCount , getPage];
};

export default AllBrandHook;

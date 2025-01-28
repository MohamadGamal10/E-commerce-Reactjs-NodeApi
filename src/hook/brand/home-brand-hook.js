import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand } from '../../Redux/actions/brandAction';

const HomeBrandHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllBrand());
    }, [dispatch])
  
    const brand = useSelector((state) => state.allBrand.brand);
    const loading = useSelector((state) => state.allBrand.loading);

    // console.log(loading);
    

  return [brand , loading];
}

export default HomeBrandHook

import React, { useEffect, useState } from "react";
import Pagination from "../Uitily/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProductWishList } from "../../Redux/actions/wishListAction";
import CardContainerHook from "../../hook/products/card-container-hook";
import { Row } from "react-bootstrap";
import ProductCardFav from "../Products/ProductCardFav";
export default function UserFavoriteProduct() {
  const [favProd] = CardContainerHook();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const get = async() => {
        setLoading(true);
        await dispatch(getProductWishList());
        setLoading(false);
    }
    get();
}, []);

const res = useSelector((state) => state.addToWishListReducer.allWishList);

useEffect(() => {
  if(loading === false){
    if(res.data ){
      setItems(res.data);
    }
  }
}, [loading]);

  return (
    <div>
      <div className="admin-content-text pb-4">قائمة المفضلة</div>
      <Row className='my-2 d-flex justify-content-between'>
        {res.data && res.data.length <= 0 ? <div>لا يوجد منتجات في قايمة المفضلة</div> : (
        res.data && res.data.map((item, index) => (
          <ProductCardFav key={index} item={item} favProd={favProd} />
        ))
      )}
       </Row>
      {/* <Pagination /> */}
    </div>
  );
}

import React , { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import DeleteCartHook from "../../hook/cart/delete-cart-hook";
import ApplyCouponHook from "../../hook/cart/apply-coupon-hook";

export default function CartCheckout({
  cartItems,
  couponNameRes,
  totalCartPriceAfterDiscount,
  totalCartPrice,
}) {
  const [handelDeleteCart] = DeleteCartHook();
  const [couponName, onChangeCoupon, handelSubmitCoupon, handleCheckout] = ApplyCouponHook(cartItems);

useEffect(() => {
if(couponNameRes){
  onChangeCoupon(couponNameRes);
}
}, [couponNameRes]);



  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex  ">
          <input
            className="copon-input d-inline text-center "
            placeholder="كود الخصم"
            value={couponName}
            onChange={(e)=>onChangeCoupon(e.target.value)}
          />
          <button onClick={handelSubmitCoupon} className="copon-btn d-inline ">
            تطبيق
          </button>
        </div>
        <div className="product-price d-inline w-100 my-3 border">
          {totalCartPriceAfterDiscount >= 1
            ? `${totalCartPriceAfterDiscount} جنيه ... بدلا من ${totalCartPrice} جنيه`
            : `${totalCartPrice} جنيه`}
        </div>
      
          <button  onClick={handleCheckout} className="product-cart-add w-100 px-2">اتمام الشراء</button>
     
        <button
          onClick={handelDeleteCart}
          className="product-cart-add w-100 px-2 my-1"
        >
          مسح العربة
        </button>
      </Col>
      <ToastContainer />
    </Row>
  );
}

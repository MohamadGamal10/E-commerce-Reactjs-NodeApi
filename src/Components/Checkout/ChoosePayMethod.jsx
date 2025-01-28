import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ViewAddressesHook from "../../hook/user/view-addresses-hook";
import OrderPayCashHook from "../../hook/checkout/order-pay-cash-hook";
import { ToastContainer } from "react-toastify";
import OrderPayCardHook from "../../hook/checkout/order-pay-card-hook";
import { notify } from "../../hook/useNotifaction";
import GetAllUserCartHook from "../../hook/cart/get-all-user-cart-hook";

export default function ChoosePayMethod() {
  const [res] = ViewAddressesHook();
  const [handleChooseAdress, addressDetalis, handelCreateOrderCash] =
    OrderPayCashHook();
  const [handelCreateOrderCARD] = OrderPayCardHook(addressDetalis);
  const [, , totalCartPrice, , totalCartPriceAfterDiscount] =
    GetAllUserCartHook();

  const [type, setType] = useState("");
  const changeMethod = (e) => {
    // console.log(e.target.value)
    setType(e.target.value);
  };

  const handelPay = () => {
    if (type === "CARD") {
      // console.log('order card')
      handelCreateOrderCARD();
    } else if (type === "CASH") {
      // console.log('order cash')
      handelCreateOrderCash();
    } else {
      notify("من فضلك اختر طريقة دفع", "warning");
    }
  };

  return (
    <div>
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between ">
          <Col xs="12" className="my-2">
            <input
              onChange={changeMethod}
              style={{ cursor: "pointer" }}
              name="group"
              id="group1"
              type="radio"
              value="CARD"
              className="mt-2"
            />
            <label
              style={{ cursor: "pointer" }}
              className="mx-2"
              htmlFor="group1"
            >
              الدفع عن طريق البطاقه الائتمانية
            </label>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs="12" className="d-flex">
            <input
              onChange={changeMethod}
              style={{ cursor: "pointer" }}
              name="group"
              id="group2"
              type="radio"
              value="CASH"
              className="mt-2"
            />
            <label
              style={{ cursor: "pointer" }}
              className="mx-2"
              htmlFor="group2"
            >
              الدفع عند الاستلام
            </label>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs="4" className="d-flex">
            <select
              name="adress"
              id="adress"
              className="select mt-1 px-2 "
              onChange={handleChooseAdress}
            >
              <option value="0" hidden>
                اختر عنوان للشحن
              </option>
              {res.data
                ? res.data.map((address, index) => (
                    <option key={index} value={address._id}>
                      {address.alias}
                    </option>
                  ))
                : "لا يوجد عناوين"}
            </select>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          <div className="product-price d-inline   border">
            {totalCartPriceAfterDiscount >= 1
              ? `${totalCartPrice} جنيه ... بعد الخصم ${totalCartPriceAfterDiscount} `
              : `${totalCartPrice} جنيه`}
          </div>
          <div
            onClick={handelPay}
            className="product-cart-add px-3 pt-2 d-inline me-2"
          >
            اتمام الشراء
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}

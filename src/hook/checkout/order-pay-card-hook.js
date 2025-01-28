import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GetAllUserCartHook from "../cart/get-all-user-cart-hook";
import { notify } from "../useNotifaction";
import { createOrderCARD } from "../../Redux/actions/checkoutAction";

const OrderPayCardHook = (addressDetalis) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, , , , , cartID] = GetAllUserCartHook();

  const handelCreateOrderCARD = async () => {
    if (cartID === "0") {
      notify("من فضلك اضف منتجات الى العربه اولا", "warning");
      return;
    }

    if (addressDetalis.length <= 0) {
      notify("من فضلك اختر عنوان اولا", "warning");
      return;
    }

    setLoading(true);
    await dispatch(
      createOrderCARD(cartID, {
        shippingAddress: {
          details: addressDetalis.alias,
          phone: addressDetalis.phone,
          city: "",
          postalCode: "",
        },
      })
    );
    setLoading(false);
  };

  const resOrderCard = useSelector(
    (state) => state.checkoutReducer.createOrderCard
  );

  console.log(resOrderCard);

  useEffect(() => {
    if (loading === false) {
      if (resOrderCard && resOrderCard.status === "success") {
        // notify("تم انشاء طلبك بنجاح", "success");
        console.log(resOrderCard.session.url);
        if (resOrderCard.session.url) {
          window.open(resOrderCard.session.url);
        }
      } else {
        notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warning");
      }
    }
  }, [loading]);

  return [handelCreateOrderCARD];
};

export default OrderPayCardHook;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserAddress } from "../../Redux/actions/userAddressesAction";
import { useNavigate } from "react-router-dom";
import GetAllUserCartHook from "../cart/get-all-user-cart-hook";
import { notify } from "../useNotifaction";
import { createOrderCash } from "../../Redux/actions/checkoutAction";

const OrderPayCashHook = () => {
  const [loading, setLoading] = useState(true);
  const [loadingCreate,  setLoadingCreate] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addressDetalis, setaddressDetalis] = useState([]);
  const [, , , , , cartId] = GetAllUserCartHook();
  // console.log(cartId)

  const handleChooseAdress = (e) => {
    setaddressDetalis([]);
    if (e.target.value != "0") {
      get(e.target.value);
    }
  };

  const get = async (id) => {
    setLoading(true);
    await dispatch(getOneUserAddress(id));
    setLoading(false);
  };

  const resAddress = useSelector((state) => state.userAddressesReducer.oneAddress);
  // console.log(resAddress)
  
  useEffect(() => {
    if (loading === false) {
      if (resAddress && resAddress.status === "success") {
        setaddressDetalis(resAddress.data);
      }else {
          setaddressDetalis([]);
      }
    }
  }, [loading]);



  const handelCreateOrderCash = async() => {
    if(cartId === "0"){
      notify("من فضلك اضف منتجات الى العربه اولا", "warning");
      return;
    }

    if(addressDetalis.length <= 0){
      notify("من فضلك اختر عنوان اولا", "warning")
      return;
    }
    setLoadingCreate(true);
    await dispatch(createOrderCash( cartId , {
      shippingAddress: {
        details: addressDetalis.alias,
        phone: addressDetalis.phone,
        city: "",
        postalCode: ""
    }
    }));
    setLoadingCreate(false);
  };
  
  const resOrderCash = useSelector((state) => state.checkoutReducer.createOrderCash);

  useEffect(() => {
    if (loadingCreate === false) {
        if (resOrderCash && resOrderCash.status === 201) {
            notify("تم انشاء طلبك بنجاح", "success");
            setTimeout(() => {
                navigate('/user/allorders');
            }, 1500);
        } else {
            notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warning")
        }
    }
}, [loadingCreate]);


  return [handleChooseAdress , addressDetalis , handelCreateOrderCash ];
};

export default OrderPayCashHook;

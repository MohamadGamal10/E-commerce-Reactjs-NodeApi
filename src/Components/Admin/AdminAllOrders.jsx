import React from "react";
import { Row } from "react-bootstrap";
import AdminAllOrdersItem from "./AdminAllOrdersItem";
import UserGetAllOrderHook from "../../hook/user/user-get-all-order-hook";
import Pagination from "../Uitily/Pagination";

export default function AdminAllOrders() {
  const [userName, results, paginate, orderData, onPress] =
    UserGetAllOrderHook();
  console.log(orderData);
  return (
    <div>
      <div className="admin-content-text">ادارة جميع الطلبات</div>
      <Row className="justify-content-start">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <AdminAllOrdersItem key={index} orderItem={item} />
          ))
        ) : (
          <h6>لا يوجد طلبات حتى </h6>
        )}

        {paginate.numberOfPages >= 2 ? (
          <Pagination
            onPress={onPress}
            pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0}
          />
        ) : null}
        {/* <AdminAllOrdersItem /> */}
      </Row>
    </div>
  );
}
